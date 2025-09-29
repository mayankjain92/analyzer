"use client";
import { useState } from "react";
import NavBar from "@/components/ui/NavBar";
import { uploadFile } from "@/lib/utils";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadFile(formData);
      setMessage("File uploaded successfully");
    } catch (error) {
      setMessage("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
        <h1 className="text-2xl font-semibold mb-6">Upload Business Data</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <input
            type="file"
            onChange={onFileChange}
            accept=".csv,.xlsx,.json"
            className="block w-1/3 text-gray-700 border-1 border-zinc-800 hover:bg-yellow-100"
          />
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
        )}
      </main>
    </div>
  );
}
