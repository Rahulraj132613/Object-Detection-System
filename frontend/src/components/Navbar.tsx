"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VisionBrandIcon, WorkbenchIcon, AnalyticsChartIcon } from "@/components/Icons";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brown-200/85 bg-cream-50/85 backdrop-blur-md shadow-warm-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 group rounded-xl py-1 pr-2 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sage-500 to-brown-400 p-[1.5px] shadow-warm-sm group-hover:shadow-sage-glow transition-all duration-300">
            <div className="h-full w-full bg-cream-50 rounded-[10.5px] flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-200">
              <VisionBrandIcon className="h-5 w-5 text-sage-600 group-hover:text-cream-50 group-hover:scale-110 transition-all duration-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-brown-800">
                VisionAI
              </span>
            </div>
            <p className="text-xs text-brown-600 hidden sm:block">
              AI Object Detection &amp; Recognition
            </p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1.5 sm:space-x-2">
          <Link
            href="/"
            className={`btn-kinetic group flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold border ${
              pathname === "/"
                ? "bg-sage-600 text-cream-50 border-sage-600 shadow-sage-glow"
                : "bg-cream-200/75 text-brown-700 border-brown-200/80 hover:bg-brown-100 hover:text-brown-800 hover:border-brown-300"
            }`}
          >
            <WorkbenchIcon
              className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                pathname === "/" ? "text-cream-50" : "text-sage-600"
              }`}
            />
            <span>Detection Workbench</span>
          </Link>

          <Link
            href="/analytics"
            className={`btn-kinetic group flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold border ${
              pathname === "/analytics"
                ? "bg-sage-600 text-cream-50 border-sage-600 shadow-sage-glow"
                : "bg-cream-200/75 text-brown-700 border-brown-200/80 hover:bg-brown-100 hover:text-brown-800 hover:border-brown-300"
            }`}
          >
            <AnalyticsChartIcon
              className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                pathname === "/analytics" ? "text-cream-50" : "text-brown-500"
              }`}
            />
            <span>Analytics &amp; History</span>
          </Link>
        </nav>


      </div>
    </header>
  );
}
