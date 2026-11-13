"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenTool, Scroll, Mail, Clock, Check } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Handwriting Studio", href: "/editor", icon: PenTool },
    { name: "Letter Studio", href: "/letters", icon: Mail },
    { name: "Vintage Scroll", href: "/scroll-letter", icon: Scroll },
    { name: "Saved History", href: "/history", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-200">
            <img
              src="/logo.svg"
              alt="Writify AI Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-950 font-['Outfit']">
            Writify
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700">
            Free
          </span>
        </Link>

        {/* Center Nav Links - Clean Structured Menu (NO Pills) */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions - Crisp Rectangular CTA (NO Pill, NO Purple) */}
        <div className="flex items-center gap-3">
          <Link
            href="/editor"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer border-none"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Open Studio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
