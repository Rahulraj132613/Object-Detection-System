"use client";

import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, Columns, Maximize2, Minimize2, ZoomIn, Eye } from "lucide-react";

interface ImageComparatorProps {
  originalUrl: string;
  annotatedUrl: string;
  filename: string;
  inferenceTimeMs: number;
}

export default function ImageComparator({
  originalUrl,
  annotatedUrl,
  filename,
  inferenceTimeMs,
}: ImageComparatorProps) {
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider");
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent | React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: TouchEvent | React.TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMouseMove(e);
    };

    if (isDragging) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("mousemove", handleGlobalMouseMove);
    }
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging]);

  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col ${
        isFullscreen ? "fixed inset-4 z-50 bg-slate-950/95 p-4 shadow-2xl" : "w-full"
      }`}
    >
      {/* Comparator Header Toolbar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-xs">
            {filename}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
            {inferenceTimeMs.toFixed(1)} ms
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
            <button
              onClick={() => setViewMode("slider")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-all ${
                viewMode === "slider"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <SlidersHorizontal className="h-3 w-3" />
              <span>Split Slider</span>
            </button>
            <button
              onClick={() => setViewMode("side-by-side")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1 transition-all ${
                viewMode === "side-by-side"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Columns className="h-3 w-3" />
              <span>Side-by-Side</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Image View Area */}
      <div className="p-4 flex-1 flex items-center justify-center bg-black/40 overflow-hidden">
        {viewMode === "slider" ? (
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            className="relative select-none cursor-ew-resize max-h-[550px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-black/50"
          >
            {/* Base layer: Annotated Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={annotatedUrl}
              alt="Annotated detection"
              className="max-h-[520px] max-w-full object-contain pointer-events-none"
            />

            {/* Overlaid layer: Original Image clipped to sliderPosition */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original uploaded"
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee] pointer-events-none z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg text-cyan-400">
                <SlidersHorizontal className="h-3.5 w-3.5 rotate-90" />
              </div>
            </div>

            {/* Badges for Before / After */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur text-[11px] font-mono text-slate-300 border border-white/10 pointer-events-none">
              Original
            </div>
            <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur text-[11px] font-mono text-cyan-400 border border-cyan-500/20 pointer-events-none">
              YOLO Detected
            </div>
          </div>
        ) : (
          /* Side-by-Side Comparison Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Left: Original */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-400 mb-2 self-start flex items-center space-x-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span>Original Image</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original"
                className="max-h-[380px] max-w-full rounded-lg object-contain"
              />
            </div>

            {/* Right: YOLO Detected */}
            <div className="rounded-xl border border-indigo-900/40 bg-slate-950/70 p-3 flex flex-col items-center">
              <span className="text-xs font-semibold text-cyan-400 mb-2 self-start flex items-center space-x-1.5">
                <ZoomIn className="h-3.5 w-3.5" />
                <span>Annotated Bounding Boxes</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={annotatedUrl}
                alt="Annotated"
                className="max-h-[380px] max-w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
