"use client";

import React, { useState } from "react";
import { HistoryItem } from "@/lib/types";
import { getExportCsvUrl, getExportJsonUrl, deleteHistoryRecord } from "@/lib/api";
import { Trash2, FileSpreadsheet, FileJson, Clock, Calendar, CheckCircle } from "lucide-react";

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
      <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
        <Clock className="h-10 w-10 text-slate-600 mx-auto mb-3" />
        <h4 className="text-base font-semibold text-slate-300">No detection history yet</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Scanned images will automatically be saved here with detailed inference logs and reports.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">#ID</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Filename</th>
              <th className="py-3 px-4">Objects</th>
              <th className="py-3 px-4">Top Classes</th>
              <th className="py-3 px-4">Latency</th>
              <th className="py-3 px-4 text-right">Reports & Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
            {history.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-slate-500 font-bold">#{item.id}</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="h-3 w-3 text-slate-500" />
                      <span>{formattedDate}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-sans font-medium truncate max-w-[160px]">
                    {item.filename}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 font-bold">
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
                            className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]"
                          >
                            {name} ({count})
                          </span>
                        ))}
                      {Object.keys(item.class_counts).length > 3 && (
                        <span className="text-[10px] text-slate-500 self-center">
                          +{Object.keys(item.class_counts).length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-mono">
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
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors"
                      >
                        <FileSpreadsheet className="h-3.5 w-3.5" />
                      </a>

                      {/* JSON Export */}
                      <a
                        href={getExportJsonUrl(item.id)}
                        target="_blank"
                        rel="noreferrer"
                        title="Download JSON"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition-colors"
                      >
                        <FileJson className="h-3.5 w-3.5" />
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        title="Delete Record"
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
