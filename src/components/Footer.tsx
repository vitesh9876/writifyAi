import Link from "next/link";
import { Check, Mail, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-600 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md overflow-hidden border border-zinc-200">
                <img
                  src="/logo.svg"
                  alt="Writify AI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-base font-bold text-zinc-950 tracking-tight font-['Outfit']">
                Writify
              </span>
            </Link>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Text to handwriting generator. Converts typed documents, notes, and essays into handwritten cursive pages with natural pen variations.
            </p>
          </div>

          {/* Creation Studios */}
          <div>
            <h4 className="text-zinc-950 font-bold text-xs tracking-wider uppercase mb-3 font-['Outfit']">
              Studios
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/editor" className="hover:text-zinc-950 transition-colors">
                  Handwriting Studio
                </Link>
              </li>
              <li>
                <Link href="/letters" className="hover:text-zinc-950 transition-colors">
                  Letter Studio
                </Link>
              </li>
              <li>
                <Link href="/scroll-letter" className="hover:text-zinc-950 transition-colors">
                  Vintage Parchment
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-zinc-950 transition-colors">
                  Saved Documents
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-zinc-950 font-bold text-xs tracking-wider uppercase mb-3 font-['Outfit']">
              Features
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-700" />
                <span>Ruled notebook line snapping</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-700" />
                <span>Multi-pen headings and student headers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-700" />
                <span>PDF and JPG exports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-700" />
                <span>Custom handwriting font scanner</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-zinc-950 font-bold text-xs tracking-wider uppercase mb-3 font-['Outfit']">
              Contact Developer
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed mb-3">
              Direct developer contact for feature requests and support:
            </p>
            <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5 text-zinc-700 text-[11px]">
              <div>
                <a
                  href="https://wa.me/919494006022"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-medium text-zinc-900"
                >
                  WhatsApp: +91 9494006022
                </a>
              </div>
              <div>
                <a
                  href="mailto:viteshpallapothu07@gmail.com"
                  className="hover:underline font-medium text-zinc-900"
                >
                  viteshpallapothu07@gmail.com
                </a>
              </div>
              <div>
                <a
                  href="https://instagram.com/vitesh_07_02"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-medium text-zinc-900"
                >
                  Instagram: @vitesh_07_02
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Writify. Free community edition.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-950 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
