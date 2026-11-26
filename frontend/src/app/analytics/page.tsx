"use client";

import React, { useState, useEffect, useCallback } from "react";
import AnalyticsCards from "@/components/AnalyticsCards";
import HistoryTable from "@/components/HistoryTable";
import { fetchAnalytics, fetchHistory, clearAllHistory } from "@/lib/api";
import { AnalyticsResponse, HistoryItem } from "@/lib/types";
import {
  AnalyticsChartIcon,
  RefreshSyncIcon,
  TrashActionIcon,
  BackArrowIcon,
  OrbitalSpinnerIcon,
} from "@/components/Icons";
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brown-200/90 pb-5">
        <div>
          <Link
            href="/"
            className="btn-kinetic group inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cream-200/80 hover:bg-sage-100 text-brown-700 hover:text-sage-700 border border-brown-200 text-xs font-semibold mb-2.5"
          >
            <BackArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Detection Workbench</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-brown-800 flex items-center space-x-2.5">
            <span className="h-9 w-9 rounded-xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-600 shadow-warm-sm">
              <AnalyticsChartIcon className="h-5 w-5" />
            </span>
            <span>Analytics &amp; Detection History</span>
          </h1>
          <p className="text-xs text-brown-600 mt-1">
            Real-time SQLite audit trail of all previous scans, latency benchmarks, and object distributions.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={loadData}
            disabled={isLoading}
            className="btn-kinetic group px-3.5 py-2 rounded-xl bg-cream-50 hover:bg-sage-50 text-brown-800 border border-brown-200 hover:border-sage-400 shadow-warm-sm text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-60"
          >
            <RefreshSyncIcon
              className={`h-3.5 w-3.5 text-sage-600 transition-transform duration-300 ${
                isLoading ? "animate-spin" : "group-hover:rotate-180"
              }`}
            />
            <span>Refresh</span>
          </button>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              disabled={isClearing}
              className="btn-kinetic group px-3.5 py-2 rounded-xl bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-600 border border-terracotta-200 shadow-warm-sm text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-60"
            >
              <TrashActionIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110" />
              <span>Clear All History</span>
            </button>
          )}
        </div>
      </div>

      {/* Loading Indicator on Initial Fetch */}
      {isLoading && !analytics ? (
        <div className="p-14 rounded-2xl border border-brown-200 bg-cream-50/90 text-center flex flex-col items-center justify-center space-y-3 shadow-warm-sm">
          <div className="h-12 w-12 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-600">
            <OrbitalSpinnerIcon className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-brown-700">Loading analytics &amp; scan history...</p>
        </div>
      ) : (
        <>
          {/* Aggregate Cards */}
          {analytics && <AnalyticsCards analytics={analytics} />}

          {/* History Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-brown-800">Recent Scans Record</h3>
            <HistoryTable history={history} onRefresh={loadData} />
          </div>
        </>
      )}
    </div>
  );
}
