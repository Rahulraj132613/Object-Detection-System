"use client";

import React, { useState, useEffect, useCallback } from "react";
import AnalyticsCards from "@/components/AnalyticsCards";
import HistoryTable from "@/components/HistoryTable";
import { fetchAnalytics, fetchHistory, clearAllHistory } from "@/lib/api";
import { AnalyticsResponse, HistoryItem } from "@/lib/types";
import { BarChart3, RefreshCw, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [analyticsData, historyData] = await Promise.all([
        fetchAnalytics(),
        fetchHistory(50, 0),
      ]);
      setAnalytics(analyticsData);
      setHistory(historyData);
    } catch (err) {
      console.error("Failed to load analytics or history:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to clear all historical scan records from the database?")) return;
    setIsClearing(true);
    try {
      await clearAllHistory();
      loadData();
    } catch (err) {
      alert("Error clearing history: " + err);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back link */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium mb-1 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Detection Workbench</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-indigo-400" />
            <span>Analytics & Detection History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time SQLite audit trail of all previous scans, latency benchmarks, and object distributions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center space-x-1.5 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isClearing}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear All History</span>
            </button>
          )}
        </div>
      </div>

      {/* Aggregate Cards */}
      {analytics && <AnalyticsCards analytics={analytics} />}

      {/* History Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Recent Scans Record</h3>
        <HistoryTable history={history} onRefresh={loadData} />
      </div>
    </div>
  );
}
