import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
import axios from "axios";

// Set your backend base URL here
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// JSON file parser - handles uploaded JSON files
export function parseUploadedFile(fileBuffer) {
  try {
    // Convert buffer to string and parse JSON
    const fileContent = fileBuffer.toString("utf-8");
    const jsonData = JSON.parse(fileContent);

    // Validate required structure
    if (!jsonData.revenue || !jsonData.costs || !jsonData.kpis) {
      throw new Error("Invalid JSON structure - missing required fields");
    }

    return {
      revenue: jsonData.revenue,
      costs: jsonData.costs,
      kpis: jsonData.kpis,
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw new Error(`Failed to parse JSON file: ${error.message}`);
  }
}

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
