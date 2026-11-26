"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  SplitCompareIcon,
  SideBySideIcon,
  ExpandIcon,
  CollapseIcon,
  RawViewIcon,
  BBoxViewIcon,
} from "@/components/Icons";

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
      className={`rounded-2xl border border-brown-200/90 bg-cream-50 overflow-hidden flex flex-col shadow-warm-md ${
        isFullscreen ? "fixed inset-4 z-50 bg-cream-50 p-4 shadow-2xl border-brown-300" : "w-full"
      }`}
    >
      {/* Comparator Header Toolbar */}
      <div className="p-3 bg-cream-200/75 border-b border-brown-200 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-brown-800 truncate max-w-[200px] sm:max-w-xs">
            {filename}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-700 font-mono text-[11px] font-semibold border border-sage-200">
            {inferenceTimeMs.toFixed(1)} ms
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-cream-100 p-0.5 rounded-xl border border-brown-200">
            <button
              type="button"
              onClick={() => setViewMode("slider")}
              className={`btn-kinetic group px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 ${
                viewMode === "slider"
                  ? "bg-sage-600 text-cream-50 shadow-warm-sm"
                  : "text-brown-700 hover:text-brown-800 hover:bg-brown-100/70"
              }`}
            >
              <SplitCompareIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
              <span>Split Slider</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("side-by-side")}
              className={`btn-kinetic group px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 ${
                viewMode === "side-by-side"
                  ? "bg-sage-600 text-cream-50 shadow-warm-sm"
                  : "text-brown-700 hover:text-brown-800 hover:bg-brown-100/70"
              }`}
            >
              <SideBySideIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
              <span>Side-by-Side</span>
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn-kinetic group p-2 rounded-lg bg-cream-50 text-brown-700 hover:text-sage-700 hover:bg-sage-50 border border-brown-200 hover:border-sage-300 shadow-warm-sm"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <CollapseIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-90" />
            ) : (
              <ExpandIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
            )}
          </button>
        </div>
      </div>

      {/* Main Image View Area */}
      <div className="p-4 flex-1 flex items-center justify-center bg-brown-100/45 overflow-hidden">
        {viewMode === "slider" ? (
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
            className="relative select-none cursor-ew-resize max-h-[550px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-brown-200 bg-cream-100/90 shadow-inner"
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
              className="absolute top-0 bottom-0 w-0.5 bg-sage-600 shadow-[0_0_12px_rgba(71,102,67,0.45)] pointer-events-none z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-cream-50 border-2 border-sage-600 flex items-center justify-center shadow-warm-md text-sage-700">
                <SplitCompareIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Badges for Before / After */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-cream-50/90 backdrop-blur-sm text-[11px] font-mono font-semibold text-brown-800 border border-brown-200 shadow-warm-sm pointer-events-none">
              Original
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-sage-600/95 backdrop-blur-sm text-[11px] font-mono font-semibold text-cream-50 border border-sage-500 shadow-warm-sm pointer-events-none">
              YOLO Detected
            </div>
          </div>
        ) : (
          /* Side-by-Side Comparison Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Left: Original */}
            <div className="rounded-xl border border-brown-200 bg-cream-50 p-3 flex flex-col items-center shadow-warm-sm">
              <span className="text-xs font-semibold text-brown-700 mb-2.5 self-start flex items-center space-x-1.5">
                <RawViewIcon className="h-3.5 w-3.5 text-brown-500" />
                <span>Original Image</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original"
                className="max-h-[380px] max-w-full rounded-lg object-contain border border-brown-200/60"
              />
            </div>

            {/* Right: YOLO Detected */}
            <div className="rounded-xl border border-sage-300 bg-cream-50 p-3 flex flex-col items-center shadow-warm-sm">
              <span className="text-xs font-semibold text-sage-700 mb-2.5 self-start flex items-center space-x-1.5">
                <BBoxViewIcon className="h-3.5 w-3.5 text-sage-600" />
                <span>Annotated Bounding Boxes</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={annotatedUrl}
                alt="Annotated"
                className="max-h-[380px] max-w-full rounded-lg object-contain shadow-warm-sm border border-sage-200"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
