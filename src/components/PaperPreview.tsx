"use client";

import React, { useMemo } from "react";
import { PAPER_TEMPLATES, SCANNER_EFFECTS, SHADOW_EFFECTS } from "@/lib/papers";
import { HANDWRITING_FONTS } from "@/lib/fonts";
import { processHandwritingText, ProcessedWord } from "@/lib/handwritingEngine";

// Exact boundaries extracted from Writify source code
const NOTEBOOK_BOUNDARIES: Record<
  string,
  { top: number; left: number; right: number; bottom: number; lineSpacingPercent: number }
> = {
  classic2: {
    // Natural Paper (Spiral Left + Red Margin Line)
    top: 13.2, // Starts below red horizontal header line & Date/Page swirl
    left: 23.5, // Starts to the right of red vertical margin line and spiral rings
    right: 5.5,
    bottom: 7.0,
    lineSpacingPercent: 2.85,
  },
  classic1: {
    // Classic White Notebook
    top: 5.2,
    left: 6.8,
    right: 6.5,
    bottom: 5.0,
    lineSpacingPercent: 2.85,
  },
  nb3: {
    // Notebook 3 (Cream Parchment)
    top: 5.5,
    left: 7.0,
    right: 7.0,
    bottom: 5.5,
    lineSpacingPercent: 2.85,
  },
  nb4: {
    // Notebook 4 (Textured Recycled Paper)
    top: 5.0,
    left: 6.5,
    right: 6.5,
    bottom: 5.0,
    lineSpacingPercent: 2.85,
  },
  nb5: {
    // Notebook 5 (Double Black Ruler Margins)
    top: 8.5,
    left: 15.5,
    right: 12.5,
    bottom: 7.0,
    lineSpacingPercent: 2.85,
  },
  nb6: {
    // Notebook 6 (Single Thin Border Margin)
    top: 10.0,
    left: 11.5,
    right: 12.0,
    bottom: 5.5,
    lineSpacingPercent: 2.85,
  },
  nb7: {
    // Notebook 7 (Left Spiral on Desk)
    top: 5.0,
    left: 9.0,
    right: 7.0,
    bottom: 5.0,
    lineSpacingPercent: 2.85,
  },
  nb8: {
    // Notebook 8 (Top Spiral Notepad with Pen on Desk)
    top: 27.5, // Clears top spiral binding and ballpoint pen on wood
    left: 14.5,
    right: 22.0, // Clears right desk area
    bottom: 5.0,
    lineSpacingPercent: 2.85,
  },
  nb12: {
    top: 24.0,
    left: 16.5,
    right: 18.0,
    bottom: 5.0,
    lineSpacingPercent: 2.85,
  },
  nb13: {
    top: 25.0,
    left: 18.5,
    right: 23.0,
    bottom: 12.0,
    lineSpacingPercent: 2.85,
  },
  nb14: {
    top: 18.0,
    left: 11.5,
    right: 12.0,
    bottom: 5.0,
    lineSpacingPercent: 2.85,
  },
};

interface PaperPreviewProps {
  content: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  inkColor: string;
  paperTemplateId: string;
  paperImageUrl?: string | null;
  tilt?: number;
  autoMistakesEnabled?: boolean;
  mistakeRate?: number;
  mistakeStyle?: "single" | "double" | "wavy" | "scratch";
  scannerEffectId: string;
  shadowEffectId: string;
  margins?: { top: number; bottom: number; left: number; right: number };
  activePage?: number;
  headerDate?: string;
}

