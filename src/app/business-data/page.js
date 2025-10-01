// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import DataForm from "./DataForm";
// import UploadPanel from "./UploadPanel";

// export default function AddDataPage() {
//   const [mode, setMode] = useState("manual");
//   const [editMode, setEditMode] = useState(false);
//   const [existingData, setExistingData] = useState(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Check if we're in edit mode (via URL parameter ?edit=true)
//   useEffect(() => {
//     const isEdit = searchParams.get("edit") === "true";
//     if (isEdit) {
//       setEditMode(true);
//       // Fetch existing data
//       axios
//         .get("/api/dashboard/metrics")
//         .then((res) => setExistingData(res.data))
//         .catch((err) => console.error("Failed to load existing data:", err));
//     }
//   }, [searchParams]);

//   const handleDataSaved = () => {
//     setTimeout(() => {
//       router.push("/dashboard");
//     }, 1500);
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2">
//           {editMode ? "Update Your Business Data" : "Add Your Business Data"}
//         </h1>
//         <p className="text-gray-600">
//           {editMode
//             ? "Modify your existing financial data"
//             : "Enter your financial data manually or upload a JSON file"}
//         </p>
//       </div>

//       {/* Mode Selection - Hide upload in edit mode */}
//       <div className="flex justify-center mb-8">
//         <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
//           <button
//             onClick={() => setMode("manual")}
//             className={`px-6 py-2 rounded-md font-medium transition ${
//               mode === "manual"
//                 ? "bg-white dark:bg-gray-700 text-blue-600 shadow"
//                 : "text-gray-600 hover:text-gray-900"
//             }`}
//           >
//             {editMode ? "Edit Data" : "Manual Entry"}
//           </button>
//           {!editMode && (
//             <button
//               onClick={() => setMode("upload")}
//               className={`px-6 py-2 rounded-md font-medium transition ${
//                 mode === "upload"
//                   ? "bg-white dark:bg-gray-700 text-blue-600 shadow"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Upload File
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="mb-8">
//         {mode === "manual" ? (
//           <DataForm
//             onDataSaved={handleDataSaved}
//             editMode={editMode}
//             existingData={existingData}
//           />
//         ) : (
//           <UploadPanel onUploadSuccess={handleDataSaved} />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DataForm from "./DataForm";
import UploadPanel from "./UploadPanel";

export default function BusinessDataPage() {
  const [mode, setMode] = useState("manual");
  const [editMode, setEditMode] = useState(false);
  const [existingData, setExistingData] = useState(null);
  const router = useRouter();
  const params = useSearchParams();

  // Detect edit mode and load existing dashboard metrics
  useEffect(() => {
    if (params.get("edit") === "true") {
      setEditMode(true);
      // Fetch current dashboard metrics for pre-population
      fetch("/api/dashboard/metrics")
        .then((res) => res.json())
        .then((data) => setExistingData(data))
        .catch(() => console.error("Failed to load existing data"));
      // Force manual mode when editing
      setMode("manual");
    }
  }, [params]);

  const handleDataSaved = () => {
    // After save, redirect back to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        {editMode ? "Update Your Business Data" : "Add Your Business Data"}
      </h1>
      <p className="text-gray-600 mb-8">
        {editMode
          ? "Modify your existing financial data below"
          : "Enter your financial data manually or upload a JSON file"}
      </p>

      {/* Tabs: hide Upload when editing */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded ${
            mode === "manual"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {editMode ? "Edit Data" : "Manual Entry"}
        </button>

        {!editMode && (
          <button
            onClick={() => setMode("upload")}
            className={`px-4 py-2 rounded ${
              mode === "upload"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Upload File
          </button>
        )}
      </div>

      {/* Render DataForm only when (not editing) or existingData loaded */}
      {mode === "manual" && (!editMode || existingData) && (
        <DataForm
          onDataSaved={handleDataSaved}
          editMode={editMode}
          existingData={existingData}
        />
      )}

      {/* Only show upload option when not editing */}
      {mode === "upload" && !editMode && (
        <UploadPanel onUploadSuccess={handleDataSaved} />
      )}
    </div>
  );
}
