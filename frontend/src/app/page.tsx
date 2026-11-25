"use client";

import React, { useState, useEffect } from "react";
import Dropzone from "@/components/Dropzone";
import ControlsPanel from "@/components/ControlsPanel";
import ImageComparator from "@/components/ImageComparator";
import DetectionResults from "@/components/DetectionResults";
import ExportButtons from "@/components/ExportButtons";
import { fetchSupportedClasses, detectObjects, getFullImageUrl } from "@/lib/api";
import { DetectionResponse, COCOClass } from "@/lib/types";
import { Sparkles, AlertCircle, RefreshCw, Layers } from "lucide-react";

export default function WorkbenchPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0.35);
  const [iouThreshold, setIouThreshold] = useState<number>(0.45);
  const [availableClasses, setAvailableClasses] = useState<COCOClass[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResponse | null>(null);

  // Load supported classes from backend on mount
  useEffect(() => {
    async function loadClasses() {
      const classes = await fetchSupportedClasses();
      setAvailableClasses(classes);
    }
    loadClasses();
  }, []);

  const handleImageSelected = (file: File, preview: string) => {
    setSelectedFile(file);
    setPreviewUrl(preview);
    setDetectionResult(null);
    setErrorMsg(null);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDetectionResult(null);
    setErrorMsg(null);
  };

  const handleRunDetection = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await detectObjects(selectedFile, confidence, iouThreshold, selectedClasses);
      setDetectionResult(res);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Inference failed. Check backend connection.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Title Banner */}
      <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-950 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pretrained Ultralytics YOLOv8 Nano • COCO 80 Categories</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            AI Object Detection & Recognition
          </h1>
          <p className="text-sm text-slate-400">
            High-performance deep learning vision pipeline. Upload any image to perform real-time bounding box
            localization, confidence scoring, category filtering, and automated report generation.
          </p>
        </div>
      </div>

      {/* Main Grid: Left Controls & Right Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Upload & Settings) - 5 cols */}
        <div className="lg:col-span-5 space-y-5">
          <Dropzone
            onImageSelected={handleImageSelected}
            selectedPreview={previewUrl}
            onClear={handleClearImage}
            disabled={isLoading}
          />

          <ControlsPanel
            confidence={confidence}
            setConfidence={setConfidence}
            iouThreshold={iouThreshold}
            setIouThreshold={setIouThreshold}
            availableClasses={availableClasses}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            onDetect={handleRunDetection}
            isLoading={isLoading}
            hasImage={!!selectedFile}
          />
        </div>

        {/* Right Column (Comparator & Results) - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-200">Detection Error</p>
                <p className="text-xs text-rose-300/90 mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="p-16 rounded-2xl border border-indigo-500/20 bg-slate-900/40 text-center flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-semibold text-slate-100">Analyzing Image with YOLOv8...</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  Detecting objects, drawing styled bounding boxes, and computing confidence percentages.
                </p>
              </div>
            </div>
          )}

          {!isLoading && detectionResult && previewUrl && (
            <div className="space-y-6">
              {/* Comparator */}
              <ImageComparator
                originalUrl={previewUrl}
                annotatedUrl={
                  detectionResult.annotated_image_base64 ||
                  getFullImageUrl(detectionResult.annotated_image_url)
                }
                filename={detectionResult.filename}
                inferenceTimeMs={detectionResult.inference_time_ms}
              />

              {/* Export Toolbar */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-slate-300">Export Results</span>
                <ExportButtons detection={detectionResult} />
              </div>

              {/* Metrics & Detailed Detections */}
              <DetectionResults
                objects={detectionResult.objects}
                classCounts={detectionResult.class_counts}
                totalObjects={detectionResult.total_objects}
                inferenceTimeMs={detectionResult.inference_time_ms}
              />
            </div>
          )}

          {!isLoading && !detectionResult && (
            <div className="p-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 text-center flex flex-col items-center justify-center space-y-3">
              <div className="h-14 w-14 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500">
                <Layers className="h-7 w-7" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300">Awaiting Image Input</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Select or drag-and-drop an image on the left, adjust your confidence parameters, and click &quot;Run Object Detection&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
