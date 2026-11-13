"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenTool, Scroll, Mail, Clock, Sparkles, CheckCircle2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Handwriting Studio", href: "/editor", icon: PenTool },
    { name: "Letter Studio", href: "/letters", icon: Mail },
    { name: "Vintage Scroll", href: "/scroll-letter", icon: Scroll },
    { name: "Saved History", href: "/history", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0813]/85 border-b border-fuchsia-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-pink-600 to-amber-500 p-0.5 shadow-lg shadow-fuchsia-900/30 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#120a21] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-fuchsia-400 group-hover:text-amber-300 transition-colors" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-fuchsia-200 to-amber-300 bg-clip-text text-transparent">
              Writify<span className="text-fuchsia-400 font-extrabold ml-1">AI</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              100% Free
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-md shadow-fuchsia-900/40"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
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
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All Features Unlocked</span>
          </div>

          <Link
            href="/editor"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 shadow-lg shadow-fuchsia-600/30 transition-all duration-200 hover:scale-[1.02]"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Generate Now</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
