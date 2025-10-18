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

    // load logo (PNG preferred)
    const logoPathPng = path.join(process.cwd(), "public", "Quillbot-Logo.png");
    const logoPathJpg = path.join(process.cwd(), "public", "Quillbot-Logo.jpg");
    let logoImage: any = undefined;
    if (fs.existsSync(logoPathPng)) {
      logoImage = await pdfDoc.embedPng(fs.readFileSync(logoPathPng));
    } else if (fs.existsSync(logoPathJpg)) {
      logoImage = await pdfDoc.embedJpg(fs.readFileSync(logoPathJpg));
    }

    //
    // ---------- HEADER ----------
    //
    const leftX = 50;
    const headerY = height - 40;

    page.drawText("AI Detector report by", {
      x: leftX,
      y: headerY + 10,
      size: 11,
      font,
    });

    const logoW = 92;
    const logoH = 28;
    if (logoImage) {
      page.drawImage(logoImage, {
        x: leftX,
        y: headerY - 16,
        width: logoW,
        height: logoH,
      });
    }

    // Date/time aligned in same horizontal band, to right of logo
    const dateX = leftX + (logoImage ? logoW + 18 : 0);
    page.drawText(new Date().toLocaleString(), {
      x: dateX,
      y: headerY - 6,
      size: 9,
      
    });

    // Header right: version and word count
    const rightX = width - 180;
    page.drawText("Version 2025-v5.5.0", {
      x: rightX,
      y: headerY + 10,
      size: 10,
      
    });
    page.drawText(` ${wordCount} Words`, {
      x: rightX,
      y: headerY - 6,
      size: 10,
    //   font: fontBold,
    });  

    //
    // ---------- RESULTS BOX ----------
    //
    const boxX = 40;
    const boxTopY = headerY - 70;
    const boxW = width - 80;
    const boxH = 200;

    page.drawRectangle({
      x: boxX,
      y: boxTopY - boxH,
      width: boxW,
      height: boxH,
      color: rgb(0.99, 0.99, 0.99),
      borderColor: rgb(0.94, 0.94, 0.94),
      borderWidth: 0.4,
    });

    //
    // ---------- LEFT COLUMN ----------
    //
    const leftColX = boxX + 100;
    const bigPctY = boxTopY - 36;

    page.drawText("0%", { x: leftColX, y: bigPctY, size: 38, font: fontBold });
    page.drawText("of text is likely AI", {
      x: leftColX,
      y: bigPctY - 26,
      size: 11,
      font,
    });

    // logo under the text
    if (logoImage) {
      page.drawImage(logoImage, {
        x: leftColX,
        y: bigPctY - 60,
        width: logoW,
        height: logoH,
      });
    }

    // chart under logo
    const chartX = leftColX;
    const chartY = bigPctY - 120;
    const chartWidth = 160;

    page.drawRectangle({
      x: chartX,
      y: chartY,
      width: chartWidth,
      height: 2,
      color: rgb(0.85, 0.85, 0.85),
    });

    // short human bar (vertical height-based box on right side)
    const humanBarWidth = 44;
    const humanBarHeight = 44;
    const humanBarX = chartX + chartWidth - humanBarWidth;
    const humanBarY = chartY;
    page.drawRectangle({
      x: humanBarX,
      y: humanBarY,
      width: humanBarWidth,
      height: humanBarHeight,
      color: rgb(0.7, 0.88, 1),
      borderColor: rgb(0.7, 0.82, 0.95),
      borderWidth: 0.5,
    });

    page.drawText("AI", { x: chartX, y: chartY - 14, size: 10, font });
    page.drawText("Human", {
      x: chartX + chartWidth - 28,
      y: chartY - 14,
      size: 10,
      font,
    });

    //
    // ---------- LEGEND (RIGHT COLUMN) ----------
    //
    const legendStartX = boxX + boxW / 2 + 20;
    let legendY = boxTopY - 22;
    const legendRowGap = 30;

    const legends = [
      { label: "AI-generated", pct: "0%", color: rgb(1, 0.55, 0.1) },
      { label: "AI-generated & AI-refined", pct: "0%", color: rgb(1, 0.82, 0.86) },
      { label: "Human-written & AI-refined", pct: "0%", color: rgb(0.7, 0.88, 1) },
      { label: "Human-written", pct: "100%", color: rgb(1, 1, 1) },
    ];

    for (const L of legends) {
      const words = L.label.split(" ");
      const maxChars = 22;
      let line = "";
      const lines: string[] = [];

      for (const w of words) {
        if ((line + " " + w).trim().length > maxChars) {
          lines.push(line.trim());
          line = w;
        } else {
          line += " " + w;
        }
      }
      if (line.trim()) lines.push(line.trim());

      let textY = legendY;

      for (let i = 0; i < lines.length; i++) {
        const txt = lines[i];
        page.drawText(txt, { x: legendStartX, y: textY, size: 10, font });

        if (i === lines.length - 1) {
          const textWidth = font.widthOfTextAtSize(txt, 10);
          const infoX = legendStartX + textWidth + 6;

          page.drawCircle({
            x: infoX + 3,
            y: textY + 4,
            size: 6,
            color: rgb(0.95, 0.96, 0.98),
            borderColor: rgb(0.8, 0.82, 0.85),
            borderWidth: 0.4,
          });
          page.drawText("i", {
            x: infoX + 0.5,
            y: textY + 1,
            size: 7,
            font,
            color: rgb(0.25, 0.28, 0.45),
          });
        }
        textY -= 12;
      }

      // color dot fixed
      page.drawCircle({
        x: legendStartX + 100,
        y: legendY + 4,
        size: 6,
        color: L.color,
        borderColor: rgb(0.85, 0.86, 0.88),
        borderWidth: 0.4,
      });

      // percentage fixed
      page.drawText(L.pct, {
        x: legendStartX + 120,
        y: legendY,
        size: 10,
        // font: fontBold,
      });

      legendY -= legendRowGap;
    }

    //
    // ---------- RESULT ROW ----------
    //
    const resultRowY = boxTopY - boxH - 30;
    page.drawRectangle({
      x: boxX,
      y: resultRowY,
      width: boxW,
      height: 36,
      color: rgb(0.985, 0.985, 0.987),
      borderWidth: 0,
    });
    page.drawText("Result: Human-written (100%)", {
      x: boxX + 16,
      y: resultRowY + 10,
      size: 11,
      font: fontBold,
    });

    //
    // ---------- CAUTION BOX ----------
    //
    const cautionY = resultRowY - 50;
    page.drawRectangle({
      x: boxX,
      y: cautionY - 6,
      width: boxW,
      height: 50,
      color: rgb(1, 0.94, 0.95),
      borderColor: rgb(1, 0.88, 0.9),
      borderWidth: 0.4,
    });

    page.drawSvgPath(
      `M ${boxX + 12} ${cautionY} L ${boxX + 28} ${cautionY} L ${boxX + 20} ${cautionY + 18} Z`,
      { color: rgb(1, 0.9, 0.55), borderColor: rgb(1, 0.75, 0.2), borderWidth: 0.6 }
    );
    page.drawText("!", {
      x: boxX + 16,
      y: cautionY + 2,
      size: 10,
      font: fontBold,
      color: rgb(0.15, 0.12, 0.06),
    });

    const cautionTextX = boxX + 40;
    page.drawText(
      "Caution: Our AI Detector is advanced, but no detectors are 100% reliable, no matter what their accuracy scores claim.",
      { x: cautionTextX, y: cautionY + 20, size: 9, font }
    );
    page.drawText(
      "Never use AI detection alone to make decisions that could impact a person's career or academic standing.",
      { x: cautionTextX, y: cautionY + 6, size: 9, font }
    );

    //
    // ---------- CONTENT ----------
    //
    let textY = cautionY - 50;
    const marginLeft = 50;
    const maxTextWidth = width - 100;
    const lineHeight = 14;

    const drawParagraph = (pg: any, paragraph: string, startY: number) => {
      let y = startY;
      const words = paragraph.split(/\s+/).filter(Boolean);
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const candidate = line ? line + " " + words[i] : words[i];
        const w = font.widthOfTextAtSize(candidate + " ", 11);
        if (w > maxTextWidth && line.length > 0) {
          pg.drawText(line, { x: marginLeft, y, size: 11, font });
          line = words[i];
          y -= lineHeight;
          if (y < 60) {
            pg = pdfDoc.addPage(A4);
            y = A4[1] - 60;
          }
        } else {
          line = candidate;
        }
      }
      if (line.length > 0) {
        pg.drawText(line, { x: marginLeft, y, size: 11, font });
        y -= lineHeight;
      }
      return { page: pg, y };
    };

    const paragraphs = safeContent.split("\n");
    for (const para of paragraphs) {
      if (para.trim() === "") {
        textY -= lineHeight;
        if (textY < 60) {
          page = pdfDoc.addPage(A4);
          textY = A4[1] - 60;
        }
        continue;
      }
      const out = drawParagraph(page, para, textY);
      page = out.page;
      textY = out.y - 6;
      if (textY < 80) {
        page = pdfDoc.addPage(A4);
        textY = A4[1] - 60;
      }
    }

    // finalize
    const pdfBytes = await pdfDoc.save();
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="ai-detection-report.pdf"',
      },
    });
  } catch (err: any) {
    console.error("Report error:", err);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
