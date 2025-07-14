import { TEXT_LIMITS, LANGUAGES } from "./constants";

/**
 * Format date to human readable string
 */
export function formatDate(date, options = {}) {
  if (!date) return "";

  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formatOptions = { ...defaultOptions, ...options };

  try {
    return new Date(date).toLocaleDateString("en-US", formatOptions);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "";
  }
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date) {
  if (!date) return "";

  try {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2419200)
      return `${Math.floor(diffInSeconds / 604800)} weeks ago`;

    return formatDate(date, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Relative time formatting error:", error);
    return formatDate(date);
  }
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 100, ellipsis = "...") {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + ellipsis;
}

/**
 * Truncate text by word count
 */
export function truncateWords(text, maxWords = 20, ellipsis = "...") {
  if (!text || typeof text !== "string") return "";

  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;

  return words.slice(0, maxWords).join(" ") + ellipsis;
}

/**
 * Format word count with proper pluralization
 */
export function formatWordCount(count) {
  if (typeof count !== "number" || isNaN(count)) return "0 words";

  if (count === 1) return "1 word";
  if (count < 1000) return `${count} words`;
  if (count < 1000000) return `${(count / 1000).toFixed(1)}k words`;

  return `${(count / 1000000).toFixed(1)}M words`;
}

/**
 * Format reading time
 */
export function formatReadingTime(
  wordCount,
  wordsPerMinute = TEXT_LIMITS.WORDS_PER_MINUTE
) {
  if (typeof wordCount !== "number" || wordCount <= 0) return "0 min read";

  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (minutes === 1) return "1 min read";
  if (minutes < 60) return `${minutes} min read`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return hours === 1 ? "1 hour read" : `${hours} hours read`;
  }

  return `${hours}h ${remainingMinutes}m read`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (typeof bytes !== "number" || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, unitIndex);

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format percentage
 */
export function formatPercentage(value, total, decimals = 1) {
  if (typeof value !== "number" || typeof total !== "number" || total === 0) {
    return "0%";
  }

  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Format number with thousands separator
 */
export function formatNumber(number, locale = "en-US") {
  if (typeof number !== "number" || isNaN(number)) return "0";

  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    console.error("Number formatting error:", error);
    return number.toString();
  }
}

/**
 * Format currency
 */
export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  if (typeof amount !== "number" || isNaN(amount)) return "$0.00";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    return `${amount.toFixed(2)}`;
  }
}

/**
 * Create URL slug from text
 */
export function slugify(text) {
  if (!text || typeof text !== "string") return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text) {
  if (!text || typeof text !== "string") return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Capitalize first letter only
 */
export function capitalizeFirst(text) {
  if (!text || typeof text !== "string") return "";

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Extract domain from URL
 */
export function extractDomain(url) {
  if (!url || typeof url !== "string") return "";

  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, "");
  } catch (error) {
    console.error("Domain extraction error:", error);
    return "";
  }
}

/**
 * Format URL for display
 */
export function formatUrl(url, maxLength = 50) {
  if (!url || typeof url !== "string") return "";

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace(/^www\./, "");
    const path = urlObj.pathname + urlObj.search;

    if (path === "/") {
      return domain;
    }

    const fullUrl = domain + path;
    return truncateText(fullUrl, maxLength);
  } catch (error) {
    console.error("URL formatting error:", error);
    return truncateText(url, maxLength);
  }
}

/**
 * Format text for different languages
 */
export function formatTextByLanguage(text, language = LANGUAGES.ENGLISH) {
  if (!text || typeof text !== "string") return "";

  switch (language) {
    case LANGUAGES.URDU:
      return text.trim();
    case LANGUAGES.ENGLISH:
    default:
      return text.trim();
  }
}

/**
 * Format array as comma-separated list
 */
export function formatList(items, conjunction = "and", maxItems = 3) {
  if (!Array.isArray(items) || items.length === 0) return "";

  const filteredItems = items.filter((item) => item != null && item !== "");

  if (filteredItems.length === 0) return "";
  if (filteredItems.length === 1) return filteredItems[0].toString();

  if (filteredItems.length > maxItems) {
    const visibleItems = filteredItems.slice(0, maxItems);
    const remaining = filteredItems.length - maxItems;
    return `${visibleItems.join(", ")} and ${remaining} more`;
  }

  if (filteredItems.length === 2) {
    return `${filteredItems[0]} ${conjunction} ${filteredItems[1]}`;
  }

  const lastItem = filteredItems.pop();
  return `${filteredItems.join(", ")}, ${conjunction} ${lastItem}`;
}

/**
 * Format duration in seconds to human readable format
 */
export function formatDuration(seconds) {
  if (typeof seconds !== "number" || seconds < 0) return "0s";

  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  if (remainingSeconds === 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error) {
  if (!error) return "An unknown error occurred";

  if (typeof error === "string") return error;

  if (error.message) return error.message;

  if (error.toString && typeof error.toString === "function") {
    return error.toString();
  }

  return "An unknown error occurred";
}

/**
 * Format validation errors
 */
export function formatValidationErrors(errors) {
  if (!errors || !Array.isArray(errors)) return "";

  if (errors.length === 1) return errors[0];

  return errors.map((error, index) => `${index + 1}. ${error}`).join("\n");
}

/**
 * Format metadata for display
 */
export function formatMetadata(metadata) {
  if (!metadata || typeof metadata !== "object") return {};

  const formatted = {};

  Object.entries(metadata).forEach(([key, value]) => {
    if (value != null && value !== "") {
      formatted[titleCase(key.replace(/[_-]/g, " "))] = value;
    }
  });

  return formatted;
}

/**
 * Format statistics for display
 */
export function formatStatistics(stats) {
  if (!stats || typeof stats !== "object") return {};

  return {
    "Word Count": formatWordCount(stats.wordCount),
    "Reading Time": formatReadingTime(stats.wordCount),
    "Character Count": formatNumber(stats.characterCount),
    "Paragraph Count": formatNumber(stats.paragraphCount),
    "Sentence Count": formatNumber(stats.sentenceCount),
  };
}
