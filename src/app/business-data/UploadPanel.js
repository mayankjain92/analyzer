// "use client";
// import { useState } from "react";
// import axios from "axios";

// export default function UploadPanel({ onUploadSuccess }) {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const onFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setSuccess(false);
//     setError("");
//     setProgress(null);
//   };

//   const handleUpload = async () => {
//     setError("");
//     setSuccess(false);
//     setProgress("Uploading...");
//     if (!file) {
//       setError("Please select a JSON file.");
//       setProgress(null);
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       await axios.post("/api/data/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setProgress(null);
//       setSuccess(true);
//       onUploadSuccess && onUploadSuccess();
//     } catch (e) {
//       setProgress(null);
//       setError("File upload failed. Please check your file format.");
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
//       <label className="block mb-2">Upload Financial Data (JSON)</label>
//       <input
//         type="file"
//         accept=".json,application/json"
//         onChange={onFileChange}
//         className="mb-4"
//       />
//       {progress && <div className="text-blue-600 mb-2">{progress}</div>}
//       {error && <div className="text-red-600 mb-2">{error}</div>}
//       {success && (
//         <div className="text-green-600 mb-2">File uploaded successfully!</div>
//       )}
//       <button
//         type="button"
//         className="mt-2 px-4 py-2 rounded bg-blue-600 text-white"
//         onClick={handleUpload}
//       >
//         Upload File
//       </button>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadPanel({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a JSON file first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("/api/data/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      setSuccess(true);
      onUploadSuccess && onUploadSuccess();
    } catch (e) {
      setLoading(false);
      setError("Upload failed. Please check your file format and try again.");
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-8 text-center">
        <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
          ✓
        </div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
          File Uploaded Successfully!
        </h3>
        <p className="text-green-700 dark:text-green-300 mb-4">
          Your data file has been processed and stored.
        </p>
        <p className="text-sm text-green-600 dark:text-green-400">
          Redirecting to dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📄</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Upload Financial Data
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Select a JSON file containing your business data
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".json,application/json"
          onChange={onFileChange}
          className="mb-4 w-full"
        />

        {file && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Selected: {file.name}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          {loading ? "Uploading..." : "Upload & View Dashboard"}
        </button>
      </div>

      {/* JSON Format Help */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded text-sm">
        <h4 className="font-medium mb-2">Expected JSON Format:</h4>
        <pre className="text-xs text-gray-600 dark:text-gray-400">
          {`{
  "revenue": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "values": [12000, 15000, 18000, 20000, 22000, 30000]
  },
  "costs": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], 
    "values": [8000, 9000, 11000, 12000, 13000, 14000]
  },
  "kpis": {
    "total_revenue": 117000,
    "total_costs": 67000,
    "profit_margin": 42.7,
    "growth_rate": 18.3
  }
}`}
        </pre>
      </div>
    </div>
  );
}
