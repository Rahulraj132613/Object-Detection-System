"use client";

import React, { useState } from "react";
import { COCOClass } from "@/lib/types";
import {
  TuningSlidersIcon,
  FilterFunnelIcon,
  ScanTriggerIcon,
  OrbitalSpinnerIcon,
  ChevronIcon,
  SearchLensIcon,
} from "@/components/Icons";

interface ControlsPanelProps {
  confidence: number;
  setConfidence: (val: number) => void;
  iouThreshold: number;
  setIouThreshold: (val: number) => void;
  availableClasses: COCOClass[];
  selectedClasses: string[];
  setSelectedClasses: (classes: string[]) => void;
  onDetect: () => void;
  isLoading: boolean;
  hasImage: boolean;
}

export default function ControlsPanel({
  confidence,
  setConfidence,
  iouThreshold,
  setIouThreshold,
  availableClasses,
  selectedClasses,
  setSelectedClasses,
  onDetect,
  isLoading,
  hasImage,
}: ControlsPanelProps) {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  const toggleClass = (className: string) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  const clearClassFilters = () => {
    setSelectedClasses([]);
  };

  const filteredClassList = availableClasses.filter((cls) =>
    cls.name.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const confidencePercent = Math.round(((confidence - 0.05) / 0.9) * 100);
  const iouPercent = Math.round(((iouThreshold - 0.1) / 0.8) * 100);

  return (
    <div className="w-full rounded-2xl border border-brown-200/90 bg-cream-50/95 p-5 space-y-5 shadow-warm-sm">
      <div className="flex items-center justify-between border-b border-brown-200/80 pb-3">
        <h3 className="text-sm font-bold text-brown-800 flex items-center space-x-2">
          <TuningSlidersIcon className="h-4 w-4 text-sage-600" />
          <span>Inference Parameters</span>
        </h3>
        <span className="px-2 py-0.5 rounded-md bg-brown-100 text-brown-700 border border-brown-200/80 text-[11px] font-medium">
          YOLOv8 Nano Engine
        </span>
      </div>

      {/* 1. Confidence Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <label htmlFor="conf-slider" className="text-brown-700 font-semibold">
            Confidence Threshold
          </label>
          <span className="px-2.5 py-0.5 rounded-md bg-sage-100 text-sage-700 font-mono font-bold border border-sage-200">
            {Math.round(confidence * 100)}%
          </span>
        </div>
        <input
          id="conf-slider"
          type="range"
          min="0.05"
          max="0.95"
          step="0.05"
          value={confidence}
          onChange={(e) => setConfidence(parseFloat(e.target.value))}
          disabled={isLoading}
          style={{
            background: `linear-gradient(to right, #5A7D55 ${confidencePercent}%, #DFCBB3 ${confidencePercent}%)`,
          }}
          className="studio-range w-full cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-brown-500 font-mono">
          <span>5% (High Recall)</span>
          <span>50%</span>
          <span>95% (High Precision)</span>
        </div>
      </div>

      {/* 2. IoU / NMS Threshold */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <label htmlFor="iou-slider" className="text-brown-700 font-semibold">
            IoU (NMS Overlap)
          </label>
          <span className="px-2.5 py-0.5 rounded-md bg-brown-100 text-brown-700 font-mono font-bold border border-brown-200">
            {Math.round(iouThreshold * 100)}%
          </span>
        </div>
        <input
          id="iou-slider"
          type="range"
          min="0.10"
          max="0.90"
          step="0.05"
          value={iouThreshold}
          onChange={(e) => setIouThreshold(parseFloat(e.target.value))}
          disabled={isLoading}
          style={{
            background: `linear-gradient(to right, #B28D67 ${iouPercent}%, #DFCBB3 ${iouPercent}%)`,
          }}
          className="studio-range brown-thumb w-full cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-brown-500 font-mono">
          <span>Strict Overlap</span>
          <span>0.45 Standard</span>
          <span>Loose Overlap</span>
        </div>
      </div>

      {/* 3. Category Filter Accordion */}
      <div className="border border-brown-200 rounded-xl overflow-hidden bg-cream-100/75">
        <button
          type="button"
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          className="btn-kinetic group w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-brown-800 hover:bg-brown-100/60"
        >
          <span className="flex items-center space-x-2">
            <FilterFunnelIcon className="h-3.5 w-3.5 text-sage-600 transition-transform duration-200 group-hover:scale-110" />
            <span>Target Categories</span>
            {selectedClasses.length > 0 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-sage-600 text-cream-50 font-mono">
                {selectedClasses.length} selected
              </span>
            )}
          </span>
          <ChevronIcon
            className={`h-3.5 w-3.5 text-brown-500 transition-transform duration-200 ${
              showCategoryFilter ? "rotate-180" : ""
            }`}
          />
        </button>

        {showCategoryFilter && (
          <div className="p-3 border-t border-brown-200 bg-cream-50/90 space-y-2.5 animate-fade-up">
            <div className="flex items-center justify-between gap-2">
              <div className="relative w-full">
                <SearchLensIcon className="h-3.5 w-3.5 text-brown-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search 80 COCO classes..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg bg-cream-100 border border-brown-200 text-brown-800 placeholder-brown-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500/40"
                />
              </div>
              {selectedClasses.length > 0 && (
                <button
                  type="button"
                  onClick={clearClassFilters}
                  className="btn-kinetic px-2.5 py-1.5 rounded-lg bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-600 border border-terracotta-200 text-[11px] font-semibold shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="max-h-40 overflow-y-auto flex flex-wrap gap-1.5 pr-1">
              {filteredClassList.map((cls) => {
                const isSelected = selectedClasses.includes(cls.name);
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => toggleClass(cls.name)}
                    className={`btn-kinetic px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                      isSelected
                        ? "bg-sage-600 text-cream-50 border-sage-600 shadow-warm-sm"
                        : "bg-cream-100 text-brown-700 border-brown-200 hover:bg-sage-50 hover:text-sage-700 hover:border-sage-300"
                    }`}
                  >
                    {cls.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Action Button */}
      <button
        type="button"
        onClick={onDetect}
        disabled={!hasImage || isLoading}
        className={`btn-kinetic group w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 border ${
          hasImage && !isLoading
            ? "bg-gradient-to-r from-sage-600 via-sage-500 to-sage-600 hover:from-sage-700 hover:via-sage-600 hover:to-sage-700 text-cream-50 border-sage-600 shadow-sage-glow"
            : isLoading
            ? "bg-sage-500 text-cream-50 border-sage-600 shadow-warm-sm opacity-90"
            : "bg-brown-100 text-brown-500 border-brown-200/90"
        }`}
      >
        {isLoading ? (
          <>
            <OrbitalSpinnerIcon className="h-4 w-4 text-cream-50" />
            <span>Analyzing with YOLOv8...</span>
          </>
        ) : (
          <>
            <ScanTriggerIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                hasImage ? "group-hover:scale-110 group-hover:rotate-12" : ""
              }`}
            />
            <span>Run Object Detection</span>
          </>
        )}
      </button>
    </div>
  );
}
