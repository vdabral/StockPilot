import React from "react";
import { useTheme } from "../../../contexts/themeContext/ThemeContext";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme(); // Use theme context

  return (
    <footer
      className={`border-t ${
        theme === "dark"
          ? "bg-gray-900 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              StockPilot
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Advanced cryptocurrency tracking and analysis platform for modern
              investors.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: "github", href: "#", label: "GitHub" },
                { icon: "twitter", href: "#", label: "Twitter" },
                { icon: "linkedin", href: "#", label: "LinkedIn" },
                { icon: "discord", href: "#", label: "Discord" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-blue-400"
                      : "text-gray-400 hover:text-blue-600"
                  }`}
                  aria-label={social.label}
                >
                  {social.icon === "github" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )}
                  {social.icon === "discord" && (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "About", "Features", "Compare", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`transition-colors duration-200 ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                "Documentation",
                "API Reference",
                "Blog",
                "Support",
                "Terms",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-blue-400"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Stay Updated
            </h3>
            <form className="space-y-3">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-blue-400"
                      : "bg-gray-100 border-gray-200 text-gray-900 focus:ring-blue-500"
                  }`}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t py-6 ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © {currentYear} StockPilot. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className={`text-sm transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`text-sm transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`text-sm transition-colors duration-200 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
