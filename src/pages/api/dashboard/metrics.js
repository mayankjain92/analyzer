import { getUploadedData } from "../data/store";

export default function handler(req, res) {
  const storedData = getUploadedData();

  if (storedData) {
    // Return the data that was stored by the upload endpoint
    res.status(200).json(storedData);
    return;
  }

  // Fallback to the original dummy data if no upload has occurred yet
  res.status(200).json({
    revenue: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      values: [12000, 15000, 18000, 20000, 22000, 30000],
    },
    costs: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      values: [8000, 9000, 11000, 12000, 13000, 14000],
    },
    kpis: {
      total_revenue: 117000,
      total_costs: 67000,
      profit_margin: 42.7,
      growth_rate: 18.3,
    },
    last_updated: new Date().toISOString(),
  });
}
