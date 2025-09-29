import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
import axios from "axios";

// Set your backend base URL here
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const uploadFile = (formData) =>
  axios.post(`${API_BASE}/data/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getQuickInsight = (data) =>
  axios.post(`${API_BASE}/analysis/quick-insight`, { data });

export const getDeepAnalysis = (data) =>
  axios.post(`${API_BASE}/analysis/deep-analysis`, { data });

export const getDashboardMetrics = () =>
  axios.get(`${API_BASE}/dashboard/metrics`);
