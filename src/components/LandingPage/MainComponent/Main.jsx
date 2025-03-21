import React, { useEffect, useState } from "react";
import iphone from "../../../assets/iphone.png";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/themeContext/ThemeContext"; // Use theme context

function Main() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme(); // Use theme context

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);

    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen pt-20 overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-gray-50 to-gray-100" // Lighter gradient
      }`}
    >
      <div className={`text-${theme === "dark" ? "gray-200" : "gray-800"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="container mx-auto">
            <div
              className={`flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 transition-all duration-1000 ease-out transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Text Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 m-0">
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-500 bg-clip-text text-transparent">
                      Track Crypto
                    </span>
                  </h1>
                  <h1 className="text-5xl lg:text-7xl font-extrabold">
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700 dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-500 bg-clip-text text-transparent">
                      Real Time
                    </span>
                  </h1>
                </div>

                <p
                  className={`text-${
                    theme === "dark" ? "gray-300" : "gray-600"
                  } text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed`}
                >
                  Stay ahead of the market with real-time cryptocurrency
                  tracking, comprehensive analytics, and intelligent insights
                  tailored for you.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                  <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 font-semibold">
                    <Link className="relative z-10" to="/login">
                      Get Started
                    </Link>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  </button>
                  <button className="group relative px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-xl overflow-hidden transition-all duration-300 font-semibold">
                    <Link className="relative z-10" to="/about">
                      Learn More
                    </Link>
                    <span className="absolute inset-0 bg-blue-600 dark:bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>

              {/* iPhone Image */}
              <div className="w-full lg:w-1/2 flex justify-center items-center lg:justify-end my-10 lg:my-20">
                <div className="relative group w-[280px] md:w-[320px] lg:w-[340px] max-w-full">
                  <div className="relative z-10 transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1">
                    <img
                      src={iphone}
                      alt="StockPilot App Interface"
                      className="w-full h-auto object-contain drop-shadow-2xl"
                      loading="lazy"
                    />
                    {/* Glow Effect */}
                    <div className="absolute -inset-2 bg-gradient-to-b from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10"></div>
                  </div>

                  {/* Animated particles */}
                  <div className="absolute top-1/4 -left-6 w-4 h-4 bg-blue-500 rounded-full opacity-70 animate-float-slow"></div>
                  <div className="absolute top-2/3 -right-8 w-6 h-6 bg-indigo-500 rounded-full opacity-60 animate-float-medium"></div>
                  <div className="absolute bottom-10 left-10 w-3 h-3 bg-purple-500 rounded-full opacity-70 animate-float-fast"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16 px-4 scroll-animate opacity-0 translate-y-8">
            {[
              { label: "Active Users", value: "10K+", icon: "👥" },
              { label: "Cryptocurrencies", value: "200+", icon: "🪙" },
              { label: "Market Updates", value: "24/7", icon: "⚡" },
              { label: "Trading Volume", value: "$1M+", icon: "💹" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 ${
                  theme === "dark"
                    ? "bg-gray-800/90 hover:bg-gray-700/90"
                    : "bg-white hover:bg-gray-50"
                } backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-2 transform group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </span>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div
                    className={`text-${
                      theme === "dark" ? "gray-300" : "gray-600"
                    } mt-2 text-lg`}
                  >
                    {stat.label}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 scroll-animate opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: "Real-Time Tracking",
                  description:
                    "Monitor cryptocurrency prices with millisecond precision and receive instant notifications on significant market movements.",
                  icon: "📊",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Advanced Analytics",
                  description:
                    "Access comprehensive market analysis with customizable dashboards, technical indicators, and predictive modeling tools.",
                  icon: "📈",
                  color: "from-indigo-500 to-purple-600",
                },
                {
                  title: "Secure Platform",
                  description:
                    "Rest easy with our enterprise-grade security featuring end-to-end encryption, biometric authentication, and secure cloud storage.",
                  icon: "🔒",
                  color: "from-green-500 to-emerald-600",
                },
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  {/* Card Container */}
                  <div
                    className="h-full p-6 sm:p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg 
                    border border-gray-200 dark:border-gray-700
                    transform hover:-translate-y-2 transition-all duration-500 ease-out"
                  >
                    {/* Icon Container */}
                    <div
                      className={`flex items-center justify-center w-16 h-16 mb-6 
                      rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-500
                      shadow-md relative overflow-hidden`}
                    >
                      {/* Icon */}
                      <span
                        className="text-3xl text-white relative z-10 transform 
                      group-hover:scale-110 transition-transform duration-300"
                      >
                        {feature.icon}
                      </span>

                      {/* Animated shine effect */}
                      <div className="absolute -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-white opacity-10 group-hover:animate-shine"></div>
                    </div>

                    {/* Content Container */}
                    <div className="space-y-3">
                      <h3
                        className="text-xl font-semibold 
                        text-gray-800 dark:text-gray-200 
                        group-hover:text-blue-600 dark:group-hover:text-blue-400 
                        transition-colors duration-300"
                      >
                        {feature.title}
                      </h3>

                      <p
                        className="text-base text-gray-600 dark:text-gray-300 
                        leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 
                        transition-colors duration-300"
                      >
                        {feature.description}
                      </p>

                      <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                        <span className="mr-2">Learn more</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom border gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                  </div>

                  {/* Background Glow Effect */}
                  <div
                    className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                    rounded-2xl opacity-0 group-hover:opacity-20 blur-lg 
                    transition-all duration-500 -z-10"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="py-12 sm:py-16 px-4 scroll-animate opacity-0 translate-y-8">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-xl opacity-70 -z-10"></div>
              <div className="bg-white/95 dark:bg-gray-800/95 p-8 md:p-10 rounded-2xl shadow-xl">
                <div className="text-5xl text-blue-500 dark:text-blue-400 mb-6">
                  ❝
                </div>
                <blockquote
                  className={`text-xl md:text-2xl font-medium text-${
                    theme === "dark" ? "gray-300" : "gray-700"
                  } mb-8`}
                >
                  StockPilot revolutionized how I monitor my crypto investments.
                  The real-time tracking and analysis tools have helped me make
                  smarter decisions and maximize my returns.
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl">
                    AK
                  </div>
                  <div>
                    <div
                      className={`font-bold text-${
                        theme === "dark" ? "gray-200" : "gray-800"
                      }`}
                    >
                      Alex Kim
                    </div>
                    <div
                      className={`text-${
                        theme === "dark" ? "gray-400" : "gray-600"
                      }`}
                    >
                      Crypto Investor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style>
          {`
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-15px) translateX(10px);
            }
          }
          @keyframes float-medium {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(-10px);
            }
          }
          @keyframes float-fast {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-12px) translateX(15px);
            }
          }
          @keyframes shine {
            100% {
              left: 125%;
            }
          }
          .animate-float-slow {
            animation: float-slow 7s ease-in-out infinite;
          }
          .animate-float-medium {
            animation: float-medium 5s ease-in-out infinite;
          }
          .animate-float-fast {
            animation: float-fast 4s ease-in-out infinite;
          }
          .animate-shine {
            animation: shine 1.5s;
          }
          .scroll-animate.animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
        `}
        </style>
      </div>
    </div>
  );
}

export default Main;
