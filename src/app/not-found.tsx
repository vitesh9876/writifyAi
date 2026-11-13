import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <p className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-['Outfit']">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page you are looking for does not exist or has been moved. You can return to the home page or open the handwriting studio.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors shadow-xs"
            >
              Return Home
            </Link>
            <Link
              href="/editor"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-950 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              Open Studio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

