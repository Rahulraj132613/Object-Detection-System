import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function VisionBrandIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7.5" y="7.5" width="9" height="9" rx="2.2" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function WorkbenchIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 10.5V8.5h2M14 8.5h2v2M16 13.5v2h-2M10 15.5H8v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function AnalyticsChartIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 19.5h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="5.5" y="12" width="3" height="5.5" rx="1" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="7" width="3" height="10.5" rx="1" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6" />
      <rect x="15.5" y="9.5" width="3" height="8" rx="1" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ModelChipIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.75" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="currentColor" />
      <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

export function UploadFrameIcon({ className = "h-7 w-7", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 14.5v3a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 15V4.5m0 0-3.75 3.75M12 4.5l3.75 3.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="7" y="16" width="10" height="2" rx="1" fill="currentColor" fillOpacity="0.22" />
    </svg>
  );
}

export function ImageFrameIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="8.75" cy="9.25" r="1.5" fill="currentColor" />
      <path d="m4.5 16.5 4.75-4.5a1.5 1.5 0 0 1 2.05-.03l2.2 2.03 1.75-1.65a1.5 1.5 0 0 1 2.08.02L19.8 14.8" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TuningSlidersIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 6.5h4M12 6.5h8M4 12h10M18 12h2M4 17.5h2M10 17.5h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="12" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="8" cy="17.5" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function FilterFunnelIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 5.5h16l-6.2 7.1v5.2l-3.6 1.7v-6.9L4 5.5Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

export function ScanTriggerIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 6.8v1.4M12 15.8v1.4M6.8 12h1.4M15.8 12h1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function OrbitalSpinnerIcon({ className = "h-5 w-5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeOpacity="0.22" strokeWidth="2.2" />
      <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SplitCompareIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 4v16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M8.5 8.5 5 12l3.5 3.5M15.5 8.5 19 12l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SideBySideIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="5" width="7" height="14" rx="1.6" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="5" width="7" height="14" rx="1.6" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function ExpandIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M15 4h5v5M9 20H4v-5M20 4l-6 6M4 20l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CollapseIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M14 10h6V4M10 14H4v6M20 4l-6 6M4 20l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RawViewIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function BBoxViewIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4.5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.65" strokeDasharray="3 2.5" />
      <rect x="7.5" y="8" width="9" height="8" rx="1.2" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function ObjectsGridIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4" width="6.8" height="6.8" rx="1.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.2" y="4" width="6.8" height="6.8" rx="1.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="13.2" width="6.8" height="6.8" rx="1.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.2" y="13.2" width="6.8" height="6.8" rx="1.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function CategoryTagIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 11.8V6a1.5 1.5 0 0 1 1.5-1.5h5.8a1.5 1.5 0 0 1 1.06.44l6.7 6.7a1.5 1.5 0 0 1 0 2.12l-5.8 5.8a1.5 1.5 0 0 1-2.12 0l-6.7-6.7a1.5 1.5 0 0 1-.44-1.06Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TargetReticleIcon({ className = "h-3 w-3", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

export function SearchLensIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="10.75" cy="10.75" r="6.25" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.5 15.5 4.25 4.25" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadImageIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="3.5" y="4.5" width="13" height="12" rx="2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.7" />
      <path d="m5 14 3.5-3.2 2.75 2.5" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 11.5v8m0 0-2.75-2.75M18 19.5l2.75-2.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExportCsvIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 9.5h16M4 14.5h16M10 9.5V20" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ExportJsonIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="3.5" width="16" height="17" rx="2.2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 8.5c-1 0-1.5.5-1.5 1.4v1c0 .7-.5 1.1-1.1 1.1.6 0 1.1.4 1.1 1.1v1c0 .9.5 1.4 1.5 1.4M14.5 8.5c1 0 1.5.5 1.5 1.4v1c0 .7.5 1.1 1.1 1.1-.6 0-1.1.4-1.1 1.1v1c0 .9-.5 1.4-1.5 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CheckBadgeIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.75" />
      <path d="m8.5 12.2 2.4 2.4 4.8-4.9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashActionIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 7h15M9.5 4h5a1 1 0 0 1 1 1v2h-7V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 7l.9 11.5a2 2 0 0 0 2 1.85h5.2a2 2 0 0 0 2-1.85L17.5 7" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 11v5.5M14 11v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function RefreshSyncIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M20 12a8 8 0 0 0-14.2-5M4 4.5v3.8h3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12a8 8 0 0 0 14.2 5M20 19.5v-3.8h-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackArrowIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M19 12H5.5m0 0 5.25-5.25M5.5 12l5.25 5.25" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ScanTotalIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7.5 12h9M9 8.5h6M9 15.5h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function LatencyGaugeIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4.5 15.5a8.5 8.5 0 1 1 15 0" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 14.5 16.2 9.8" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" />
      <path d="M7 18h10" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

export function FrequencyRankIcon({ className = "h-6 w-6", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="12.5" width="4" height="7" rx="1" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.65" />
      <rect x="10" y="5" width="4" height="14.5" rx="1" fill="currentColor" fillOpacity="0.26" stroke="currentColor" strokeWidth="1.65" />
      <rect x="16" y="9" width="4" height="10.5" rx="1" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.65" />
    </svg>
  );
}

export function HistoryClockIcon({ className = "h-8 w-8", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5v4.8l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarDateIcon({ className = "h-3.5 w-3.5", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.2" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 10h16M8.5 3.5v3.2M15.5 3.5v3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function AlertNoticeIcon({ className = "h-4 w-4", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M12 4 3.5 19h17L12 4Z" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M12 9.5v4.5" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function AwaitingCanvasIcon({ className = "h-7 w-7", ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.8" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2.5 2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
