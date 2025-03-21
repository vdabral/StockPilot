import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header/Header";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext/ThemeContext"; // Use theme context

function About() {
  const { theme } = useTheme(); // Use theme context
  const [statistics, setStatistics] = useState({
    users: 0,
    marketsCovered: 0,
    yearsExperience: 0,
  });

  useEffect(() => {
    // Enhanced intersection observer with more animation options
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animationClass = entry.target.dataset.animation || "fade-in";
            entry.target.classList.add(`animate-${animationClass}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    // Counter animation for statistics
    const countUp = () => {
      setStatistics({
        users: Math.min(statistics.users + 123, 25000),
        marketsCovered: Math.min(statistics.marketsCovered + 3, 50),
        yearsExperience: Math.min(statistics.yearsExperience + 0.5, 7),
      });
    };

    const interval = setInterval(() => {
      if (
        statistics.users >= 25000 &&
        statistics.marketsCovered >= 50 &&
        statistics.yearsExperience >= 7
      ) {
        clearInterval(interval);
      } else {
        countUp();
      }
    }, 30);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [statistics]);

  const testimonials = [
    {
      text: "StockPilot transformed my approach to crypto investing. The real-time analytics and portfolio tracking tools are exceptional.",
      author: "Jamie Winters",
      position: "Retail Investor",
    },
    {
      text: "As a day trader, I need reliable data fast. StockPilot delivers with intuitive charts and powerful market insights.",
      author: "Devon Clark",
      position: "Day Trader",
    },
    {
      text: "The algorithmic signals have consistently helped me identify profitable opportunities I would have otherwise missed.",
      author: "Priya Sharma",
      position: "Investment Advisor",
    },
  ];

  return (
    <div
      className={`min-h-screen py-12 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section with Parallax Effect */}
        <div className="relative overflow-hidden mb-24 rounded-3xl">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 z-10"
            style={{ mixBlendMode: "multiply" }}
          ></div>
          <div
            className="absolute inset-0 bg-[url('/images/stock-market-bg.jpg')] bg-cover bg-center"
            style={{ transform: "translateZ(-10px) scale(1.15)" }}
          ></div>
          <div className="relative z-20 text-center py-20 px-6">
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-white scroll-animate"
              data-animation="slide-up"
            >
              About <span className="text-blue-200">StockPilot</span>
            </h1>
            <p
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 scroll-animate"
              data-animation="fade-in"
            >
              Empowering investors with cutting-edge technology and real-time
              market insights
            </p>
            <div className="inline-block">
              <button
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition duration-300 shadow-lg scroll-animate"
                data-animation="bounce"
              >
                <Link to="/login">Start Trading Today</Link>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 scroll-animate"
          data-animation="slide-up"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {statistics.users.toLocaleString()}+
            </span>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Active Users
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {statistics.marketsCovered}+
            </span>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Crypto Markets
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center hover:transform hover:scale-105 transition-all duration-300">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {statistics.yearsExperience}
            </span>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Years of Excellence
            </p>
          </div>
        </div>

        {/* Mission Section - Enhanced with better visual organization */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div
            className="space-y-6 scroll-animate"
            data-animation="slide-right"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At StockPilot, we're dedicated to democratizing cryptocurrency
              trading by providing professional-grade tools and insights to
              investors of all levels. Our platform combines advanced analytics
              with user-friendly interfaces to help you make informed decisions
              in the fast-paced crypto market.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We believe that everyone deserves access to sophisticated trading
              technology, not just institutional investors. By leveraging AI and
              machine learning, we provide real-time market analysis that was
              previously available only to professionals.
            </p>
            <div className="pt-4">
              <a
                href="/story"
                className="text-blue-600 dark:text-blue-400 font-bold flex items-center group"
              >
                Read our full story
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div
            className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl scroll-animate"
            data-animation="slide-left"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Core Values
            </h3>
            <ul className="space-y-4">
              {[
                {
                  title: "Innovation in Technology",
                  description:
                    "Constantly pushing boundaries to create cutting-edge trading tools",
                },
                {
                  title: "User-Centric Design",
                  description:
                    "Building intuitive interfaces that make complex data accessible",
                },
                {
                  title: "Market Transparency",
                  description:
                    "Providing clear, unbiased market insights and analysis",
                },
                {
                  title: "Data Security",
                  description:
                    "Protecting your information with enterprise-grade security",
                },
                {
                  title: "Continuous Improvement",
                  description:
                    "Evolving our platform based on user feedback and market changes",
                },
              ].map((value, index) => (
                <li
                  key={index}
                  className="flex p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">
                      {value.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {value.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Our Approach Section - New */}
        <div className="mb-24 scroll-animate" data-animation="fade-in">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Our Approach
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: "Data-Driven Analysis",
                description:
                  "Our algorithms process millions of data points to identify market trends and trading opportunities before they become obvious.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
                title: "Intelligent Insights",
                description:
                  "We combine technical analysis with AI to provide actionable insights that help you make better trading decisions.",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
                title: "Security First",
                description:
                  "We implement bank-level security protocols to ensure your data and assets are protected at all times.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section - New */}
        <div className="mb-24 scroll-animate" data-animation="fade-in">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="inline-block w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section - Enhanced */}
        <div className="mb-24">
          <h2
            className="text-3xl font-bold text-center mb-12 scroll-animate"
            data-animation="slide-up"
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                bio: "Former Wall Street analyst with 15+ years of experience in financial markets and trading technology.",
                social: {
                  linkedin: "#",
                  twitter: "#",
                },
              },
              {
                name: "Sarah Chen",
                role: "Head of Technology",
                image: "https://randomuser.me/api/portraits/women/2.jpg",
                bio: "AI specialist with a background in quantitative finance and machine learning algorithm development.",
                social: {
                  linkedin: "#",
                  twitter: "#",
                },
              },
              {
                name: "Michael Roberts",
                role: "Lead Developer",
                image: "https://randomuser.me/api/portraits/men/3.jpg",
                bio: "Full-stack developer specializing in financial applications and real-time data processing systems.",
                social: {
                  linkedin: "#",
                  twitter: "#",
                },
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-animate"
                data-animation={
                  index === 0
                    ? "slide-up"
                    : index === 1
                    ? "fade-in"
                    : "slide-up"
                }
              >
                <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600">
                  {/* Gradient top border */}
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mb-4 border-4 border-white dark:border-gray-700 shadow-md"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                      {member.bio}
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - New */}
        <div
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-12 text-center mb-12 scroll-animate"
          data-animation="fade-in"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of investors who are using StockPilot to gain an edge
            in cryptocurrency markets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition duration-300 shadow-lg">
              <Link to="/login">Login</Link>
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition duration-300">
              <Link to="/register">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
