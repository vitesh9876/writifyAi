"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PenTool,
  Scroll,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Sliders,
  CheckCircle2,
  FileDown,
  ShieldCheck,
  Zap,
} from "lucide-react";
import PaperPreview from "@/components/PaperPreview";
import { NOTEBOOK_TEMPLATES } from "@/lib/papers";
import { HANDWRITING_FONTS } from "@/lib/fonts";

export default function HomePage() {
  const [demoText, setDemoText] = useState(
    "Photosynthesis is the biological process used by plants, algae, and cyanobacteria to convert light energy into chemical energy stored in glucose molecules.\n\nKey Reactants: 6CO2 + 6H2O + Sunlight -> C6H12O6 + 6O2\n\nThe light reactions occur across thylakoid membranes where chlorophyll absorbs photons, driving ATP synthesis and NADPH generation."
  );
  const [selectedFont, setSelectedFont] = useState("cursive_real");
  const [selectedInk, setSelectedInk] = useState("#000066");
  const [selectedPaper, setSelectedPaper] = useState("classic2");

  const INK_SWATCHES = [
    { name: "Royal Blue", hex: "#000066" },
    { name: "Classic Navy", hex: "#0033cc" },
    { name: "Obsidian Black", hex: "#1a1a1a" },
    { name: "Forest Emerald", hex: "#14452f" },
    { name: "Crimson Rose", hex: "#800020" },
  ];

  const quickStudios = [
    {
      title: "Handwriting Studio",
      desc: "Convert essays, assignments, and notes onto lined paper with 120+ organic handwriting fonts.",
      href: "/editor",
      icon: PenTool,
      badge: "Core Studio",
    },
    {
      title: "Stationery & Letters",
      desc: "Romantic, formal, and apology letters formatted onto aesthetic stationery with wax seals.",
      href: "/letters",
      icon: Mail,
      badge: "Stationery",
    },
    {
      title: "Canvas Design Studio",
      desc: "Design vector social media quote cards, posters, and square visuals with cursive accents.",
      href: "/canvas",
      icon: Layers,
      badge: "Canvas",
    },
    {
      title: "Saved History",
      desc: "Access your cloud-synced assignments, drafted letters, and recently exported documents.",
      href: "/history",
      icon: Clock,
      badge: "Storage",
    },
  ];

  const selectedTemplate = NOTEBOOK_TEMPLATES.find((t) => t.id === selectedPaper) || NOTEBOOK_TEMPLATES[1];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#09090b]">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800">
              <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
              <span>Next-Generation Handwriting Simulation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 font-['Outfit'] leading-tight">
              Convert Digital Text to Realistic Handwriting
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Transform typed homework, essays, and notes into authentic handwritten documents with organic baseline drift, 14 paper backgrounds, and document scanner filters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/editor"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Launch Handwriting Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#demo-section"
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors border border-zinc-200 flex items-center justify-center gap-2"
              >
                <span>Try Live Demo</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-900" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-900" />
                <span>Zero Watermarks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-zinc-900" />
                <span>No Sign-Up Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Quick Access Studios Grid */}
      <section className="py-12 md:py-16 border-b border-zinc-200 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
              Creative Studios
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-['Outfit'] mt-1">
              Quick Access Studios
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStudios.map((studio) => {
              const Icon = studio.icon;
              return (
                <Link
                  key={studio.title}
                  href={studio.href}
                  className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-md transition-all group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold border border-zinc-200">
                        {studio.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950 group-hover:text-zinc-800 transition-colors font-['Outfit']">
                      {studio.title}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {studio.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-zinc-900 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Live Studio Demo Section */}
      <section id="demo-section" className="py-16 md:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
              Interactive Preview
            </span>
            <h2 className="text-3xl font-black text-zinc-950 tracking-tight font-['Outfit'] mt-1">
              Experience Authentic Penmanship
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              Type directly or switch styles below to see real-time handwriting synthesis on authentic notebook paper.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-5 bg-[#f8fafc] p-5 rounded-2xl border border-zinc-200">
              {/* Text Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                  Document Text
                </label>
                <textarea
                  value={demoText}
                  onChange={(e) => setDemoText(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none font-sans leading-relaxed"
                  placeholder="Enter or paste notes here..."
                />
              </div>

              {/* Font Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                  Handwriting Font Style
                </label>
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer"
                >
                  {HANDWRITING_FONTS.slice(0, 15).map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Ink Swatches */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                  Ink Pigment
                </label>
                <div className="flex items-center gap-2">
                  {INK_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => setSelectedInk(swatch.hex)}
                      className={`w-7 h-7 rounded-md border transition-all cursor-pointer ${
                        selectedInk === swatch.hex
                          ? "ring-2 ring-zinc-950 scale-110 border-white shadow-xs"
                          : "border-zinc-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    />
                  ))}
                </div>
              </div>

              {/* Paper Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
                  Paper Background
                </label>
                <select
                  value={selectedPaper}
                  onChange={(e) => setSelectedPaper(e.target.value)}
                  className="w-full p-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer"
                >
                  {NOTEBOOK_TEMPLATES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <Link
                  href="/editor"
                  className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Customize in Full Studio</span>
                </Link>
              </div>
            </div>

            {/* Right Paper Canvas Preview (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="w-full max-w-[560px]">
                <PaperPreview
                  content={demoText}
                  fontFamily={selectedFont}
                  fontSize={20}
                  lineHeight={1.4}
                  letterSpacing={0.5}
                  wordSpacing={2}
                  inkColor={selectedInk}
                  paperTemplateId={selectedPaper}
                  paperImageUrl={selectedTemplate.image}
                  tilt={0}
                  autoMistakesEnabled={false}
                  scannerEffectId="none"
                  shadowEffectId="none"
                  activePage={1}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four Core Pillars */}
      <section className="py-16 md:py-20 bg-[#f8fafc] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
              Engine Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight font-['Outfit']">
              Why Writify Looks Genuinely Handwritten
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 font-['Outfit']">
                Organic Baseline Drift
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Human handwriting naturally fluctuates. Writify injects micro-variations into character baseline alignment, rotation angles, and inter-letter kerning.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 font-['Outfit']">
                14 Authentic Paper Sheets
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Choose from spiral student notebooks, recycled kraft sheets, double-ruled margins, and parchment textures scanned from physical paper.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-zinc-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                <FileDown className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-zinc-950 font-['Outfit']">
                Multi-Page 300 DPI Export
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Generate sharp print-ready PDFs and PNGs suitable for academic submissions, study guides, and personal stationery with no watermarks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
