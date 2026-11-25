"use client";

import React, { useState } from "react";
import { Tag, Layers, CheckCircle2, Search, Crosshair } from "lucide-react";
import { DetectedObject } from "@/lib/types";

interface DetectionResultsProps {
  objects: DetectedObject[];
  classCounts: Record<string, number>;
  totalObjects: number;
  inferenceTimeMs: number;
}

export default function DetectionResults({
  objects,
  classCounts,
  totalObjects,
  inferenceTimeMs,
}: DetectionResultsProps) {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredObjects = objects.filter((obj) => {
    const matchesCategory = selectedClassFilter ? obj.class_name === selectedClassFilter : true;
    const matchesSearch = searchQuery
      ? obj.class_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obj.id.toString().includes(searchQuery)
      : true;
    return matchesCategory && matchesSearch;
  });

  const avgConfidence =
    objects.length > 0
      ? (objects.reduce((acc, curr) => acc + curr.confidence_percent, 0) / objects.length).toFixed(1)
      : "0";

  return (
    <div className="w-full space-y-4">
      {/* 1. Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Total Objects</span>
          <span className="text-2xl font-bold text-slate-100 font-mono mt-1">{totalObjects}</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Unique Categories</span>
          <span className="text-2xl font-bold text-indigo-400 font-mono mt-1">
            {Object.keys(classCounts).length}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Avg Confidence</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono mt-1">{avgConfidence}%</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col">
          <span className="text-[11px] font-medium text-slate-400">Inference Latency</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {inferenceTimeMs.toFixed(1)} <span className="text-xs font-normal text-slate-500">ms</span>
          </span>
        </div>
      </div>

      {/* 2. Detected Class Chips */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
            <Tag className="h-3.5 w-3.5 text-indigo-400" />
            <span>Class Breakdown</span>
          </span>
          {selectedClassFilter && (
            <button
              onClick={() => setSelectedClassFilter(null)}
              className="text-xs text-indigo-400 hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(classCounts).map(([className, count]) => {
            const isSelected = selectedClassFilter === className;
            return (
              <button
                key={className}
                type="button"
                onClick={() => setSelectedClassFilter(isSelected ? null : className)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                }`}
              >
                <span className="capitalize">{className}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px] font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Itemized Bounding Boxes Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            <span>Itemized Detections ({filteredObjects.length})</span>
          </span>

          <div className="relative w-48">
            <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {filteredObjects.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No objects match the current filters.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] sticky top-0 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Bounding Box (X1, Y1, X2, Y2)</th>
                  <th className="py-2.5 px-3">Dimension</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {filteredObjects.map((obj) => (
                  <tr key={obj.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2 px-3 text-slate-400">{obj.id}</td>
                    <td className="py-2 px-3">
                      <span
                        className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-sans font-medium capitalize"
                        style={{
                          backgroundColor: `${obj.color}15`,
                          color: obj.color,
                          border: `1px solid ${obj.color}40`,
                        }}
                      >
                        <Crosshair className="h-3 w-3" />
                        <span>{obj.class_name}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full"
                            style={{ width: `${obj.confidence_percent}%` }}
                          />
                        </div>
                        <span className="text-slate-200">{obj.confidence_percent.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-slate-400">
                      [{obj.box.x1}, {obj.box.y1}, {obj.box.x2}, {obj.box.y2}]
                    </td>
                    <td className="py-2 px-3 text-slate-400">
                      {obj.box.width} × {obj.box.height} px
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
