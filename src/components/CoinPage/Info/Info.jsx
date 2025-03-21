import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

function Info({ title, desc, lastUpdated, author, tags = [], category }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);
  const contentRef = useRef(null);

  // Use provided values or fallback to defaults
  const currentTime = lastUpdated || "2025-03-20 13:25:15";
  const currentUser = author || "vdabral";

  // Format timestamp for better readability
  const formattedTime = useMemo(() => {
    try {
      const date = new Date(currentTime);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Show relative time for recent updates
      if (diffDays < 1) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours < 1) {
          const diffMinutes = Math.floor(diffTime / (1000 * 60));
          return diffMinutes < 1 ? "Just now" : `${diffMinutes} minutes ago`;
        }
        return `${diffHours} hours ago`;
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      }

      // Fall back to full date for older updates
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
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

  // Handle bookmark toggle
  const toggleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  // Handle share functionality
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: title || "Information",
          text: desc || "Check out this information",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback to copy URL
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopyStatus("copied");
          setTimeout(() => setCopyStatus(null), 2000);
        })
        .catch(() => {
          setCopyStatus("failed");
          setTimeout(() => setCopyStatus(null), 2000);
        });
    }
  }, [title, desc]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      borderColor: "rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    collapsed: { opacity: 1 },
    expanded: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Check if we should show the read more button
  const shouldShowReadMore = desc && desc.length >= 300;

  // Scroll into view when expanded
  useEffect(() => {
    if (isExpanded && contentRef.current) {
      // Add small delay to allow animation to start
      setTimeout(() => {
        contentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [isExpanded]);

  return (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 transition-all duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      data-timestamp={currentTime}
      data-user={currentUser}
      data-category={category || "general"}
      aria-labelledby={`title-${
        title?.replace(/\s+/g, "-").toLowerCase() || "info"
      }`}
    >
      {/* Header with title and category badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1
          id={`title-${title?.replace(/\s+/g, "-").toLowerCase() || "info"}`}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {title || "Information"}
        </h1>

        {category && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-800/30 text-blue-300 border border-blue-700/50">
            {category}
          </span>
        )}
      </div>

      {/* Tags if available */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description container */}
      <div className="relative" ref={contentRef}>
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
            className="mt-4 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-full text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group"
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
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span title={currentTime}>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{currentUser}</span>
          </div>
        </div>

        {/* Action buttons with tooltip feedback */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <motion.button
              className={`p-2 transition-colors duration-300 rounded-full ${
                copyStatus
                  ? "bg-gray-700/70 text-blue-400"
                  : "text-gray-400 hover:text-blue-400 hover:bg-gray-700/30"
              }`}
              onClick={handleShare}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share this information"
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

            {/* Copy confirmation tooltip */}
            <AnimatePresence>
              {copyStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-gray-200 rounded shadow-lg whitespace-nowrap"
                >
                  {copyStatus === "copied"
                    ? "Copied to clipboard!"
                    : "Failed to copy"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            className={`p-2 transition-colors duration-300 rounded-full ${
              isBookmarked
                ? "text-yellow-400 bg-gray-700/70"
                : "text-gray-400 hover:text-blue-400 hover:bg-gray-700/30"
            }`}
            onClick={toggleBookmark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isBookmarked ? "Remove bookmark" : "Bookmark this information"
            }
            title={isBookmarked ? "Bookmarked" : "Bookmark"}
          >
            <svg
              className="w-5 h-5"
              fill={isBookmarked ? "currentColor" : "none"}
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
  tags: PropTypes.arrayOf(PropTypes.string),
  category: PropTypes.string,
};

// Default props
Info.defaultProps = {
  title: "Information",
  desc: "",
  lastUpdated: null,
  author: null,
  tags: [],
  category: null,
};

export default React.memo(Info);
