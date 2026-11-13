"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/85 border-b border-black/[0.06] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-black/10 shadow-[0_4px_12px_rgba(79,70,229,0.15)] group-hover:scale-105 transition-all duration-300">
            <img
              src="/logo.svg"
              alt="Writify AI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-slate-900 font-['Outfit']">
              Writify<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-extrabold ml-1">AI</span>
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 tracking-wider">
              100% Free
            </span>
          </div>
        </Link>

        {/* Center Nav Links - Bencho / BoardUI Floating Dock */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-black/[0.04]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
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
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Community Edition</span>
          </div>

          <Link
            href="/editor"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:brightness-105 shadow-[0_4px_16px_rgba(79,70,229,0.35)] border border-white/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Start Writing</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
