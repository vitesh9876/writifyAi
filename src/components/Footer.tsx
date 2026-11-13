import Link from "next/link";
import { Sparkles, Shield, CheckCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#07040d] border-t border-fuchsia-950/30 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              <span className="text-base font-bold text-white tracking-tight">
                Writify AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The leading Text to Handwriting AI generator. Convert essays, assignments, and romantic letters into authentic handwritten notes with organic pen variance.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 pt-1">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">100% Free Forever • Zero Sign-Up Required</span>
            </div>
          </div>

          {/* Creation Studios */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Creation Studios
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/editor" className="hover:text-fuchsia-300 transition-colors">
                  Text to Handwriting Assignment
                </Link>
              </li>
              <li>
                <Link href="/letters" className="hover:text-fuchsia-300 transition-colors">
                  Love & Friendship Letters
                </Link>
              </li>
              <li>
                <Link href="/scroll-letter" className="hover:text-fuchsia-300 transition-colors">
                  Vintage Parchment & Wax Seals
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-fuchsia-300 transition-colors">
                  Saved Documents & History
                </Link>
              </li>
            </ul>
          </div>

          {/* Realistic Features */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              All Features Unlocked
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>All 17+ Cursive & Script Fonts Free</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>CamScanner & Daylight Filters Free</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Handheld Phone Silhouette Shadow Free</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Unlimited High-Res PDF & JPG Exports</span>
              </li>
            </ul>
          </div>

          {/* Inferred Architecture */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              Zero Paywalls Guarantee
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-2">
              Every capability is completely unlocked out of the box with zero subscriptions, accounts, or credits required.
            </p>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1 text-emerald-300 text-[11px]">
              <div>✓ No account or login required</div>
              <div>✓ Unlimited multi-page generations</div>
              <div>✓ High-resolution downloads</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Writify AI. Completely free and open for all students & creators.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/editor" className="hover:text-slate-300">Assignment Studio</Link>
            <Link href="/letters" className="hover:text-slate-300">Letter Studio</Link>
            <Link href="/history" className="hover:text-slate-300">Saved History</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
