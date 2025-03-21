import React, { useState, useEffect } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [currentTime, setCurrentTime] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update the time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime =
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC";
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulated form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setFormStatus("success");
        console.log("Form submitted:", formData);

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setFormStatus(null);
        }, 3000);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const offices = [
    {
      city: "New York",
      address: "123 Trading Street, Financial District, NY 10004",
      email: "nyc@stockpilot.com",
      phone: "+1 (212) 555-6789",
      hours: "9:00 AM - 5:00 PM EST",
      map: "../assets/3d-rendering-business-meeting-working-room-office-building.jpg",
    },
    {
      city: "London",
      address: "45 Fintech Avenue, Canary Wharf, London E14 5HP",
      email: "london@stockpilot.com",
      phone: "+44 20 7946 0587",
      hours: "9:00 AM - 5:00 PM GMT",
      map: "../assets/modern-office-space-interior.jpg",
    },
  ];

  const faqItems = [
    {
      question: "How do I get started with StockPilot?",
      answer:
        "Getting started is easy! Simply create an account, complete your profile, and you'll be guided through our onboarding process. You can start with a free trial to explore our basic features.",
    },
    {
      question: "What cryptocurrencies do you support?",
      answer:
        "We support all major cryptocurrencies including Bitcoin, Ethereum, and over 50 other altcoins. Our platform continuously adds support for emerging tokens based on market demand and stability.",
    },
    {
      question: "Is my data secure with StockPilot?",
      answer:
        "Absolutely. We implement bank-level encryption, two-factor authentication, and regular security audits to ensure your data remains protected at all times.",
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      icon: "𝕏",
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600",
    },
    {
      name: "LinkedIn",
      icon: "🔗",
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600",
    },
    {
      name: "GitHub",
      icon: "📦",
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600",
    },
    {
      name: "Discord",
      icon: "💬",
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-20 pb-20">
      {/* Time Display with Pulse Animation */}
      <div className="text-center mb-8 relative">
        <div className="inline-block px-6 py-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md border border-blue-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0 animate-ping opacity-75"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-mono">
              {currentTime}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Animation */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-left"></div>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our platform or need support? We're here to
            help and would love to hear from you.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/80 dark:bg-gray-800/80 rounded-lg p-1 shadow-md">
            {["Contact Us", "Global Offices", "FAQ"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveSection(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Contact Form Section (Default View) */}
        <div className={activeSection ? "hidden" : "block"}>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ),
                      title: "Address",
                      content: "123 Trading Street, Crypto City, CC 12345",
                    },
                    {
                      icon: (
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                      title: "Email",
                      content: "support@stockpilot.com",
                    },
                    {
                      icon: (
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                      title: "Phone",
                      content: "+1 (555) 123-4567",
                    },
                    {
                      icon: (
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ),
                      title: "Business Hours",
                      content: "Monday - Friday, 9:00 AM - 5:00 PM ET",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  Connect With Us
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={`#${social.name.toLowerCase()}`}
                      className={`flex flex-col items-center p-4 rounded-lg ${social.color} transition-all duration-200 transform hover:-translate-y-1`}
                    >
                      <span className="text-2xl mb-2">{social.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Subscribe to our Newsletter
                  </h3>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow px-4 py-2 rounded-l-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 space-y-6"
              >
                <div className="flex items-center mb-6">
                  <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Send Us a Message
                  </h2>
                </div>

                {formStatus === "success" && (
                  <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6 flex items-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p className="text-green-700 dark:text-green-300">
                      Your message has been sent successfully!
                    </p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formErrors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formErrors.email
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formErrors.subject
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                    placeholder="How can we help you?"
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                      formErrors.message
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-600"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors`}
                    placeholder="Tell us how we can assist you..."
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="consent"
                    className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  } text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold flex justify-center items-center`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Global Offices Section (Tab View) */}
        <div
          className={activeSection === "Global Offices" ? "block" : "hidden"}
        >
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Our Global Offices
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={office.map}
                    alt={`${office.city} office map`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {office.city} Office
                    </h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.address}
                        </p>
                      </div>
                      <div className="flex">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.email}
                        </p>
                      </div>
                      <div className="flex">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.phone}
                        </p>
                      </div>
                      <div className="flex">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-gray-600 dark:text-gray-300">
                          {office.hours}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                        <span>Get Directions</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section (Tab View) */}
        <div className={activeSection === "FAQ" ? "block" : "hidden"}>
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                      <svg
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 ml-12">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Still Have Questions Block */}
            <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Can't find the answer you're looking for? Please chat with our
                friendly team.
              </p>
              <button
                onClick={() => setActiveSection("Contact Us")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <span>Contact Us</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
