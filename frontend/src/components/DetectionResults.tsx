"use client";

import React, { useState } from "react";
import { DetectedObject } from "@/lib/types";
import {
  CategoryTagIcon,
  ObjectsGridIcon,
  SearchLensIcon,
  TargetReticleIcon,
} from "@/components/Icons";

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
        <div className="p-3.5 rounded-xl border border-brown-200/85 bg-cream-50/95 shadow-warm-sm flex flex-col">
          <span className="text-[11px] font-semibold text-brown-600">Total Objects</span>
          <span className="text-2xl font-bold text-brown-800 font-mono mt-1">{totalObjects}</span>
        </div>

        <div className="p-3.5 rounded-xl border border-sage-200 bg-sage-50/80 shadow-warm-sm flex flex-col">
          <span className="text-[11px] font-semibold text-sage-700">Unique Categories</span>
          <span className="text-2xl font-bold text-sage-600 font-mono mt-1">
            {Object.keys(classCounts).length}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-brown-200/85 bg-brown-50/90 shadow-warm-sm flex flex-col">
          <span className="text-[11px] font-semibold text-brown-600">Avg Confidence</span>
          <span className="text-2xl font-bold text-brown-700 font-mono mt-1">{avgConfidence}%</span>
        </div>

        <div className="p-3.5 rounded-xl border border-sage-200 bg-cream-50/95 shadow-warm-sm flex flex-col">
          <span className="text-[11px] font-semibold text-brown-600">Inference Latency</span>
          <span className="text-2xl font-bold text-sage-600 font-mono mt-1">
            {inferenceTimeMs.toFixed(1)} <span className="text-xs font-normal text-brown-500">ms</span>
          </span>
        </div>
      </div>

      {/* 2. Detected Class Chips */}
      <div className="p-4 rounded-2xl border border-brown-200/85 bg-cream-50/95 shadow-warm-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-brown-800 flex items-center space-x-1.5">
            <CategoryTagIcon className="h-3.5 w-3.5 text-sage-600" />
            <span>Class Breakdown</span>
          </span>
          {selectedClassFilter && (
            <button
              type="button"
              onClick={() => setSelectedClassFilter(null)}
              className="btn-kinetic px-2.5 py-1 rounded-lg bg-brown-100 hover:bg-brown-200/80 text-brown-700 border border-brown-200 text-xs font-semibold"
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
                className={`btn-kinetic px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border ${
                  isSelected
                    ? "bg-sage-600 text-cream-50 border-sage-600 shadow-sage-glow scale-[1.03]"
                    : "bg-cream-100 text-brown-800 hover:bg-sage-50 hover:text-sage-700 border-brown-200 hover:border-sage-300"
                }`}
              >
                <span className="capitalize">{className}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? "bg-cream-50/20 text-cream-50"
                      : "bg-brown-100 text-brown-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Itemized Bounding Boxes Table */}
      <div className="rounded-2xl border border-brown-200/90 bg-cream-50/95 overflow-hidden shadow-warm-sm">
        <div className="p-3.5 bg-cream-200/75 border-b border-brown-200 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-brown-800 flex items-center space-x-1.5">
            <ObjectsGridIcon className="h-4 w-4 text-sage-600" />
            <span>Itemized Detections ({filteredObjects.length})</span>
          </span>

          <div className="relative w-48">
            <SearchLensIcon className="h-3.5 w-3.5 text-brown-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg bg-cream-50 border border-brown-200 text-brown-800 placeholder-brown-400 focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500/40"
            />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {filteredObjects.length === 0 ? (
            <div className="p-8 text-center text-xs text-brown-500">
              No objects match the current filters.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100 text-brown-600 font-mono text-[11px] sticky top-0 border-b border-brown-200">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3">Bounding Box (X1, Y1, X2, Y2)</th>
                  <th className="py-2.5 px-3">Dimension</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brown-200/60 font-mono text-[11px]">
                {filteredObjects.map((obj) => (
                  <tr key={obj.id} className="hover:bg-sage-50/60 transition-colors">
                    <td className="py-2.5 px-3 text-brown-500 font-semibold">{obj.id}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-sans font-semibold capitalize bg-cream-100 text-brown-800 border border-brown-200">
                        <span
                          className="h-2 w-2 rounded-full ring-1 ring-brown-800/20 shrink-0"
                          style={{ backgroundColor: obj.color }}
                        />
                        <TargetReticleIcon className="h-3 w-3 text-sage-600" />
                        <span>{obj.class_name}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 rounded-full bg-brown-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sage-500 to-sage-600 rounded-full"
                            style={{ width: `${obj.confidence_percent}%` }}
                          />
                        </div>
                        <span className="text-brown-800 font-semibold">
                          {obj.confidence_percent.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-brown-600">
                      [{obj.box.x1}, {obj.box.y1}, {obj.box.x2}, {obj.box.y2}]
                    </td>
                    <td className="py-2.5 px-3 text-brown-600">
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
