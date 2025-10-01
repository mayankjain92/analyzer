// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function EditModal({
//   isOpen,
//   onClose,
//   currentData,
//   onDataUpdated,
// }) {
//   const [form, setForm] = useState({
//     revenue: ["", "", "", "", "", ""],
//     costs: ["", "", "", "", "", ""],
//     kpis: {
//       total_revenue: "",
//       total_costs: "",
//       profit_margin: "",
//       growth_rate: "",
//     },
//   });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (currentData) {
//       setForm({
//         revenue: currentData.revenue.values.map(String),
//         costs: currentData.costs.values.map(String),
//         kpis: {
//           total_revenue: String(currentData.kpis.total_revenue),
//           total_costs: String(currentData.kpis.total_costs),
//           profit_margin: String(currentData.kpis.profit_margin),
//           growth_rate: String(currentData.kpis.growth_rate),
//         },
//       });
//     }
//   }, [currentData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = {
//         revenue: {
//           labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//           values: form.revenue.map(Number),
//         },
//         costs: {
//           labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//           values: form.costs.map(Number),
//         },
//         kpis: {
//           total_revenue: Number(form.kpis.total_revenue),
//           total_costs: Number(form.kpis.total_costs),
//           profit_margin: Number(form.kpis.profit_margin),
//           growth_rate: Number(form.kpis.growth_rate),
//         },
//         last_updated: new Date().toISOString(),
//       };

//       const formData = new FormData();
//       formData.append(
//         "file",
//         new Blob([JSON.stringify(data)], { type: "application/json" }),
//         "data.json"
//       );
//       await axios.post("/api/data/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setLoading(false);
//       onDataUpdated();
//       onClose();
//     } catch (err) {
//       setLoading(false);
//       alert("Failed to update data");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-90vh overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Edit Business Data</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Compact form fields here - similar to DataForm but more condensed */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded"
//           >
//             {loading ? "Updating..." : "Update Data"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/app/dashboard/EditModal.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function EditModal({
  isOpen,
  onClose,
  currentData,
  onDataUpdated,
}) {
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

  // Pre-populate form when currentData changes
  useEffect(() => {
    if (currentData) {
      setForm({
        revenue: currentData.revenue.values.map(String),
        costs: currentData.costs.values.map(String),
        kpis: {
          total_revenue: String(currentData.kpis.total_revenue),
          total_costs: String(currentData.kpis.total_costs),
          profit_margin: String(currentData.kpis.profit_margin),
          growth_rate: String(currentData.kpis.growth_rate),
        },
      });
      setError("");
    }
  }, [currentData]);

  const handleChange = (section, idxOrKey, value) => {
    if (section === "revenue" || section === "costs") {
      setForm((f) => ({
        ...f,
        [section]: f[section].map((v, i) => (i === idxOrKey ? value : v)),
      }));
    } else {
      setForm((f) => ({
        ...f,
        kpis: { ...f.kpis, [idxOrKey]: value },
      }));
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (
      form.revenue.some((v) => v === "") ||
      form.costs.some((v) => v === "")
    ) {
      setError("All revenue and cost fields are required.");
      setLoading(false);
      return;
    }
    if (Object.values(form.kpis).some((v) => v === "")) {
      setError("All KPI fields are required.");
      setLoading(false);
      return;
    }

    try {
      const dataPayload = {
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

      const fd = new FormData();
      fd.append(
        "file",
        new Blob([JSON.stringify(dataPayload)], { type: "application/json" }),
        "data.json"
      );

      await axios.post("/api/data/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      onDataUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update data. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Business Data</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Revenue Inputs */}
          <div>
            <h3 className="font-semibold mb-2">Monthly Revenue</h3>
            <div className="grid grid-cols-3 gap-2">
              {form.revenue.map((val, idx) => (
                <input
                  key={idx}
                  type="number"
                  min={0}
                  value={val}
                  onChange={(e) => handleChange("revenue", idx, e.target.value)}
                  placeholder={["Jan", "Feb", "Mar", "Apr", "May", "Jun"][idx]}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
          </div>

          {/* Costs Inputs */}
          <div>
            <h3 className="font-semibold mb-2">Monthly Costs</h3>
            <div className="grid grid-cols-3 gap-2">
              {form.costs.map((val, idx) => (
                <input
                  key={idx}
                  type="number"
                  min={0}
                  value={val}
                  onChange={(e) => handleChange("costs", idx, e.target.value)}
                  placeholder={["Jan", "Feb", "Mar", "Apr", "May", "Jun"][idx]}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
          </div>

          {/* KPI Inputs */}
          <div>
            <h3 className="font-semibold mb-2">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(form.kpis).map(([key, val]) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-300">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={val}
                    onChange={(e) => handleChange("kpis", key, e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 transition"
            >
              {loading ? "Updating..." : "Update Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
