// utils/constants.js - Simplified for Assignment 2

// API endpoints
export const API_ENDPOINTS = {
  SCRAPE_BLOG: "/api/scrape-blog",
  BLOG_CONTENT: "/api/blog-content",
  BLOG_SUMMARY: "/api/blog-summary",
  TRANSLATE: "/api/translate",
};

// Database configuration
export const DATABASE_CONFIG = {
  MONGODB_COLLECTION: "blog_contents",
  SUPABASE_TABLE: "blog_summaries",
  CONNECTION_TIMEOUT: 10000,
  QUERY_TIMEOUT: 30000,
};

// App configuration
export const APP_CONFIG = {
  NAME: "Blog Summariser",
  DESCRIPTION: "AI-powered blog content summarization with Urdu translation",
  VERSION: "1.0.0",
  AUTHOR: "Nexium Intern",
  REPOSITORY:
    "https://github.com/ShahzebFaisal5649/Nexium_Shahzeb_Faisal_Assign1",
};

// Text processing constants
export const TEXT_LIMITS = {
  MAX_SUMMARY_LENGTH: 200,
  MIN_SUMMARY_LENGTH: 50,
  MAX_KEYWORDS: 10,
  MIN_CONTENT_LENGTH: 100,
  MAX_CONTENT_LENGTH: 50000,
  WORDS_PER_MINUTE: 200,
  MAX_TITLE_LENGTH: 200,
  MIN_TITLE_LENGTH: 5,
};

// UI constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 10,
  MAX_TITLE_LENGTH: 100,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
};

// Error messages
export const ERROR_MESSAGES = {
  INVALID_URL: "Please enter a valid URL",
  SCRAPING_FAILED: "Failed to scrape blog content",
  CONTENT_TOO_SHORT: "Blog content is too short to summarize",
  CONTENT_TOO_LONG: "Blog content is too long to process",
  TRANSLATION_FAILED: "Failed to translate content",
  NETWORK_ERROR: "Network error. Please check your connection",
  SERVER_ERROR: "Server error. Please try again later",
  UNKNOWN_ERROR: "An unexpected error occurred",
};

// Success messages
export const SUCCESS_MESSAGES = {
  BLOG_SCRAPED: "Blog content scraped successfully",
  SUMMARY_SAVED: "Summary saved successfully",
  CONTENT_COPIED: "Content copied to clipboard",
  TRANSLATION_COMPLETE: "Translation completed successfully",
};

// Loading messages
export const LOADING_MESSAGES = {
  SCRAPING: "Scraping blog content...",
  PROCESSING: "Processing content...",
  SUMMARIZING: "Generating summary...",
  TRANSLATING: "Translating to Urdu...",
  SAVING: "Saving data...",
  LOADING: "Loading...",
};

// Regex patterns
export const REGEX_PATTERNS = {
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Supported languages
export const LANGUAGES = {
  ENGLISH: "en",
  URDU: "ur",
};
