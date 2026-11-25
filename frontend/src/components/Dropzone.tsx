"use client";

import React, { useRef, useState, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from "lucide-react";

interface DropzoneProps {
  onImageSelected: (file: File, previewUrl: string) => void;
  selectedPreview: string | null;
  onClear: () => void;
  disabled?: boolean;
}

const SAMPLE_IMAGES = [
  {
    name: "Urban Traffic",
    desc: "Cars, pedestrians & bikes",
    url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Office Space",
    desc: "Laptops, chairs & people",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Kitchen & Dining",
    desc: "Bottles, cups & dining table",
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Dropzone({
  onImageSelected,
  selectedPreview,
  onClear,
  disabled = false,
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetchingSample, setIsFetchingSample] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setErrorMsg(null);
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please upload a valid JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg("Image size exceeds the 15MB limit.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onImageSelected(file, previewUrl);
  }, [onImageSelected]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleLoadSample = async (url: string, name: string) => {
    try {
      setIsFetchingSample(true);
      setErrorMsg(null);
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], `${name.toLowerCase().replace(/\s+/g, "_")}.jpg`, {
        type: "image/jpeg",
      });
      processFile(file);
    } catch {
      setErrorMsg("Failed to load sample image. Please upload a local image.");
    } finally {
      setIsFetchingSample(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Zone */}
      {!selectedPreview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
              : "border-slate-700/80 hover:border-slate-600 bg-slate-900/40 hover:bg-slate-900/60"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
          />

          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="h-8 w-8" />
            </div>

            <h3 className="text-base font-semibold text-slate-100 mb-1">
              Drag & Drop your image here
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              or <span className="text-indigo-400 font-medium underline">browse files</span> from your device
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">JPEG / JPG</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">PNG</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">WEBP</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Up to 15MB</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/60">
          <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center space-x-1.5 font-medium text-slate-300">
              <ImageIcon className="h-4 w-4 text-indigo-400" />
              <span>Input Image Loaded</span>
            </span>
            <button
              onClick={onClear}
              disabled={disabled}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>
          <div className="flex items-center justify-center p-4 max-h-[360px] bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPreview}
              alt="Uploaded Preview"
              className="max-h-[320px] max-w-full rounded-lg object-contain shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quick Sample Image Buttons */}
      {!selectedPreview && (
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Or test with a sample image:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_IMAGES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadSample(sample.url, sample.name)}
                disabled={disabled || isFetchingSample}
                className="flex flex-col text-left p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-indigo-500/40 transition-all text-xs group"
              >
                <span className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                  {sample.name}
                </span>
                <span className="text-slate-400 text-[11px] mt-0.5">{sample.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
