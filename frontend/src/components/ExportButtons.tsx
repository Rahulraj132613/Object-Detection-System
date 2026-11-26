"use client";

import React, { useState } from "react";
import { DetectionResponse } from "@/lib/types";
import { getExportCsvUrl, getExportJsonUrl } from "@/lib/api";
import {
  DownloadImageIcon,
  ExportCsvIcon,
  ExportJsonIcon,
  CheckBadgeIcon,
} from "@/components/Icons";

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
        className={`btn-kinetic group px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-2 shadow-warm-sm ${
          downloadedFormat === "image"
            ? "bg-sage-600 text-cream-50 border-sage-600 shadow-sage-glow"
            : "bg-cream-100 hover:bg-sage-50 text-brown-800 border-brown-200 hover:border-sage-400"
        }`}
      >
        {downloadedFormat === "image" ? (
          <CheckBadgeIcon className="h-4 w-4 text-cream-50 scale-110 transition-transform" />
        ) : (
          <DownloadImageIcon className="h-4 w-4 text-sage-600 transition-transform duration-200 group-hover:translate-y-0.5" />
        )}
        <span>{downloadedFormat === "image" ? "Saved!" : "Download Annotated Image"}</span>
      </button>

      {/* 2. Download CSV */}
      <button
        type="button"
        onClick={handleDownloadCsv}
        className={`btn-kinetic group px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-2 shadow-warm-sm ${
          downloadedFormat === "csv"
            ? "bg-sage-600 text-cream-50 border-sage-600 shadow-sage-glow"
            : "bg-cream-100 hover:bg-sage-50 text-brown-800 border-brown-200 hover:border-sage-400"
        }`}
      >
        {downloadedFormat === "csv" ? (
          <CheckBadgeIcon className="h-4 w-4 text-cream-50 scale-110 transition-transform" />
        ) : (
          <ExportCsvIcon className="h-4 w-4 text-sage-600 transition-transform duration-200 group-hover:scale-110" />
        )}
        <span>{downloadedFormat === "csv" ? "Saved CSV!" : "Export CSV Report"}</span>
      </button>

      {/* 3. Download JSON */}
      <button
        type="button"
        onClick={handleDownloadJson}
        className={`btn-kinetic group px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-2 shadow-warm-sm ${
          downloadedFormat === "json"
            ? "bg-sage-600 text-cream-50 border-sage-600 shadow-sage-glow"
            : "bg-cream-100 hover:bg-brown-100 text-brown-800 border-brown-200 hover:border-brown-300"
        }`}
      >
        {downloadedFormat === "json" ? (
          <CheckBadgeIcon className="h-4 w-4 text-cream-50 scale-110 transition-transform" />
        ) : (
          <ExportJsonIcon className="h-4 w-4 text-brown-500 transition-transform duration-200 group-hover:scale-110" />
        )}
        <span>{downloadedFormat === "json" ? "Saved JSON!" : "Export JSON Report"}</span>
      </button>
    </div>
  );
}
