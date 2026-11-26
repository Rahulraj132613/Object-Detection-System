"use client";

import React, { useState, useEffect } from "react";
import Dropzone from "@/components/Dropzone";
import ControlsPanel from "@/components/ControlsPanel";
import ImageComparator from "@/components/ImageComparator";
import DetectionResults from "@/components/DetectionResults";
import ExportButtons from "@/components/ExportButtons";
import { fetchSupportedClasses, detectObjects, getFullImageUrl } from "@/lib/api";
import { DetectionResponse, COCOClass } from "@/lib/types";
import {
  AlertNoticeIcon,
  OrbitalSpinnerIcon,
  AwaitingCanvasIcon,
} from "@/components/Icons";

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
    <div className="space-y-7">
      {/* Hero Title Banner */}
      <section className="relative rounded-3xl border border-brown-200/90 bg-gradient-to-br from-cream-50 via-brown-50 to-sage-50 p-6 md:p-8 overflow-hidden shadow-warm-md">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sage-200/45 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-24 -bottom-16 h-40 w-40 rounded-full bg-brown-200/40 blur-2xl"
        />
        <div className="relative z-10 max-w-3xl space-y-2.5">

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brown-800">
            AI Object Detection &amp; Recognition
          </h1>
          <p className="text-sm text-brown-600 leading-relaxed">
            High-performance deep learning vision pipeline. Upload any image to perform real-time bounding box
            localization, confidence scoring, category filtering, and automated report generation.
          </p>
        </div>
      </section>

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
            <div className="p-4 rounded-2xl bg-terracotta-50 border border-terracotta-200 text-terracotta-600 text-sm flex items-start space-x-3 shadow-warm-sm animate-fade-up">
              <AlertNoticeIcon className="h-5 w-5 text-terracotta-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-terracotta-600">Detection Error</p>
                <p className="text-xs text-terracotta-600/90 mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="p-14 rounded-2xl border border-sage-200 bg-cream-50/95 text-center flex flex-col items-center justify-center space-y-5 shadow-warm-md animate-fade-up">
              <div className="h-16 w-16 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-600 shadow-warm-sm">
                <OrbitalSpinnerIcon className="h-8 w-8" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-brown-800">Analyzing Image with YOLOv8...</h4>
                <p className="text-xs text-brown-600 max-w-sm">
                  Detecting objects, drawing styled bounding boxes, and computing confidence percentages.
                </p>
              </div>
              <div className="w-56 h-1.5 rounded-full bg-cream-200 overflow-hidden border border-brown-200/70">
                <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-sage-400 via-sage-600 to-brown-400 animate-scan-sweep" />
              </div>
            </div>
          )}

          {!isLoading && detectionResult && previewUrl && (
            <div className="space-y-6 animate-fade-up">
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
              <div className="p-4 rounded-2xl border border-brown-200/85 bg-cream-50/90 shadow-warm-sm flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-brown-700 uppercase tracking-wider">
                  Export Results
                </span>
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
            <div className="p-16 rounded-2xl border-2 border-dashed border-brown-300/80 bg-cream-50/70 text-center flex flex-col items-center justify-center space-y-3.5 shadow-warm-sm">
              <div className="h-14 w-14 rounded-2xl bg-sage-100/80 border border-sage-200 flex items-center justify-center text-sage-600 animate-float-gentle">
                <AwaitingCanvasIcon className="h-7 w-7" />
              </div>
              <h4 className="text-sm font-bold text-brown-800">Awaiting Image Input</h4>
              <p className="text-xs text-brown-600 max-w-sm leading-relaxed">
                Select or drag-and-drop an image on the left, adjust your confidence parameters, and click &quot;Run
                Object Detection&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
