"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PenTool, Scroll, Mail, Clock, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Handwriting Studio", href: "/editor", icon: PenTool },
    { name: "Letter Studio", href: "/letters", icon: Mail },
    { name: "Vintage Scroll", href: "/scroll-letter", icon: Scroll },
    { name: "Saved History", href: "/history", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#07080d]/80 border-b border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/15 shadow-[0_0_20px_rgba(99,102,241,0.35)] group-hover:scale-105 transition-all duration-300">
            <img
              src="/logo.svg"
              alt="Writify AI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-white font-['Outfit']">
              Writify<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-extrabold ml-1">AI</span>
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 tracking-wider">
              100% Free
            </span>
          </div>
        </Link>

        {/* Center Nav Links - Bencho / BoardUI Floating Dock */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_4px_16px_rgba(99,102,241,0.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Community Edition</span>
          </div>

          <Link
            href="/editor"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:brightness-110 shadow-[0_0_25px_rgba(99,102,241,0.45)] border border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Start Writing</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
