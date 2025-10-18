"use client";

import { useState } from "react";

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
      link.download = "ai-detection-report.pdf";
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
    if (score < 30) return "text-green-600";
    if (score < 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score < 30) return "bg-green-100 border-green-200";
    if (score < 70) return "bg-yellow-100 border-yellow-200";
    return "bg-red-100 border-red-200";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Content Detector & Humanizer
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Analyze your text for AI-generated content and transform it into natural, human-like writing with just one click.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
          {/* Text Area */}
          <div className="mb-8">
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-3">
              Paste your text here
            </label>
            <textarea
              id="text-input"
              className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
              rows={8}
              placeholder="Enter the text you want to analyze or humanize..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>{text.split(/\s+/).filter(Boolean).length} words</span>
              <span>{text.length} characters</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleCheck}
              disabled={loading || !text.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
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

            {result !== null && result > 0 && (
              <button
                onClick={handleHumanize}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Humanize Text
                  </>
                )}
              </button>
            )}

            {result !== null && (
              <button
                onClick={handleDownloadReport}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>📄</span>
                Download Report
              </button>
            )}
          </div>

          {/* Results */}
          {result !== null && (
            <div className={`p-6 rounded-xl border-2 ${getScoreBgColor(result)} transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis Result</h3>
                  <p className="text-gray-600">
                    This text appears to be <span className={`font-bold ${getScoreColor(result)}`}>{result}% AI-generated</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getScoreColor(result)}`}>
                    {result}%
                  </div>
                  <div className="text-sm text-gray-500">AI Probability</div>
                </div>
              </div>
              
              {/* Score Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      result < 30 ? "bg-green-500" : result < 70 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${result}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Human</span>
                  <span>AI</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Humanized Text Result */}
        {humanized && (
          <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Humanized Text</h2>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{humanized}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setText(humanized);
                  setHumanized("");
                  setResult(null);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Use This Text
              </button>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">🔍</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Detection</h3>
            <p className="text-gray-600 text-sm">Advanced algorithms detect AI-generated content with high accuracy</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">✨</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Humanize</h3>
            <p className="text-gray-600 text-sm">Transform AI text into natural, human-like writing</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Detailed Reports</h3>
            <p className="text-gray-600 text-sm">Download comprehensive PDF reports of your analysis</p>
          </div>
        </div>
      </div>
    </main>
  );
}