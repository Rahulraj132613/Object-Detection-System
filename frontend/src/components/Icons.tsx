import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/** Eye-in-frame — brand logo */
export function VisionBrandIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.65" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Grid of 4 dots — workbench/detection */
export function WorkbenchIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

/** Bar chart — analytics */
export function AnalyticsChartIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <path d="M6 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 20V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Upload arrow — dropzone */
export function UploadFrameIcon({ className = "h-7 w-7", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 15.5v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 15.5V4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7.5 9l4.5-4.5L16.5 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Photo frame — image loaded */
export function ImageFrameIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="8.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 17 9 13l3 2.5 2.5-2L19.5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** × close */
export function CloseIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Sliders — inference parameters */
export function TuningSlidersIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="9" cy="7" r="2" fill="currentColor" />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <circle cx="9" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}

/** Funnel — filter */
export function FilterFunnelIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M3.5 6h17l-6.5 7.5V19l-4-2v-3.5L3.5 6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

/** Crosshair — run detection */
export function ScanTriggerIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/** Spinner — loading */
export function OrbitalSpinnerIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.2" />
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Chevron down */
export function ChevronIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Two panels with center divider — split compare */
export function SplitCompareIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 4v16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M4 7h6M4 12h6M4 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 7h6M14 12h6M14 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Two rect panels — side by side */
export function SideBySideIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="5" width="7.5" height="14" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="5" width="7.5" height="14" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

/** Expand arrows */
export function ExpandIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M15 4h5v5M9 20H4v-5M20 4l-6 6M4 20l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Collapse arrows */
export function CollapseIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M14 10h6V4M10 14H4v6M20 4l-6 6M4 20l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Eye — raw view */
export function RawViewIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M2.5 12C4.5 7.5 8 5 12 5s7.5 2.5 9.5 7c-2 4.5-5.5 7-9.5 7s-7.5-2.5-9.5-7Z" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.65" />
    </svg>
  );
}

/** Dashed rect with inner box — bounding box */
export function BBoxViewIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" stroke="currentColor" strokeWidth="1.65" strokeDasharray="3 2.5" />
      <rect x="8" y="8" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/** 2×2 grid — objects grid */
export function ObjectsGridIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

/** Tag — category */
export function CategoryTagIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 11.5V6a1.5 1.5 0 0 1 1.5-1.5h5.5a1.5 1.5 0 0 1 1.06.44l6.5 6.5a1.5 1.5 0 0 1 0 2.12l-5.56 5.56a1.5 1.5 0 0 1-2.12 0l-6.5-6.5a1.5 1.5 0 0 1-.44-1.06Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

/** Target circle — detection reticle */
export function TargetReticleIcon({ className = "h-3 w-3", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Magnifying glass — search */
export function SearchLensIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.5 15.5 4.5 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/** Image with download arrow */
export function DownloadImageIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 16.5v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 4v12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M7.5 11.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Table with download — CSV */
export function ExportCsvIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 9.5h16M4 14.5h16M10 9.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Braces — JSON */
export function ExportJsonIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M9 5c-1.5 0-2 .75-2 1.75v2.5c0 .75-.5 1.25-1.5 1.25.75 0 1.5.5 1.5 1.25v2.5C7 15.25 7.5 16 9 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 5c1.5 0 2 .75 2 1.75v2.5c0 .75.5 1.25 1.5 1.25-.75 0-1.5.5-1.5 1.25v2.5C17 15.25 16.5 16 15 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** Check circle — success */
export function CheckBadgeIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="m8.5 12.2 2.4 2.4 4.8-4.9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Trash — delete */
export function TrashActionIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 7h15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9.5 4.5h5a1 1 0 0 1 1 1V7h-7V5.5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M6.5 7l.9 11.5a2 2 0 0 0 2 1.85h5.2a2 2 0 0 0 2-1.85L17.5 7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 11v5.5M14 11v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Refresh arrows */
export function RefreshSyncIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M20 12a8 8 0 0 0-14.2-5M4 4.5v3.8h3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12a8 8 0 0 0 14.2 5M20 19.5v-3.8h-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Left arrow — back */
export function BackArrowIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M19.5 12H5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <path d="M10.5 6.5L5 12l5.5 5.5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** List lines — total objects */
export function ScanTotalIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 17h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/** Gauge / speed — latency */
export function LatencyGaugeIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 15.5a8.5 8.5 0 1 1 15 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 14.5 16.5 9.5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Bar chart ascending — frequency */
export function FrequencyRankIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
      <path d="M6 20V14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 20V7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 20V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Clock — history */
export function HistoryClockIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Calendar — date */
export function CalendarDateIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="5.5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 10.5h16M8.5 3.5v3.5M15.5 3.5v3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** Triangle warning — error */
export function AlertNoticeIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 4 3.5 19.5h17L12 4Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 10v4.5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

/** Scan frame — awaiting canvas */
export function AwaitingCanvasIcon({ className = "h-7 w-7", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.65" strokeDasharray="2 1.8" />
    </svg>
  );
}
