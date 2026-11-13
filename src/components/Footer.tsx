import Link from "next/link";
import { Check, ShieldCheck, Mail, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-600 text-xs mt-20 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-black/10 shadow-sm">
                <img
                  src="/logo.svg"
                  alt="Writify AI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-black text-slate-900 tracking-tight font-['Outfit']">
                Writify<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-extrabold ml-1">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed">
              The premier text-to-handwriting intelligence suite. Transform digital documents, essays, and notes into authentic, organic cursive handwriting.
            </p>
            <div className="flex items-center gap-2 text-emerald-700 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-medium font-mono">100% Free Forever • Open Community Edition</span>
            </div>
          </div>

          {/* Creation Studios */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase mb-4 font-['Outfit']">
              Creation Studios
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/editor" className="hover:text-indigo-600 transition-colors">
                  Handwriting Studio
                </Link>
              </li>
              <li>
                <Link href="/letters" className="hover:text-indigo-600 transition-colors">
                  Letter Studio & Presets
                </Link>
              </li>
              <li>
                <Link href="/scroll-letter" className="hover:text-indigo-600 transition-colors">
                  Vintage Parchment & Wax Seals
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-indigo-600 transition-colors">
                  Saved Documents & History
                </Link>
              </li>
            </ul>
          </div>

          {/* Realistic Features */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase mb-4 font-['Outfit']">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>Ruled Line Snapping & Ink Physics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>Multi-Pen Academic Header Modes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>CamScanner & Lighting Realism</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>Lossless Vector PDF & JPG Export</span>
              </li>
            </ul>
          </div>

          {/* Dev & Direct Community */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase mb-4 font-['Outfit']">
              Direct Developer Connect
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">
              Built for students and creators worldwide. Need a custom feature or school paper template? Contact directly:
            </p>
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-2 text-slate-700 text-[11px]">
              <a
                href="https://wa.me/919494006022"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-700 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: +91 9494006022</span>
              </a>
              <a
                href="mailto:viteshpallapothu07@gmail.com"
                className="flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>viteshpallapothu07@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/vitesh_07_02"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-pink-600 hover:underline"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@vitesh_07_02</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Writify AI. Handcrafted for pristine handwriting realism. 100% Free Community Edition.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
