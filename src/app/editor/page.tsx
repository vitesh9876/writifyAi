"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  PenTool,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Layers,
  Sparkles,
  Eye,
  Type,
  Palette,
  FileText,
  FileDown,
} from "lucide-react";
import PaperPreview from "@/components/PaperPreview";
import FontPickerDropdown from "@/components/FontPickerDropdown";
import {
  NOTEBOOK_TEMPLATES,
  PAPER_TEMPLATES,
  SCANNER_EFFECTS,
  SHADOW_EFFECTS,
} from "@/lib/papers";
import { HANDWRITING_FONTS } from "@/lib/fonts";

const INK_PALETTES = [
  { name: "Royal Blue", hex: "#000066" },
  { name: "Classic Navy", hex: "#0033cc" },
  { name: "Obsidian Black", hex: "#1a1a1a" },
  { name: "Vintage Sepia", hex: "#4a2c11" },
  { name: "Forest Emerald", hex: "#14452f" },
  { name: "Crimson Rose", hex: "#800020" },
  { name: "Pencil Graphite", hex: "#4d4d4d" },
];

const SAMPLE_PRESETS = [
  {
    name: "Biology Lab",
    text: "Title: Cellular Respiration in Yeast\nDate: 14 November 2026\n\nObjective: Measure the rate of anaerobic carbon dioxide production across varying glucose concentrations.\n\nObservations:\n1. 5% solution produced 4.2 mL CO2 in 10 minutes.\n2. 10% solution produced 8.7 mL CO2.\n3. The baseline temperature remained constant at 24°C.\n\nConclusion: Fermentation rate correlates positively with substrate availability until enzyme saturation.",
  },
  {
    name: "Literature Essay",
    text: "The Symbolism of the Green Light in Gatsby\n\nIn F. Scott Fitzgerald's classic novel, the green light at the end of Daisy's dock represents Gatsby's unwavering hopes and dreams for the future.\n\nIt associates with the American Dream itself: a distant, alluring beacon that continually recedes before us, yet compels us to run faster and stretch out our arms farther.",
  },
  {
    name: "Physics Equations",
    text: "Kinematics & Harmonic Motion\n\nDisplacement: x(t) = A * cos(omega * t + phi)\nVelocity: v(t) = -A * omega * sin(omega * t + phi)\nAcceleration: a(t) = -omega^2 * x(t)\n\nNote: At maximum displacement (x = +/- A), kinetic energy is zero while potential energy reaches peak.",
  },
  {
    name: "Personal Letter",
    text: "Dear Eleanor,\n\nI hope this letter finds you well on this crisp autumn afternoon. The leaves in the courtyard have turned a brilliant amber, reminding me of our long walks through the park last November.\n\nI have so much to tell you about the new studio project. Please write back soon.\n\nWith love,\nVitesh",
  },
];

