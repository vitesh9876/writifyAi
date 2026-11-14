"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { HANDWRITING_FONTS, FontDefinition } from "@/lib/fonts";
import { Check, ChevronDown, Search, Sparkles, X } from "lucide-react";

interface FontPickerDropdownProps {
  value: string;
  onChange: (fontId: string) => void;
  label?: string;
  isSecondary?: boolean;
}

const CATEGORIES = [
  "All",
  "Cursive",
  "Script",
  "Casual",
  "Print",
  "Latin Script",
  "Multilingual",
];

export default function FontPickerDropdown({
  value,
  onChange,
  label = "Font Style",
  isSecondary = false,
}: FontPickerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentFont = useMemo(
    () => HANDWRITING_FONTS.find((f) => f.id === value) || HANDWRITING_FONTS[0],
    [value]
  );

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered fonts
  const filteredFonts = useMemo(() => {
    return HANDWRITING_FONTS.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.id.toLowerCase().includes(search.toLowerCase()) ||
        f.category.toLowerCase().includes(search.toLowerCase());

      const matchesCat =
        selectedCategory === "All" ||
        f.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* 1. Main Button (Matches Writify input style) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2.5 bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none flex items-center justify-between text-left transition-all cursor-pointer shadow-2xs"
      >
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-xs font-bold text-slate-800 truncate">
            {currentFont.name}
          </span>
          {/* Live sample preview inside the closed button */}
          <span
            style={{ fontFamily: currentFont.fontFamily }}
            className="text-base text-indigo-700 truncate leading-none mt-0.5"
          >
            Aa Bb Gg 123 - The quick brown fox jumps
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-indigo-600" : ""
          }`}
        />
      </button>

      {/* 2. Custom Popover with REAL Live Font Previews */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-[340px] sm:w-[380px] max-w-[95vw] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-fade-in">
          {/* Header & Search */}
          <div className="p-3 border-b border-slate-100 bg-slate-50/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Select Handwriting Font ({HANDWRITING_FONTS.length} Total)
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search font by name or script..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-indigo-500 text-slate-800"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Font List with Large Visual Previews */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100 p-1">
            {filteredFonts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No handwriting fonts found matching &quot;{search}&quot;
              </div>
            ) : (
              filteredFonts.map((font) => {
                const isSelected = font.id === value;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => {
                      onChange(font.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-2.5 text-left rounded-xl transition-all flex flex-col gap-1 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50/80 border border-indigo-200"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    {/* Inject @font-face rule for this font so preview renders */}
                    {font.url && (
                      <style
                        dangerouslySetInnerHTML={{
                          __html: `
                            @font-face {
                              font-family: '${font.name}';
                              src: url('${font.url}') format('${font.url.endsWith(".woff2") ? "woff2" : "truetype"}');
                              font-display: swap;
                            }
                          `,
                        }}
                      />
                    )}

                    {/* Font Title Row */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-bold text-slate-800 truncate">
                          {font.name}
                        </span>
                        {!font.isCore && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 uppercase tracking-wider">
                            100% Free
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[10px] text-slate-400">
                          {font.category}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                        )}
                      </div>
                    </div>

                    {/* LIVE FONT PREVIEW (Actual Cursive / Handwritten text in this font) */}
                    <div
                      style={{ fontFamily: font.fontFamily }}
                      className="text-lg sm:text-xl text-slate-800 tracking-wide leading-tight py-0.5 truncate"
                    >
                      Sphinx of black quartz, judge my vow
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

