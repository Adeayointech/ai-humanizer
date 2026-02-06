// src/app/api/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const content: string = (body?.content ?? body?.text ?? "") as string;
    const wordCount: number =
      typeof body?.wordCount === "number"
        ? body.wordCount
        : content.split(/\s+/).filter(Boolean).length;
    const aiScore: number = typeof body?.score === "number" ? body.score : 0;
    const humanScore: number = 100 - aiScore;

    // sanitize text to avoid WinAnsi errors
    const sanitize = (s: string) =>
      s.replace(/\r\n/g, "\n").replace(/[^\x20-\x7E\n]+/g, "");
    const safeContent = sanitize(content);

    const pdfDoc = await PDFDocument.create();
    const A4: [number, number] = [595.28, 841.89];
    let page = pdfDoc.addPage(A4);
    const { width, height } = page.getSize();

    // fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Color scheme - Modern violet/indigo theme
    const primaryColor = rgb(0.45, 0.3, 0.7); // violet
    const secondaryColor = rgb(0.3, 0.35, 0.65); // indigo
    const accentColor = rgb(0.58, 0.4, 0.85); // lighter violet
    const lightBg = rgb(0.97, 0.97, 0.99);
    const darkText = rgb(0.15, 0.15, 0.2);
    const grayText = rgb(0.45, 0.45, 0.5);

    //
    // ---------- MODERN HEADER ----------
    //
    const headerHeight = 80;
    // Gradient effect simulation with rectangles
    page.drawRectangle({
      x: 0,
      y: height - headerHeight,
      width: width,
      height: headerHeight,
      color: primaryColor,
    });
    
    page.drawRectangle({
      x: width * 0.6,
      y: height - headerHeight,
      width: width * 0.4,
      height: headerHeight,
      color: secondaryColor,
      opacity: 0.8,
    });

    // Logo/Brand Name
    page.drawText("PHRASIT", {
      x: 50,
      y: height - 45,
      size: 32,
      font: fontBold,
      color: rgb(1, 1, 1),
    });
    
    page.drawText("AI Content Analysis Report", {
      x: 50,
      y: height - 65,
      size: 11,
      font,
      color: rgb(0.95, 0.95, 0.98),
    });

    // Date and Report ID on right
    const reportDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const reportId = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    page.drawText(reportDate, {
      x: width - 180,
      y: height - 40,
      size: 10,
      font,
      color: rgb(0.95, 0.95, 0.98),
    });
    
    page.drawText(`Report ${reportId}`, {
      x: width - 180,
      y: height - 55,
      size: 9,
      font,
      color: rgb(0.85, 0.85, 0.9),
    });

    //
    // ---------- SIMPLIFIED RESULTS SECTION ----------
    //
    const sectionY = height - 140;
    
    // Main result card - clean and simple
    const cardX = 50;
    const cardWidth = width - 100;
    const cardHeight = 140;
    
    page.drawRectangle({
      x: cardX,
      y: sectionY - cardHeight,
      width: cardWidth,
      height: cardHeight,
      color: lightBg,
      borderColor: rgb(0.88, 0.88, 0.92),
      borderWidth: 1,
    });

    // Accent bar on left
    page.drawRectangle({
      x: cardX,
      y: sectionY - cardHeight,
      width: 6,
      height: cardHeight,
      color: accentColor,
    });

    // Content inside card
    const contentX = cardX + 35;
    
    page.drawText("ANALYSIS RESULT", {
      x: contentX,
      y: sectionY - 30,
      size: 10,
      font,
      color: grayText,
    });
    
    // Determine result color based on AI score
    let resultColor = primaryColor;
    let resultText = "AI-Generated Content Detected";
    
    if (aiScore < 30) {
      resultColor = rgb(0.3, 0.75, 0.5); // Green for human
      resultText = "Human-Written Content";
    } else if (aiScore < 70) {
      resultColor = rgb(0.95, 0.65, 0.2); // Orange for mixed
      resultText = "Mixed/Uncertain Content";
    } else {
      resultColor = rgb(0.85, 0.4, 0.3); // Red for AI
      resultText = "AI-Generated Content Detected";
    }
    
    page.drawText(`${aiScore}%`, {
      x: contentX,
      y: sectionY - 70,
      size: 52,
      font: fontBold,
      color: resultColor,
    });
    
    page.drawText(resultText, {
      x: contentX + 120,
      y: sectionY - 58,
      size: 13,
      font: fontBold,
      color: darkText,
    });

    // Word count info
    page.drawText(`${wordCount} Words Analyzed`, {
      x: contentX + 120,
      y: sectionY - 80,
      size: 10,
      font,
      color: grayText,
    });

    // Simple confidence bar
    page.drawText("CONFIDENCE:", {
      x: contentX,
      y: sectionY - 110,
      size: 9,
      font,
      color: grayText,
    });
    
    const barX = contentX + 85;
    const barY = sectionY - 113;
    const barWidth = 200;
    
    // Background bar
    page.drawRectangle({
      x: barX,
      y: barY,
      width: barWidth,
      height: 8,
      color: rgb(0.92, 0.92, 0.94),
    });
    
    // Filled bar based on confidence (higher for extreme values)
    const confidenceLevel = aiScore < 30 || aiScore > 70 ? "High" : "Medium";
    const confidenceFill = aiScore < 30 || aiScore > 70 ? barWidth * 0.85 : barWidth * 0.6;
    const confidenceColor = aiScore < 30 || aiScore > 70 ? rgb(0.3, 0.75, 0.5) : rgb(0.95, 0.65, 0.2);
    
    page.drawRectangle({
      x: barX,
      y: barY,
      width: confidenceFill,
      height: 8,
      color: confidenceColor,
    });
    
    page.drawText(confidenceLevel, {
      x: barX + barWidth + 10,
      y: barY,
      size: 9,
      font: fontBold,
      color: confidenceColor,
    });

    //
    // ---------- CLASSIFICATION BREAKDOWN ----------
    //
    const breakdownY = sectionY - cardHeight - 50;
    
    page.drawText("Content Classification", {
      x: cardX,
      y: breakdownY,
      size: 14,
      font: fontBold,
      color: darkText,
    });

    // Simple list view
    const items = [
      { label: "Human-Written", value: `${humanScore}%`, color: rgb(0.3, 0.75, 0.5) },
      { label: "AI-Generated", value: `${aiScore}%`, color: rgb(0.85, 0.4, 0.3) },
    ];

    let itemY = breakdownY - 25;
    
    items.forEach(item => {
      // Color indicator
      page.drawCircle({
        x: cardX + 10,
        y: itemY + 5,
        size: 5,
        color: item.color,
      });
      
      // Label
      page.drawText(item.label, {
        x: cardX + 25,
        y: itemY,
        size: 11,
        font,
        color: darkText,
      });
      
      // Value
      page.drawText(item.value, {
        x: cardX + 200,
        y: itemY,
        size: 11,
        font: fontBold,
        color: item.color,
      });
      
      itemY -= 25;
    });

    //
    // ---------- DISCLAIMER ----------
    //
    const disclaimerY = breakdownY - 130;
    
    page.drawRectangle({
      x: cardX,
      y: disclaimerY - 45,
      width: cardWidth,
      height: 45,
      color: rgb(0.96, 0.94, 0.98),
      borderColor: accentColor,
      borderWidth: 0.5,
    });
    
    // Info circle
    page.drawCircle({
      x: cardX + 18,
      y: disclaimerY - 20,
      size: 10,
      color: primaryColor,
      borderWidth: 0,
    });
    
    page.drawText("i", {
      x: cardX + 15,
      y: disclaimerY - 24,
      size: 14,
      font: fontBold,
      color: rgb(1, 1, 1),
    });
    
    page.drawText(
      "Important: AI detection is an estimation based on linguistic patterns and writing style.",
      { x: cardX + 40, y: disclaimerY - 15, size: 9, font: fontBold, color: darkText }
    );
    page.drawText(
      "This analysis should be used as guidance only. Results may vary and are not 100% definitive.",
      { x: cardX + 40, y: disclaimerY - 30, size: 9, font, color: grayText }
    );

    //
    // ---------- ANALYZED CONTENT ----------
    //0

    //
    // ---------- ANALYZED CONTENT ----------
    //
    let textY = disclaimerY - 70;
    const marginLeft = 50;
    const maxTextWidth = width - 100;
    const lineHeight = 14;

    page.drawText("Analyzed Content", {
      x: marginLeft,
      y: textY,
      size: 14,
      font: fontBold,
      color: darkText,
    });
    
    textY -= 25;
    
    // Separator line
    page.drawRectangle({
      x: marginLeft,
      y: textY + 5,
      width: cardWidth,
      height: 1,
      color: rgb(0.88, 0.88, 0.92),
    });
    
    textY -= 15;

    const drawParagraph = (pg: any, paragraph: string, startY: number) => {
      let y = startY;
      const words = paragraph.split(/\s+/).filter(Boolean);
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const candidate = line ? line + " " + words[i] : words[i];
        const w = font.widthOfTextAtSize(candidate + " ", 10);
        if (w > maxTextWidth && line.length > 0) {
          pg.drawText(line, { x: marginLeft, y, size: 10, font, color: darkText });
          line = words[i];
          y -= lineHeight;
          if (y < 60) {
            // Add footer before new page
            pg.drawText("Generated by Phrasit AI", {
              x: width / 2 - 50,
              y: 30,
              size: 8,
              font,
              color: grayText,
            });
            pg = pdfDoc.addPage(A4);
            y = A4[1] - 60;
          }
        } else {
          line = candidate;
        }
      }
      if (line.length > 0) {
        pg.drawText(line, { x: marginLeft, y, size: 10, font, color: darkText });
        y -= lineHeight;
      }
      return { page: pg, y };
    };

    const paragraphs = safeContent.split("\n");
    for (const para of paragraphs) {
      if (para.trim() === "") {
        textY -= lineHeight;
        if (textY < 60) {
          // Add footer
          page.drawText("Generated by Phrasit AI", {
            x: width / 2 - 50,
            y: 30,
            size: 8,
            font,
            color: grayText,
          });
          page = pdfDoc.addPage(A4);
          textY = A4[1] - 60;
        }
        continue;
      }
      const out = drawParagraph(page, para, textY);
      page = out.page;
      textY = out.y - 6;
      if (textY < 80) {
        // Add footer
        page.drawText("Generated by Phrasit AI", {
          x: width / 2 - 50,
          y: 30,
          size: 8,
          font,
          color: grayText,
        });
        page = pdfDoc.addPage(A4);
        textY = A4[1] - 60;
      }
    }

    // Footer on last page
    page.drawText("Generated by Phrasit AI", {
      x: width / 2 - 50,
      y: 30,
      size: 8,
      font,
      color: grayText,
    });

    // finalize
    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="phrasit-ai-detection-report.pdf"',
      },
    });
  } catch (err: any) {
    console.error("Report error:", err);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
