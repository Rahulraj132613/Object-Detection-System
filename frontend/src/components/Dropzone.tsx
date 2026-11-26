"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  UploadFrameIcon,
  ImageFrameIcon,
  CloseIcon,
  AlertNoticeIcon,
  OrbitalSpinnerIcon,
} from "@/components/Icons";

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
  const [loadingSampleName, setLoadingSampleName] = useState<string | null>(null);
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
      setLoadingSampleName(name);
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
      setLoadingSampleName(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Zone */}
      {!selectedPreview ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`group relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 shadow-warm-sm active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 ${
            isDragOver
              ? "border-sage-500 bg-sage-50 scale-[1.01] shadow-sage-glow"
              : "border-brown-300 hover:border-sage-500 bg-cream-50/90 hover:bg-sage-50/45 hover:shadow-warm-md"
          } ${disabled ? "opacity-55 cursor-not-allowed" : ""}`}
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
            <div className="h-16 w-16 rounded-2xl bg-sage-100 border border-sage-200 flex items-center justify-center mb-4 text-sage-600 shadow-warm-sm group-hover:-translate-y-1 group-hover:bg-sage-600 group-hover:text-cream-50 group-hover:border-sage-600 transition-all duration-200">
              <UploadFrameIcon className="h-7 w-7" />
            </div>

            <h3 className="text-base font-bold text-brown-800 mb-1">
              Drag &amp; Drop your image here
            </h3>
            <p className="text-sm text-brown-600 mb-4">
              or{" "}
              <span className="inline-block px-2 py-0.5 rounded-md bg-sage-100 text-sage-700 font-semibold border border-sage-200 group-hover:bg-sage-600 group-hover:text-cream-50 transition-colors duration-200">
                browse files
              </span>{" "}
              from your device
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-brown-700 font-medium">
              <span className="px-2.5 py-0.5 rounded-md bg-cream-200/80 border border-brown-200">JPEG / JPG</span>
              <span className="px-2.5 py-0.5 rounded-md bg-cream-200/80 border border-brown-200">PNG</span>
              <span className="px-2.5 py-0.5 rounded-md bg-cream-200/80 border border-brown-200">WEBP</span>
              <span className="px-2.5 py-0.5 rounded-md bg-brown-100 border border-brown-200 text-brown-600">
                Up to 15MB
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl border border-brown-200/90 overflow-hidden bg-cream-50 shadow-warm-sm animate-fade-up">
          <div className="p-3 bg-cream-200/75 border-b border-brown-200 flex items-center justify-between text-xs">
            <span className="flex items-center space-x-2 font-semibold text-brown-800">
              <ImageFrameIcon className="h-4 w-4 text-sage-600" />
              <span>Input Image Loaded</span>
            </span>
            <button
              type="button"
              onClick={onClear}
              disabled={disabled}
              className="btn-kinetic group flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-600 border border-terracotta-200 font-semibold disabled:opacity-50"
            >
              <CloseIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90" />
              <span>Remove</span>
            </button>
          </div>
          <div className="flex items-center justify-center p-4 max-h-[360px] bg-brown-100/45">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPreview}
              alt="Uploaded Preview"
              className="max-h-[320px] max-w-full rounded-xl object-contain shadow-warm-md border border-brown-200/60"
            />
          </div>
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-terracotta-50 border border-terracotta-200 text-terracotta-600 text-sm flex items-center space-x-2 shadow-warm-sm animate-fade-up">
          <AlertNoticeIcon className="h-4 w-4 shrink-0 text-terracotta-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quick Sample Image Buttons */}
      {!selectedPreview && (
        <div className="pt-1">
          <p className="text-xs font-semibold text-brown-600 uppercase tracking-wider mb-2.5">
            Or test with a sample image:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SAMPLE_IMAGES.map((sample, idx) => {
              const isCurrentLoading = isFetchingSample && loadingSampleName === sample.name;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLoadSample(sample.url, sample.name)}
                  disabled={disabled || isFetchingSample}
                  className="btn-kinetic group flex flex-col justify-between text-left p-3 rounded-xl border border-brown-200 bg-cream-50 hover:bg-sage-50 hover:border-sage-400 shadow-warm-sm hover:shadow-warm-md text-xs disabled:opacity-60"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-brown-800 group-hover:text-sage-700 transition-colors">
                      {sample.name}
                    </span>
                    {isCurrentLoading ? (
                      <OrbitalSpinnerIcon className="h-3.5 w-3.5 text-sage-600 shrink-0" />
                    ) : (
                      <ImageFrameIcon className="h-3.5 w-3.5 text-brown-400 group-hover:text-sage-600 group-hover:scale-110 transition-all shrink-0" />
                    )}
                  </div>
                  <span className="text-brown-600 text-[11px] leading-snug">{sample.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
