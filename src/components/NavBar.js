import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Business Analyzer</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/upload" className="hover:underline">
          Upload
        </Link>
        <Link href="/reports" className="hover:underline">
          Reports
        </Link>
      </div>
    </nav>
  );
}
