"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-black/90 border-b border-white/10 backdrop-blur-lg p-4 sticky top-0 z-50 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Business Analyzer</h1>
      <div className="w-90 flex justify-between items-center ">
        <Link href="/dashboard" className="hover:underline">
          <div className="border-1 border-white text-white rounded py-0.5 px-2 ">
            Dashboard
          </div>
        </Link>
        <Link href="/upload" className="hover:underline">
          <div className="border-1 border-white text-white rounded py-0.5 px-2">
            Upload
          </div>
        </Link>
        <Link
          href="/business-data"
          className="text-gray-500 hover:text-gray-900"
        >
          <div className="border-1 border-white text-white rounded py-0.5 px-2 w-22">
            Add Data
          </div>
        </Link>
        <Link href="/reports" className="hover:underline">
          <div className="border-1 border-white text-white rounded py-0.5 px-2">
            Reports
          </div>
        </Link>
      </div>
    </nav>
  );
}
