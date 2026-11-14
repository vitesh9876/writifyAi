import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Writify AI | Text to Handwriting AI - Realistic Handwriting Generator",
  description: "Convert digital text, files, and essays into highly realistic handwriting online for free with Writify AI. The leading Text to Handwriting generator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-[#09090b] selection:bg-[#09090b] selection:text-white antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
