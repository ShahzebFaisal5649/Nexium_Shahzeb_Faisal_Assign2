// lib/utils.js

/**
 * Utility function to merge and conditionally apply CSS classes
 * Alternative to clsx + tailwind-merge without external dependencies
 */
export function cn(...classes) {
  // Filter out falsy values and join classes
  const classString = classes.filter(Boolean).join(" ").trim();

  // Basic deduplication for common Tailwind patterns
  const classArray = classString.split(" ").filter(Boolean);
  const uniqueClasses = new Set();
  const conflictMap = new Map();

  // Define conflicting class prefixes
  const conflicts = {
    // Spacing
    "p-": ["p-", "px-", "py-", "pt-", "pr-", "pb-", "pl-"],
    "px-": ["p-", "px-", "pl-", "pr-"],
    "py-": ["p-", "py-", "pt-", "pb-"],
    "m-": ["m-", "mx-", "my-", "mt-", "mr-", "mb-", "ml-"],
    "mx-": ["m-", "mx-", "ml-", "mr-"],
    "my-": ["m-", "my-", "mt-", "mb-"],

    // Colors
    "bg-": ["bg-"],
    "text-": ["text-"],
    "border-": ["border-"],

    // Display
    block: [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "hidden",
    ],
    flex: [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "hidden",
    ],
    grid: [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "hidden",
    ],
    hidden: [
      "block",
      "inline",
      "inline-block",
      "flex",
      "inline-flex",
      "grid",
      "inline-grid",
      "hidden",
    ],

    // Position
    static: ["static", "fixed", "absolute", "relative", "sticky"],
    fixed: ["static", "fixed", "absolute", "relative", "sticky"],
    absolute: ["static", "fixed", "absolute", "relative", "sticky"],
    relative: ["static", "fixed", "absolute", "relative", "sticky"],
    sticky: ["static", "fixed", "absolute", "relative", "sticky"],
  };

  // Process classes to handle conflicts
  classArray.forEach((cls) => {
    let shouldAdd = true;

    // Check for conflicts
    for (const [key, conflictList] of Object.entries(conflicts)) {
      if (cls.startsWith(key) || conflictList.includes(cls)) {
        const conflictKey = cls.split("-")[0] + "-";
        if (conflictMap.has(conflictKey)) {
          // Remove the previous conflicting class
          uniqueClasses.delete(conflictMap.get(conflictKey));
        }
        conflictMap.set(conflictKey, cls);
        break;
      }
    }

    if (shouldAdd) {
      uniqueClasses.add(cls);
    }
  });

  return Array.from(uniqueClasses).join(" ");
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Format duration in human readable format
 */
export function formatDuration(seconds) {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return remainingSeconds > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${minutes}m`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
}

/**
 * Format numbers with appropriate suffixes (K, M, B)
 */
export function formatNumber(num) {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + "K";
  if (num < 1000000000) return (num / 1000000).toFixed(1) + "M";
  return (num / 1000000000).toFixed(1) + "B";
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generate random ID
 */
export function generateId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error("Failed to copy text: ", error);
    return false;
  }
}

/**
 * Download file from text content
 */
export function downloadFile(content, filename, contentType = "text/plain") {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Validate URL format
 */
export function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

/**
 * Extract domain from URL
 */
export function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (_) {
    return "";
  }
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Remove HTML tags from string
 */
export function stripHtml(html) {
  if (typeof window === "undefined") {
    // Server-side fallback
    return html.replace(/<[^>]*>/g, "");
  }

  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

/**
 * Create a delay/sleep function
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Local storage utilities with error handling
 */
export const storage = {
  get(key, defaultValue = null) {
    try {
      if (typeof window === "undefined") return defaultValue;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      if (typeof window === "undefined") return false;
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
      return false;
    }
  },

  remove(key) {
    try {
      if (typeof window === "undefined") return false;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(
        `Error removing from localStorage for key "${key}":`,
        error
      );
      return false;
    }
  },

  clear() {
    try {
      if (typeof window === "undefined") return false;
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },
};

/**
 * Color utilities
 */
export const colors = {
  // Convert hex to RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },

  // Generate random color
  random() {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  },

  // Check if color is light or dark
  isLight(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return false;
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
  },
};

/**
 * Animation utilities
 */
export const animations = {
  // Smooth scroll to element
  scrollTo(element, duration = 500) {
    const targetElement =
      typeof element === "string" ? document.querySelector(element) : element;

    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition =
      targetElement.getBoundingClientRect().top + startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(
        timeElapsed,
        startPosition,
        targetPosition - startPosition,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  },
};

/**
 * Device detection utilities
 */
export const device = {
  isMobile() {
    return typeof window !== "undefined" && window.innerWidth < 768;
  },

  isTablet() {
    return (
      typeof window !== "undefined" &&
      window.innerWidth >= 768 &&
      window.innerWidth < 1024
    );
  },

  isDesktop() {
    return typeof window !== "undefined" && window.innerWidth >= 1024;
  },

  isTouchDevice() {
    return typeof window !== "undefined" && "ontouchstart" in window;
  },
};

export default {
  cn,
  formatFileSize,
  formatDuration,
  formatNumber,
  formatRelativeTime,
  debounce,
  throttle,
  generateId,
  copyToClipboard,
  downloadFile,
  isValidUrl,
  extractDomain,
  capitalizeWords,
  truncateText,
  stripHtml,
  calculateReadingTime,
  sleep,
  storage,
  colors,
  animations,
  device,
};
