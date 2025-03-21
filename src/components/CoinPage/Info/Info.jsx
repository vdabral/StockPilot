import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

function Info({ title, desc, lastUpdated, author }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use provided values or fallback to defaults
  const currentTime = lastUpdated || "2025-03-20 13:25:15";
  const currentUser = author || "vdabral";

  // Format timestamp for better readability
  const formattedTime = useMemo(() => {
    try {
      const date = new Date(currentTime);
      return date.toLocaleString();
    } catch (e) {
      return currentTime;
    }
  }, [currentTime]);

  // Memoize description formatting to avoid unnecessary calculations
  const formattedDescription = useMemo(() => {
    if (!desc) return ["No description available"];

    // Format description for display
    const text =
      isExpanded || desc.length < 300
        ? desc
        : desc.slice(0, 300).trim() + "...";

    // Split by <br/> tags and filter out empty paragraphs
    return text
      .split("<br/>")
      .filter((paragraph) => paragraph.trim().length > 0);
  }, [desc, isExpanded]);

  // Handle expand/collapse with proper accessibility
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    collapsed: { opacity: 1 },
    expanded: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Check if we should show the read more button
  const shouldShowReadMore = desc && desc.length >= 300;

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-timestamp={currentTime}
      data-user={currentUser}
      aria-labelledby={`title-${
        title?.replace(/\s+/g, "-").toLowerCase() || "info"
      }`}
    >
      {/* Title with gradient effect */}
      <h1
        id={`title-${title?.replace(/\s+/g, "-").toLowerCase() || "info"}`}
        className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
      >
        {title || "Information"}
      </h1>

      {/* Description container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isExpanded ? "expanded" : "collapsed"}
            variants={contentVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            exit="exit"
          >
            {/* Main text content */}
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-4">
                {formattedDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Gradient fade for collapsed state */}
            {!isExpanded && shouldShowReadMore && (
              <div
                className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-800/90 to-transparent"
                aria-hidden="true"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Read more/less button */}
        {shouldShowReadMore && (
          <motion.button
            className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group"
            onClick={toggleExpand}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={isExpanded}
            aria-controls="expandable-content"
          >
            <span>{isExpanded ? "Read Less" : "Read More"}</span>
            <motion.svg
              className="w-4 h-4"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        )}
      </div>

      {/* Metadata and action buttons */}
      <div className="mt-6 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400">
          <span title={currentTime}>Last updated: {formattedTime}</span>
          <span className="hidden sm:inline">•</span>
          <span>By: {currentUser}</span>
        </div>

        {/* Action buttons with accessibility improvements */}
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 rounded-full hover:bg-gray-700/30"
            aria-label="Share this information"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Share"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </motion.button>
          <motion.button
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 rounded-full hover:bg-gray-700/30"
            aria-label="Bookmark this information"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Bookmark"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Prop validation
Info.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  lastUpdated: PropTypes.string,
  author: PropTypes.string,
};

// Default props
Info.defaultProps = {
  title: "Information",
  desc: "",
  lastUpdated: null,
  author: null,
};

export default React.memo(Info);