export default function EditorPage() {
  // Document State
  const [content, setContent] = useState(SAMPLE_PRESETS[0].text);
  const [activeTab, setActiveTab] = useState<"style" | "paper" | "realism">("style");

  // Typography & Ink
  const [fontFamily, setFontFamily] = useState("cursive_real");
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [letterSpacing, setLetterSpacing] = useState(0.5);
  const [wordSpacing, setWordSpacing] = useState(2.0);
  const [inkColor, setInkColor] = useState("#000066");

  // Paper & Margins
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic2");
  const [tilt, setTilt] = useState(0);

  // Realism & Scanner
  const [autoMistakes, setAutoMistakes] = useState(true);
  const [mistakeRate, setMistakeRate] = useState(1);
  const [mistakeStyle, setMistakeStyle] = useState<"single" | "double" | "wavy" | "scratch">("wavy");
  const [scannerEffectId, setScannerEffectId] = useState("none");
  const [shadowEffectId, setShadowEffectId] = useState("none");

  // Pagination & Header Date
  const [activePage, setActivePage] = useState(1);
  const [headerDate, setHeaderDate] = useState("14/11/2026");

  const selectedTemplate = useMemo(
    () => NOTEBOOK_TEMPLATES.find((t) => t.id === selectedTemplateId) || NOTEBOOK_TEMPLATES[1],
    [selectedTemplateId]
  );

  const handleExportPNG = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#09090b]">
      {/* 1. Studio Header Toolbar */}
      <div className="h-14 bg-white border-b border-zinc-200 px-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-zinc-950 text-white flex items-center justify-center">
              <PenTool className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-zinc-950 font-['Outfit'] hidden sm:inline">
              Handwriting Studio
            </span>
          </div>

          <div className="h-4 w-px bg-zinc-200 mx-1 hidden sm:block" />

          {/* Quick Preset Selector */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {SAMPLE_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setContent(p.text)}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors border ${
                  content === p.text
                    ? "bg-zinc-950 text-white border-zinc-950"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportPNG}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer border-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Document</span>
          </button>
        </div>
      </div>

      {/* 2. Main Studio Work Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Center Workspace (65% width): Paper Canvas + Input */}
        <div className="flex-1 flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Paper Canvas Display */}
          <div className="w-full max-w-[620px] flex items-center justify-center">
            <PaperPreview
              content={content}
              fontFamily={fontFamily}
              fontSize={fontSize}
              lineHeight={lineHeight}
              letterSpacing={letterSpacing}
              wordSpacing={wordSpacing}
              inkColor={inkColor}
              paperTemplateId={selectedTemplateId}
              paperImageUrl={selectedTemplate.image}
              tilt={tilt}
              autoMistakesEnabled={autoMistakes}
              mistakeRate={mistakeRate}
              mistakeStyle={mistakeStyle}
              scannerEffectId={scannerEffectId}
              shadowEffectId={shadowEffectId}
              activePage={activePage}
              headerDate={headerDate}
            />
          </div>

          {/* Direct Text Input Drawer */}
          <div className="w-full max-w-[620px] bg-white rounded-xl border border-zinc-200 p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                Document Text
              </span>
              <span>
                {content.length} characters • {content.split("\n").length} lines
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Type or paste your text here..."
              className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-sans text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:bg-white resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Inspector Panel (35% width, fixed 340px on desktop) */}
        <div className="w-full lg:w-[340px] bg-white border-t lg:border-t-0 lg:border-l border-zinc-200 flex flex-col shrink-0 overflow-y-auto">
          {/* Tab Selector */}
          <div className="flex items-center border-b border-zinc-200 bg-zinc-50/50 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("style")}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === "style"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Ink & Style</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("paper")}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === "paper"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Paper</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("realism")}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === "realism"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Realism</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 space-y-5">
            {/* TAB 1: INK & STYLE */}
            {activeTab === "style" && (
              <div className="space-y-4">
                {/* Font Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    Handwriting Font
                  </label>
                  <FontPickerDropdown value={fontFamily} onChange={setFontFamily} />
                </div>

                {/* Ink Swatches */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    Ink Pigment
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {INK_PALETTES.map((ink) => (
                      <button
                        key={ink.hex}
                        type="button"
                        onClick={() => setInkColor(ink.hex)}
                        title={ink.name}
                        className={`h-8 rounded-md border transition-all cursor-pointer ${
                          inkColor === ink.hex
                            ? "ring-2 ring-zinc-950 scale-110 border-white shadow-xs"
                            : "border-zinc-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: ink.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Size Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                      Font Size
                    </span>
                    <span className="font-mono text-zinc-600">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="36"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-zinc-950 cursor-pointer"
                  />
                </div>

                {/* Line Height Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                      Line Height
                    </span>
                    <span className="font-mono text-zinc-600">{lineHeight.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="2.2"
                    step="0.05"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full accent-zinc-950 cursor-pointer"
                  />
                </div>

                {/* Letter Spacing */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                      Letter Spacing
                    </span>
                    <span className="font-mono text-zinc-600">{letterSpacing.toFixed(1)}px</span>
                  </div>
                  <input
                    type="range"
                    min="-1"
                    max="4"
                    step="0.5"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-zinc-950 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: PAPER & TEMPLATES */}
            {activeTab === "paper" && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                  Select Paper Sheet ({NOTEBOOK_TEMPLATES.length} HD Templates)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {NOTEBOOK_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setSelectedTemplateId(tmpl.id)}
                      className={`p-2 rounded-lg border text-left transition-all flex flex-col gap-1.5 cursor-pointer ${
                        selectedTemplateId === tmpl.id
                          ? "border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950"
                          : "border-zinc-200 hover:border-zinc-300 bg-white"
                      }`}
                    >
                      <div className="w-full aspect-[4/3] rounded bg-zinc-100 overflow-hidden border border-zinc-200">
                        <img
                          src={tmpl.image}
                          alt={tmpl.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-zinc-900 truncate">
                        {tmpl.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Paper Tilt Slider */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-zinc-800 uppercase tracking-wider text-[11px]">
                      Paper Angle / Tilt
                    </span>
                    <span className="font-mono text-zinc-600">{tilt}°</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={tilt}
                    onChange={(e) => setTilt(Number(e.target.value))}
                    className="w-full accent-zinc-950 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: REALISM & SCANNER */}
            {activeTab === "realism" && (
              <div className="space-y-4">
                {/* Auto-Mistakes Toggle */}
                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900">
                      Simulate Human Mistakes
                    </span>
                    <input
                      type="checkbox"
                      checked={autoMistakes}
                      onChange={(e) => setAutoMistakes(e.target.checked)}
                      className="w-4 h-4 accent-zinc-950 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Randomly crosses out words or inserts natural typos with scratch lines to mimic real homework notes.
                  </p>
                </div>

                {/* Scanner Filter Preset */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    Scanner Filter
                  </label>
                  <select
                    value={scannerEffectId}
                    onChange={(e) => setScannerEffectId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 cursor-pointer"
                  >
                    {SCANNER_EFFECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.badge})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lighting & Shadow Overlay */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                    Natural Shadow Overlay
                  </label>
                  <select
                    value={shadowEffectId}
                    onChange={(e) => setShadowEffectId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 cursor-pointer"
                  >
                    {SHADOW_EFFECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.badge})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
