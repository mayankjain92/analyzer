"use client";
import { useState } from "react";
import axios from "axios";

export default function DataForm({ onDataSaved }) {
  const [form, setForm] = useState({
    revenue: ["", "", "", "", "", ""],
    costs: ["", "", "", "", "", ""],
    kpis: {
      total_revenue: "",
      total_costs: "",
      profit_margin: "",
      growth_rate: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (type, idx, value) => {
    if (type === "revenue" || type === "costs") {
      setForm((f) => ({
        ...f,
        [type]: f[type].map((v, i) => (i === idx ? value : v)),
      }));
    } else {
      setForm((f) => ({ ...f, kpis: { ...f.kpis, [type]: value } }));
    }
    setSuccess(false);
    setError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (form.revenue.some((r) => !r) || form.costs.some((c) => !c)) {
        setError("Please fill in all revenue and cost fields.");
        setLoading(false);
        return;
      }

      // Format data for API
      const data = {
        revenue: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: form.revenue.map(Number),
        },
        costs: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: form.costs.map(Number),
        },
        kpis: {
          total_revenue: Number(form.kpis.total_revenue),
          total_costs: Number(form.kpis.total_costs),
          profit_margin: Number(form.kpis.profit_margin),
          growth_rate: Number(form.kpis.growth_rate),
        },
        last_updated: new Date().toISOString(),
      };

      // Send to API
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([JSON.stringify(data)], { type: "application/json" }),
        "data.json"
      );
      await axios.post("/api/data/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(true);
      setLoading(false);
      onDataSaved && onDataSaved();
    } catch (err) {
      setError("Failed to save data. Please check your input and try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-8 text-center">
        <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          Data Saved Successfully!
        </h3>
        <p className="text-green-700 dark:text-green-300 mb-4">
          Your business data has been processed and stored.
        </p>
        <p className="text-sm text-green-600 dark:text-green-400">
          Redirecting to dashboard...
        </p>
      </div>
    );
  }

  return (
    <form
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
      onSubmit={handleSubmit}
    >
      {/* Revenue Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Monthly Revenue
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {form.revenue.map((val, i) => (
            <div key={i}>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
              </label>
              <input
                type="number"
                required
                min={0}
                value={val}
                onChange={(e) => handleChange("revenue", i, e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Costs Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Monthly Costs
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {form.costs.map((val, i) => (
            <div key={i}>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
              </label>
              <input
                type="number"
                required
                min={0}
                value={val}
                onChange={(e) => handleChange("costs", i, e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* KPIs Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form.kpis).map(([key, val]) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">
                {key.replace("_", " ")}
              </label>
              <input
                type="number"
                required
                min={0}
                step="0.01"
                value={val}
                onChange={(e) => handleChange(key, null, e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
      >
        {loading ? "Saving Data..." : "Save Data & View Dashboard"}
      </button>
    </form>
  );
}
