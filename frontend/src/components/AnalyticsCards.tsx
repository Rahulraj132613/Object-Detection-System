"use client";

import React from "react";
import { Scan, Cpu, Layers, Award } from "lucide-react";
import { AnalyticsResponse } from "@/lib/types";

interface AnalyticsCardsProps {
  analytics: AnalyticsResponse;
}

export default function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  const topClass = analytics.top_classes[0]?.class_name || "None yet";
  const maxCount = analytics.top_classes[0]?.count || 1;

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Scan className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Scans Executed</span>
            <div className="text-2xl font-bold font-mono text-slate-100">{analytics.total_scans}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Objects Detected</span>
            <div className="text-2xl font-bold font-mono text-cyan-400">{analytics.total_objects_detected}</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Average Inference Speed</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">
              {analytics.average_inference_time_ms.toFixed(1)} <span className="text-xs font-normal text-slate-500">ms</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Most Frequent Object</span>
            <div className="text-2xl font-bold capitalize text-amber-300 truncate max-w-[140px]">{topClass}</div>
          </div>
        </div>
      </div>

      {/* Top Detected Categories Bar Graph */}
      {analytics.top_classes.length > 0 && (
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Most Detected Object Classes
          </h4>
          <div className="space-y-2.5">
            {analytics.top_classes.map((cls) => {
              const percent = Math.min(100, Math.round((cls.count / maxCount) * 100));
              return (
                <div key={cls.class_name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize font-medium text-slate-300">{cls.class_name}</span>
                    <span className="text-slate-400 font-mono">
                      {cls.count} <span className="text-[10px] text-slate-500">({percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
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
