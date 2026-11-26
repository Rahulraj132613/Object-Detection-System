import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Object Detection & Recognition System",
  description:
    "Production-ready college project using Next.js, Tailwind CSS, Ultralytics YOLOv8 nano, OpenCV, and FastAPI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream-100 text-brown-800 flex flex-col font-sans antialiased selection:bg-sage-200 selection:text-brown-800">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          {children}
        </main>
        <footer className="w-full border-t border-brown-200/80 bg-cream-50/75 backdrop-blur-sm py-4 text-center text-xs text-brown-600">
          AI Object Detection &amp; Recognition System • Ultralytics YOLOv8 Nano &amp; FastAPI
        </footer>
      </body>
    </html>
  );
}
