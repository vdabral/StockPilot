import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../contexts/authContext/AuthContext"; // Ensure correct path
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase"; // Ensure correct path
import logowhite from "../../../assets/1742362550197kxjowa5c/trans_bg.png";
import logobg from "../../../assets/1742362550197kxjowa5c/original.png";
import { useTheme } from "../../../contexts/themeContext/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth(); // Get user state from AuthContext

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: "Watch List", path: "/watchlist" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <>
      <div className="h-16" />
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled ? "shadow-lg backdrop-blur-lg" : ""}
          ${
            theme === "dark"
              ? "bg-gray-900/95 border-gray-800"
              : "bg-white/95 border-gray-200"
          }
          border-b
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.img
                src={theme === "dark" ? logobg : logowhite}
                alt="StockPilot Logo"
                className="h-10 w-auto"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.h1
                className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500"
                whileHover={{ scale: 1.05 }}
              >
                StockPilot
              </motion.h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(({ name, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={name}
                    to={path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                      ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-gray-900"
                      }
                      ${isActive ? "bg-blue-500/10" : "hover:bg-gray-100/50"}
                    `}
                  >
                    {name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-full
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-yellow-300"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                >
                  {theme === "dark" ? (
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  )}
                </motion.svg>
              </motion.button>

              {/* Login/Logout Button */}
              {user ? (
                <motion.button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg font-medium transition-all duration-300 bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/">Logout</Link>
                </motion.button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                  >
                    Login
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