export default function PaperPreview({
  content,
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing,
  wordSpacing,
  inkColor,
  paperTemplateId,
  paperImageUrl,
  tilt = 0,
  autoMistakesEnabled = true,
  mistakeRate = 1,
  mistakeStyle = "wavy",
  scannerEffectId,
  shadowEffectId,
  activePage = 1,
}: PaperPreviewProps) {
  // Find selected configurations
  const selectedFont = useMemo(
    () => HANDWRITING_FONTS.find((f) => f.id === fontFamily) || HANDWRITING_FONTS[0],
    [fontFamily]
  );

  const selectedScanner = useMemo(
    () => SCANNER_EFFECTS.find((s) => s.id === scannerEffectId) || SCANNER_EFFECTS[0],
    [scannerEffectId]
  );

  const selectedShadow = useMemo(
    () => SHADOW_EFFECTS.find((s) => s.id === shadowEffectId) || SHADOW_EFFECTS[0],
    [shadowEffectId]
  );

  // Get calibrated notebook writing boundaries
  const boundary = useMemo(() => {
    return NOTEBOOK_BOUNDARIES[paperTemplateId] || NOTEBOOK_BOUNDARIES.classic1;
  }, [paperTemplateId]);

  // Process text through math and auto-mistake engine
  const processedLines = useMemo(() => {
    return processHandwritingText(content, autoMistakesEnabled, mistakeRate, mistakeStyle);
  }, [content, autoMistakesEnabled, mistakeRate, mistakeStyle]);

  // Dynamic CSS filter string
  const filterStyle = selectedScanner.cssFilter !== "none" ? { filter: selectedScanner.cssFilter } : {};

  return (
    <div className="relative w-full flex items-center justify-center p-1 sm:p-4 overflow-hidden select-none">
      {/* Dynamic Font-Face Injection */}
      {selectedFont?.url && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: '${selectedFont.name}';
                src: url('${selectedFont.url}') format('${selectedFont.url.endsWith(".woff2") ? "woff2" : "truetype"}');
                font-display: swap;
              }
            `,
          }}
        />
      )}

      {/* Main Paper Sheet Frame (3:4 Photographic Aspect Ratio) */}
      <div
        id="handwriting-paper-sheet"
        style={{
          ...filterStyle,
          backgroundImage: paperImageUrl ? `url(${paperImageUrl})` : undefined,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          transform: tilt ? `rotate(${tilt}deg)` : undefined,
        }}
        className={`relative w-full max-w-[640px] aspect-[3/4] rounded-2xl shadow-xl transition-all duration-300 overflow-hidden text-slate-800 ${
          paperImageUrl ? "bg-white" : "notebook-ruled-page"
        } ${selectedShadow.overlayClass}`}
      >
        {/* Subtle physical paper texture noise */}
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Calibrated Writing Area Container */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            top: `${boundary.top}%`,
            left: `${boundary.left}%`,
            right: `${boundary.right}%`,
            bottom: `${boundary.bottom}%`,
          }}
        >
          <div
            style={{
              fontFamily: selectedFont.fontFamily,
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              letterSpacing: `${letterSpacing}px`,
              wordSpacing: `${wordSpacing}px`,
              color: inkColor,
            }}
            className="w-full h-full text-left"
          >
            {processedLines.map((lineObj, lineIdx) => (
              <div
                key={lineIdx}
                className="flex items-baseline flex-wrap transition-transform duration-200"
                style={{
                  minHeight: `${lineHeight * fontSize * 1.05}px`,
                  marginBottom: "1px",
                  // Subtle natural handwriting slant per line
                  transform: `rotate(${((lineIdx % 5) - 2) * 0.12}deg)`,
                }}
              >
                {lineObj.words.map((wordItem, wordIdx) => (
                  <span
                    key={wordIdx}
                    className="relative inline-block mr-1.5"
                    style={{
                      // Slight character variation
                      opacity: wordItem.hasStrike ? 0.88 : 0.96,
                    }}
                  >
                    {wordItem.word}

                    {/* Realistic Pen Strike Strikethrough Overlay */}
                    {wordItem.hasStrike && (
                      <PenStrikeOverlay style={wordItem.strikeStyle || "wavy"} color={inkColor} />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Authentic SVG Cross-out Pen Strike Generator
function PenStrikeOverlay({
  style,
  color,
}: {
  style: "single" | "double" | "wavy" | "scratch";
  color: string;
}) {
  if (style === "single") {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <line
          x1="-4"
          y1="12"
          x2="104"
          y2="9"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (style === "double") {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <line
          x1="-4"
          y1="8"
          x2="104"
          y2="6"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="-3"
          y1="13"
          x2="103"
          y2="11"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    );
  }

  if (style === "scratch") {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
      >
        <path
          d="M-2 10 Q 15 3, 25 15 T 45 4 T 65 16 T 85 5 T 103 11"
          stroke={color}
          strokeWidth="3.0"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <line
          x1="-4"
          y1="10"
          x2="104"
          y2="10"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
    );
  }

  // Wavy oscillating pen stroke (default)
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
    >
      <path
        d="M -3 11 Q 12 5, 25 11 T 50 11 T 75 11 T 103 10"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );
}
