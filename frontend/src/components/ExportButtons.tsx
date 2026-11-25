"use client";

import React, { useState } from "react";
import { Download, FileSpreadsheet, FileJson, Image as ImageIcon, Check } from "lucide-react";
import { DetectionResponse } from "@/lib/types";
import { getExportCsvUrl, getExportJsonUrl } from "@/lib/api";

interface ExportButtonsProps {
  detection: DetectionResponse;
}

export default function ExportButtons({ detection }: ExportButtonsProps) {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const handleDownloadImage = () => {
    if (!detection.annotated_image_base64 && !detection.annotated_image_url) return;
    const link = document.createElement("a");
    link.href = detection.annotated_image_base64 || detection.annotated_image_url || "";
    link.download = `annotated_${detection.filename || "scan.jpg"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerSuccess("image");
  };

  const handleDownloadCsv = () => {
    if (detection.record_id) {
      window.open(getExportCsvUrl(detection.record_id), "_blank");
      triggerSuccess("csv");
    } else {
      // Fallback client-side CSV download
      let csv = "ID,Class,Confidence,X1,Y1,X2,Y2\n";
      detection.objects.forEach((o) => {
        csv += `${o.id},"${o.class_name}",${o.confidence_percent}%,${o.box.x1},${o.box.y1},${o.box.x2},${o.box.y2}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `detection_report_${detection.filename}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      triggerSuccess("csv");
    }
  };

  const handleDownloadJson = () => {
    if (detection.record_id) {
      window.open(getExportJsonUrl(detection.record_id), "_blank");
      triggerSuccess("json");
    } else {
      // Fallback client-side JSON download
      const jsonStr = JSON.stringify(detection, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `detection_report_${detection.filename}.json`;
      link.click();
      URL.revokeObjectURL(url);
      triggerSuccess("json");
    }
  };

  const triggerSuccess = (format: string) => {
    setDownloadedFormat(format);
    setTimeout(() => setDownloadedFormat(null), 2500);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {/* 1. Download Image */}
      <button
        type="button"
        onClick={handleDownloadImage}
        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-2 transition-all shadow-sm"
      >
        {downloadedFormat === "image" ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
        )}
        <span>{downloadedFormat === "image" ? "Saved!" : "Download Annotated Image"}</span>
      </button>

      {/* 2. Download CSV */}
      <button
        type="button"
        onClick={handleDownloadCsv}
        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-2 transition-all shadow-sm"
      >
        {downloadedFormat === "csv" ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
        )}
        <span>{downloadedFormat === "csv" ? "Saved CSV!" : "Export CSV Report"}</span>
      </button>

      {/* 3. Download JSON */}
      <button
        type="button"
        onClick={handleDownloadJson}
        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-2 transition-all shadow-sm"
      >
        {downloadedFormat === "json" ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" />
        ) : (
          <FileJson className="h-3.5 w-3.5 text-indigo-400" />
        )}
        <span>{downloadedFormat === "json" ? "Saved JSON!" : "Export JSON Report"}</span>
      </button>
    </div>
  );
}
