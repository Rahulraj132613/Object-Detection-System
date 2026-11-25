import { DetectionResponse, HistoryItem, AnalyticsResponse, COCOClass } from "./types";

const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";
};

export async function fetchSupportedClasses(): Promise<COCOClass[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/classes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load classes");
    const data = await res.json();
    return data.classes || [];
  } catch (error) {
    console.error("fetchSupportedClasses error:", error);
    return [];
  }
}

export async function detectObjects(
  file: File,
  confidence: number = 0.35,
  iouThreshold: number = 0.45,
  categories?: string[]
): Promise<DetectionResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const params = new URLSearchParams();
  params.append("confidence", confidence.toString());
  params.append("iou_threshold", iouThreshold.toString());
  if (categories && categories.length > 0) {
    params.append("categories", categories.join(","));
  }

  const url = `${getBaseUrl()}/api/detect?${params.toString()}`;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Detection failed with status: ${res.status}`);
  }

  return res.json();
}

export async function fetchHistory(limit: number = 50, offset: number = 0): Promise<HistoryItem[]> {
  const res = await fetch(`${getBaseUrl()}/api/history?limit=${limit}&offset=${offset}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

export async function deleteHistoryRecord(id: number): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/api/history/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function clearAllHistory(): Promise<boolean> {
  const res = await fetch(`${getBaseUrl()}/api/history`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function fetchAnalytics(): Promise<AnalyticsResponse> {
  const res = await fetch(`${getBaseUrl()}/api/analytics`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}

export function getExportCsvUrl(recordId: number): string {
  return `${getBaseUrl()}/api/export/csv/${recordId}`;
}

export function getExportJsonUrl(recordId: number): string {
  return `${getBaseUrl()}/api/export/json/${recordId}`;
}

export function getFullImageUrl(relativePath?: string): string {
  if (!relativePath) return "";
  if (relativePath.startsWith("data:") || relativePath.startsWith("http")) return relativePath;
  return `${getBaseUrl()}${relativePath.startsWith("/") ? "" : "/"}${relativePath}`;
}
