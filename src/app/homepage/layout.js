import { useState, useEffect } from "react";
import { CgDarkMode } from "react-icons/cg";

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
          ? "bg-gradient-to-b from-black via-[#0a0a0a] to-black text-gray-100 min-h-screen flex flex-col"
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
      className={`flex justify-between items-center px-8 py-4 shadow-lg rounded-b-2xl sticky top-0 z-50 ${
        darkMode
          ? "bg-black/40 border-b border-white/10 backdrop-blur-lg"
          : "bg-white/80 border-b border-gray-200 backdrop-blur-md"
      }`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-extrabold tracking-wide cursor-default">
        Business Analyzer
      </h1>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6">
        {[
          { name: "Login", href: "/login" },
          { name: "Sign Up", href: "/signup" },
        ].map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`relative font-medium transition-colors rounded px-1.5 py-1 duration-300 ${
              darkMode
                ? "text-black bg-white hover:bg-white/70"
                : "text-white bg-black hover:bg-black/70"
            }`}
          >
            {link.name}
            {/* Underline animation */}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] w-0 transition-all duration-300 ${
                darkMode ? "bg-white" : "bg-gray-800"
              } group-hover:w-full`}
            ></span>
          </a>
        ))}
      </nav>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark/light theme"
        className={`ml-6 p-2 rounded-full focus:outline-none focus:ring transition-transform duration-300 hover:rotate-12 ${
          darkMode
            ? "bg-white text-gray-900 hover:bg-white/60"
            : "bg-black text-gray-50 hover:bg-black/60"
        }`}
      >
        {darkMode ? <CgDarkMode /> : <CgDarkMode />}
      </button>
    </header>
  );
}

function Footer({ darkMode }) {
  return (
    <footer
      className={`text-center p-6 mt-12 rounded-t-2xl shadow-inner ${
        darkMode
          ? "bg-black/40 text-gray-400 border-t border-white/10 backdrop-blur-lg"
          : "bg-gray-100 text-gray-700 border-t border-gray-200"
      }`}
    >
      <p>© 2025 Business Analyzer. All rights reserved.</p>
    </footer>
  );
}
