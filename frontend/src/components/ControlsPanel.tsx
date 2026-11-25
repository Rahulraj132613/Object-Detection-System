"use client";

import React, { useState } from "react";
import { Sliders, Filter, Sparkles, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { COCOClass } from "@/lib/types";

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

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
          <Sliders className="h-4 w-4 text-indigo-400" />
          <span>Inference Parameters</span>
        </h3>
        <span className="text-xs text-slate-400">YOLOv8 Nano Engine</span>
      </div>

      {/* 1. Confidence Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <label htmlFor="conf-slider" className="text-slate-300">
            Confidence Threshold
          </label>
          <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-semibold border border-indigo-500/30">
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
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>5% (High Recall)</span>
          <span>50%</span>
          <span>95% (High Precision)</span>
        </div>
      </div>

      {/* 2. IoU / NMS Threshold */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <label htmlFor="iou-slider" className="text-slate-300">
            IoU (NMS Overlap)
          </label>
          <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-semibold border border-cyan-500/30">
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
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Strict Overlap</span>
          <span>0.45 Standard</span>
          <span>Loose Overlap</span>
        </div>
      </div>

      {/* 3. Category Filter Accordion */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
        <button
          type="button"
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-slate-300 hover:bg-slate-800/40 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <Filter className="h-3.5 w-3.5 text-indigo-400" />
            <span>Target Categories</span>
            {selectedClasses.length > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                {selectedClasses.length} selected
              </span>
            )}
          </span>
          {showCategoryFilter ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
        </button>

        {showCategoryFilter && (
          <div className="p-3 border-t border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Search 80 COCO classes..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {selectedClasses.length > 0 && (
                <button
                  type="button"
                  onClick={clearClassFilters}
                  className="ml-2 text-[11px] text-rose-400 hover:underline shrink-0"
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
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/60"
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
        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg ${
          hasImage && !isLoading
            ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-500/25 cursor-pointer hover:scale-[1.01]"
            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
        }`}
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin text-indigo-300" />
            <span>Analyzing with YOLOv8...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            <span>Run Object Detection</span>
          </>
        )}
      </button>
    </div>
  );
}
