import React from "react";
import Link from "next/link";
import { Mail, Instagram, ArrowRight, ShieldCheck, Cpu, Code2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#09090b] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
            About Writify
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 font-['Outfit']">
            Crafting Digital Penmanship
          </h1>
          <p className="text-base text-zinc-600 leading-relaxed font-normal">
            Writify is a specialized web typography utility built to bridge the gap between digital text editing and authentic physical handwriting.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-zinc-200 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950 font-['Outfit']">
              Organic Baseline Drift
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Standard fonts repeat identical glyphs. Writify applies organic baseline offsets, character rotations, and humanized spacing variations to ensure every line looks genuine.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-zinc-200 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-950 font-['Outfit']">
              100% Free & Client-First
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              All tools, 120+ fonts, and 14 paper backgrounds are entirely free. We do not enforce watermarks, paywalls, or mandatory user accounts.
            </p>
          </div>
        </div>

        {/* Developer Contact */}
        <div className="p-6 bg-white rounded-xl border border-zinc-200 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-950 font-['Outfit'] uppercase tracking-wider">
            Creator & Community Support
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Writify is independently designed and engineered by Vitesh. For bug reports, font digitizations, or general inquiries, contact directly:
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 text-xs">
            <a
              href="mailto:viteshpallapothu07@gmail.com"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors font-medium border border-zinc-200"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>viteshpallapothu07@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/vitesh_07_02"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-colors font-medium border border-zinc-200"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@vitesh_07_02</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
