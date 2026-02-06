"use client";

import { useState } from "react";
import Navigation from '@/components/Navigation';

export default function FreeTrialPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [humanized, setHumanized] = useState("");

  // === Detect ===
  const handleCheck = async () => {
    if (!text.trim()) {
      alert("Please enter some text to analyze");
      return;
    }
    
    setLoading(true);
    setHumanized("");
    try {
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to detect text");
        return;
      }

      setResult(data.result);
    } catch (err) {
      console.error("Detection error:", err);
      alert("Failed to detect text");
    } finally {
      setLoading(false);
    }
  };

  // === Humanize ===
  const handleHumanize = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to humanize text");
        return;
      }

      setHumanized(data.humanizedText);
    } catch (err) {
      console.error("Humanize error:", err);
      alert("Failed to humanize text");
    } finally {
      setLoading(false);
    }
  };

  // === Download Report ===
  const handleDownloadReport = async () => {
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          wordCount: text.split(/\s+/).filter(Boolean).length,
          score: result, // Pass the AI detection score
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate report");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "phrasit-ai-detection-report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Report error:", err);
      alert("Failed to generate report");
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-400";
    if (score < 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score < 30) return "bg-green-900/50 border-green-500/40";
    if (score < 70) return "bg-yellow-900/50 border-yellow-500/40";
    return "bg-red-900/50 border-red-500/40";
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(humanized);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy text");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">
      <Navigation />
      <main className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
            AI Content Detector & Paraphraser
          </h1>
          <p className="text-violet-200 text-sm max-w-2xl mx-auto">
            Analyze your text for AI-generated content and paraphrase it naturally.
          </p>
        </div>

        {/* Side by Side Text Boxes - Always Visible */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Left: Input Text */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-violet-900/60 to-indigo-900/60 rounded-2xl shadow-2xl p-5 border border-violet-500/40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-violet-300">Original Text</h3>
              <span className="text-xs bg-violet-500/40 text-violet-200 px-3 py-1 rounded-full backdrop-blur-sm">
                {text.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              className="w-full bg-black/30 backdrop-blur-sm border-2 border-violet-500/30 rounded-xl p-4 focus:border-violet-500 focus:ring-2 focus:ring-violet-400/50 transition-all duration-200 resize-none text-gray-100 placeholder-violet-300/60 min-h-[400px]"
              placeholder="Paste your text here to analyze or paraphrase..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Right: Paraphrased Output */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-indigo-900/60 to-purple-900/60 rounded-2xl shadow-2xl p-5 border border-indigo-500/40">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-indigo-300">Paraphrased Text</h3>
              <div className="flex gap-2">
                {humanized && (
                  <span className="text-xs bg-green-500/40 text-green-200 px-3 py-1 rounded-full backdrop-blur-sm">
                    Ready
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-black/30 backdrop-blur-sm border-2 border-indigo-500/30 rounded-xl p-4 min-h-[400px] text-gray-100">
              {humanized ? (
                <div className="whitespace-pre-wrap">{humanized}</div>
              ) : (
                <p className="text-indigo-400/70 italic">Paraphrased text will appear here...</p>
              )}
            </div>
            {humanized && (
              <button
                onClick={handleCopy}
                className="mt-3 w-full px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>📋</span>
                Copy to Clipboard
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          <button
            onClick={handleCheck}
            disabled={loading || !text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-2 border border-blue-400/30"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <span>🔍</span>
                Detect AI Content
              </>
            )}
          </button>

          <button
            onClick={handleHumanize}
            disabled={loading || !text.trim()}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-2 border border-violet-400/30"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Paraphrasing...
              </>
            ) : (
              <>
                <span>✨</span>
                Paraphrase Text
              </>
            )}
          </button>

          {result !== null && (
            <button
              onClick={handleDownloadReport}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-2 border border-purple-400/30"
            >
              <span>📄</span>
              Download Report
            </button>
          )}
        </div>

        {/* Analysis Results */}
        {result !== null && (
          <div className={`backdrop-blur-lg rounded-2xl shadow-2xl p-6 mb-4 border-2 transition-all duration-300 ${
            result < 30 
              ? 'bg-green-900/50 border-green-500/40' 
              : result < 70 
              ? 'bg-yellow-900/50 border-yellow-500/40' 
              : 'bg-red-900/50 border-red-500/40'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-violet-200 mb-2">Analysis Result</h3>
                <p className="text-violet-300">
                  This text appears to be <span className={`font-bold text-xl ${getScoreColor(result)}`}>{result}% AI-generated</span>
                </p>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-bold ${getScoreColor(result)}`}>
                  {result}%
                </div>
                <div className="text-sm text-violet-300">AI Probability</div>
              </div>
            </div>
            
            {/* Score Bar */}
            <div className="mt-6">
              <div className="w-full bg-black/30 rounded-full h-4 backdrop-blur-sm">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    result < 30 ? "bg-gradient-to-r from-green-400 to-green-500" 
                    : result < 70 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" 
                    : "bg-gradient-to-r from-red-400 to-red-500"
                  }`}
                  style={{ width: `${result}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-violet-300 mt-2">
                <span>Human</span>
                <span>AI</span>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="backdrop-blur-lg bg-violet-800/40 p-5 rounded-xl shadow-lg text-center border border-violet-500/40">
            <div className="w-10 h-10 bg-blue-500/40 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <span className="text-blue-300 text-lg">🔍</span>
            </div>
            <h3 className="font-semibold text-base mb-2 text-violet-200">AI Detection</h3>
            <p className="text-violet-300/90 text-xs">Advanced algorithms detect AI-generated content with high accuracy</p>
          </div>
          
          <div className="backdrop-blur-lg bg-indigo-800/40 p-5 rounded-xl shadow-lg text-center border border-indigo-500/40">
            <div className="w-10 h-10 bg-violet-500/40 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <span className="text-violet-300 text-lg">✨</span>
            </div>
            <h3 className="font-semibold text-base mb-2 text-indigo-200">Paraphrase</h3>
            <p className="text-indigo-300/90 text-xs">Transform AI text into natural, human-like writing</p>
          </div>
          
          <div className="backdrop-blur-lg bg-purple-800/40 p-5 rounded-xl shadow-lg text-center border border-purple-500/40">
            <div className="w-10 h-10 bg-purple-500/40 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <span className="text-purple-300 text-lg">📊</span>
            </div>
            <h3 className="font-semibold text-base mb-2 text-purple-200">Detailed Reports</h3>
            <p className="text-purple-300/90 text-xs">Download comprehensive PDF reports of your analysis</p>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}