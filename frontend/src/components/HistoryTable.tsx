"use client";

import React, { useState } from "react";
import { HistoryItem } from "@/lib/types";
import { getExportCsvUrl, getExportJsonUrl, deleteHistoryRecord } from "@/lib/api";
import {
  TrashActionIcon,
  ExportCsvIcon,
  ExportJsonIcon,
  HistoryClockIcon,
  CalendarDateIcon,
  OrbitalSpinnerIcon,
} from "@/components/Icons";

interface HistoryTableProps {
  history: HistoryItem[];
  onRefresh: () => void;
  onSelectScan?: (item: HistoryItem) => void;
}

export default function HistoryTable({ history, onRefresh, onSelectScan }: HistoryTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete scan #${id}?`)) return;
    setDeletingId(id);
    try {
      await deleteHistoryRecord(id);
      onRefresh();
    } catch (err) {
      alert("Failed to delete record: " + err);
    } finally {
      setDeletingId(null);
    }
  };

  if (history.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-brown-200/90 bg-cream-50/90 shadow-warm-sm">
        <div className="h-14 w-14 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-600 mx-auto mb-3 animate-float-gentle">
          <HistoryClockIcon className="h-7 w-7" />
        </div>
        <h4 className="text-base font-bold text-brown-800">No detection history yet</h4>
        <p className="text-xs text-brown-600 mt-1 max-w-sm mx-auto">
          Scanned images will automatically be saved here with detailed inference logs and reports.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brown-200/90 bg-cream-50/95 overflow-hidden shadow-warm-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-cream-200/80 text-brown-700 font-mono text-[11px] border-b border-brown-200">
            <tr>
              <th className="py-3 px-4">#ID</th>
              <th className="py-3 px-4">Date &amp; Time</th>
              <th className="py-3 px-4">Filename</th>
              <th className="py-3 px-4">Objects</th>
              <th className="py-3 px-4">Top Classes</th>
              <th className="py-3 px-4">Latency</th>
              <th className="py-3 px-4 text-right">Reports &amp; Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brown-200/60 font-mono text-[11px]">
            {history.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={item.id} className="hover:bg-sage-50/55 transition-colors">
                  <td className="py-3 px-4 text-brown-500 font-bold">#{item.id}</td>
                  <td className="py-3 px-4 text-brown-600 font-sans">
                    <span className="flex items-center space-x-1.5">
                      <CalendarDateIcon className="h-3.5 w-3.5 text-brown-400" />
                      <span>{formattedDate}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-brown-800 font-sans font-semibold truncate max-w-[160px]">
                    {item.filename}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-700 border border-sage-200 font-bold">
                      {item.total_objects}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {Object.entries(item.class_counts)
                        .slice(0, 3)
                        .map(([name, count]) => (
                          <span
                            key={name}
                            className="px-2 py-0.5 rounded-md bg-cream-200/90 text-brown-700 border border-brown-200/70 text-[10px] font-medium"
                          >
                            {name} ({count})
                          </span>
                        ))}
                      {Object.keys(item.class_counts).length > 3 && (
                        <span className="text-[10px] text-brown-500 self-center">
                          +{Object.keys(item.class_counts).length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sage-700 font-mono font-semibold">
                    {item.inference_time_ms.toFixed(1)} ms
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* CSV Export */}
                      <a
                        href={getExportCsvUrl(item.id)}
                        target="_blank"
                        rel="noreferrer"
                        title="Download CSV"
                        className="btn-kinetic group p-1.5 rounded-lg bg-sage-50 hover:bg-sage-600 text-sage-700 hover:text-cream-50 border border-sage-200 shadow-warm-sm"
                      >
                        <ExportCsvIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                      </a>

                      {/* JSON Export */}
                      <a
                        href={getExportJsonUrl(item.id)}
                        target="_blank"
                        rel="noreferrer"
                        title="Download JSON"
                        className="btn-kinetic group p-1.5 rounded-lg bg-brown-50 hover:bg-brown-600 text-brown-700 hover:text-cream-50 border border-brown-200 shadow-warm-sm"
                      >
                        <ExportJsonIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                      </a>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        title="Delete Record"
                        className="btn-kinetic group p-1.5 rounded-lg bg-terracotta-50 hover:bg-terracotta-500 text-terracotta-600 hover:text-cream-50 border border-terracotta-200 shadow-warm-sm disabled:opacity-60"
                      >
                        {deletingId === item.id ? (
                          <OrbitalSpinnerIcon className="h-3.5 w-3.5" />
                        ) : (
                          <TrashActionIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
