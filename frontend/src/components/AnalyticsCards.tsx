"use client";

import React from "react";
import { AnalyticsResponse } from "@/lib/types";
import {
  ScanTotalIcon,
  ObjectsGridIcon,
  LatencyGaugeIcon,
  FrequencyRankIcon,
} from "@/components/Icons";

interface AnalyticsCardsProps {
  analytics: AnalyticsResponse;
}

export default function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  const topClass = analytics.top_classes[0]?.class_name || "None yet";
  const maxCount = analytics.top_classes[0]?.count || 1;

  return (
    <div className="space-y-6 animate-fade-up">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-brown-200/90 bg-cream-50/95 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-600 shrink-0">
            <ScanTotalIcon className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-brown-600 font-medium">Total Scans Executed</span>
            <div className="text-2xl font-bold font-mono text-brown-800">{analytics.total_scans}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-brown-200/90 bg-cream-50/95 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-brown-100 border border-brown-200 flex items-center justify-center text-brown-600 shrink-0">
            <ObjectsGridIcon className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-brown-600 font-medium">Total Objects Detected</span>
            <div className="text-2xl font-bold font-mono text-brown-700">
              {analytics.total_objects_detected}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-brown-200/90 bg-cream-50/95 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-700 shrink-0">
            <LatencyGaugeIcon className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-brown-600 font-medium">Average Inference Speed</span>
            <div className="text-2xl font-bold font-mono text-sage-600">
              {analytics.average_inference_time_ms.toFixed(1)}{" "}
              <span className="text-xs font-normal text-brown-500">ms</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-brown-200/90 bg-cream-50/95 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-brown-100 border border-brown-200 flex items-center justify-center text-brown-500 shrink-0">
            <FrequencyRankIcon className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-brown-600 font-medium">Most Frequent Object</span>
            <div className="text-2xl font-bold capitalize text-brown-800 truncate max-w-[140px]">
              {topClass}
            </div>
          </div>
        </div>
      </div>

      {/* Top Detected Categories Bar Graph */}
      {analytics.top_classes.length > 0 && (
        <div className="p-5 rounded-2xl border border-brown-200/90 bg-cream-50/95 shadow-warm-sm space-y-4">
          <h4 className="text-xs font-bold text-brown-700 uppercase tracking-wider">
            Most Detected Object Classes
          </h4>
          <div className="space-y-3">
            {analytics.top_classes.map((cls) => {
              const percent = Math.min(100, Math.round((cls.count / maxCount) * 100));
              return (
                <div key={cls.class_name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize font-semibold text-brown-800">{cls.class_name}</span>
                    <span className="text-brown-600 font-mono">
                      {cls.count} <span className="text-[10px] text-brown-500">({percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-cream-200 overflow-hidden border border-brown-200/60">
                    <div
                      className="h-full bg-gradient-to-r from-sage-600 via-sage-500 to-brown-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
