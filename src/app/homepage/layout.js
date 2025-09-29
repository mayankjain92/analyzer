import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <div
      className={
        darkMode
          ? "bg-[#393E46] text-gray-100 min-h-screen flex flex-col"
          : "bg-gray-50 text-gray-900 min-h-screen flex flex-col"
      }
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="flex-grow container mx-auto px-6 py-12">{children}</main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

function Header({ darkMode, toggleTheme }) {
  return (
    <header
      className={`flex justify-between items-center p-6 shadow-md ${
        darkMode ? "bg-[#222831]" : "bg-white"
      }`}
    >
      <h1 className="text-2xl font-bold tracking-wide">Business Analyzer</h1>
      <nav className="space-x-6">
        <a
          href="/"
          className="px-1 py-1 rounded bg-black/40 border-none shadow-xl backdrop-blur-md ring-1 ring-black/30  text-white text-md font-bold hover:bg-blue-950/90 transition cursor-default max-w-sm mx-2"
        >
          Home
        </a>
        <a
          href="/login"
          className="px-1 py-1 rounded bg-black/40 border-none shadow-xl backdrop-blur-md ring-1 ring-black/30  text-white text-md font-bold hover:bg-blue-950/90 transition cursor-default max-w-sm mx-2"
        >
          Login
        </a>
        <a
          href="/login"
          className="px-1 py-1 rounded bg-black/40 border-none shadow-xl backdrop-blur-md ring-1 ring-black/30  text-white text-md font-bold hover:bg-blue-950/90 transition cursor-default max-w-sm mx-2"
        >
          Sign Up
        </a>
      </nav>
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark/light theme"
        className={`ml-4 p-2 rounded-full focus:outline-none focus:ring ${
          darkMode
            ? "bg-yellow-300 text-gray-900 hover:bg-yellow-400"
            : "bg-yellow-500 text-gray-50 hover:bg-yellow-600"
        } transition`}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

function Footer({ darkMode }) {
  return (
    <footer
      className={`text-center p-6 mt-12 ${
        darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-700"
      }`}
    >
      <p>© 2025 Business Analyzer. All rights reserved.</p>
    </footer>
  );
}
