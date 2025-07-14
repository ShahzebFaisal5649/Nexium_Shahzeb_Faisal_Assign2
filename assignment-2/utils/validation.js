// utils/validation.js - Updated without Prisma dependencies
import { REGEX_PATTERNS, ERROR_MESSAGES, TEXT_LIMITS } from "./constants";

/**
 * Validate URL format and accessibility
 */
export function validateUrl(url) {
  if (!url) {
    return { isValid: false, error: "URL is required" };
  }

  if (typeof url !== "string") {
    return { isValid: false, error: "URL must be a string" };
  }

  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return { isValid: false, error: "URL cannot be empty" };
  }

  try {
    const urlObj = new URL(trimmedUrl);

    // Check protocol
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return { isValid: false, error: "URL must use HTTP or HTTPS protocol" };
    }

    // Check for suspicious patterns
    if (urlObj.href.includes("javascript:") || urlObj.href.includes("data:")) {
      return { isValid: false, error: "Invalid URL format" };
    }
  } catch {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_URL };
  }

  if (!REGEX_PATTERNS.URL.test(trimmedUrl)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_URL };
  }

  return { isValid: true, error: null };
}

/**
 * Validate blog content
 */
export function validateContent(content) {
  if (!content) {
    return { isValid: false, error: "Content is required" };
  }

  if (typeof content !== "string") {
    return { isValid: false, error: "Content must be a string" };
  }

  const trimmedContent = content.trim();

  if (!trimmedContent) {
    return { isValid: false, error: "Content cannot be empty" };
  }

  if (trimmedContent.length < TEXT_LIMITS.MIN_CONTENT_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.CONTENT_TOO_SHORT };
  }

  if (trimmedContent.length > TEXT_LIMITS.MAX_CONTENT_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.CONTENT_TOO_LONG };
  }

  // Check for minimum word count
  const wordCount = trimmedContent.split(/\s+/).length;
  if (wordCount < 20) {
    return { isValid: false, error: "Content must contain at least 20 words" };
  }

  return { isValid: true, error: null };
}

/**
 * Validate blog title
 */
export function validateTitle(title) {
  if (!title) {
    return { isValid: false, error: "Title is required" };
  }

  if (typeof title !== "string") {
    return { isValid: false, error: "Title must be a string" };
  }

  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return { isValid: false, error: "Title cannot be empty" };
  }

  if (trimmedTitle.length < TEXT_LIMITS.MIN_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title must be at least ${TEXT_LIMITS.MIN_TITLE_LENGTH} characters`,
    };
  }

  if (trimmedTitle.length > TEXT_LIMITS.MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `Title cannot exceed ${TEXT_LIMITS.MAX_TITLE_LENGTH} characters`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validate summary text
 */
export function validateSummary(summary) {
  if (!summary) {
    return { isValid: false, error: "Summary is required" };
  }

  if (typeof summary !== "string") {
    return { isValid: false, error: "Summary must be a string" };
  }

  const trimmedSummary = summary.trim();

  if (!trimmedSummary) {
    return { isValid: false, error: "Summary cannot be empty" };
  }

  if (trimmedSummary.length < TEXT_LIMITS.MIN_SUMMARY_LENGTH) {
    return {
      isValid: false,
      error: `Summary must be at least ${TEXT_LIMITS.MIN_SUMMARY_LENGTH} characters`,
    };
  }

  if (trimmedSummary.length > TEXT_LIMITS.MAX_SUMMARY_LENGTH) {
    return {
      isValid: false,
      error: `Summary cannot exceed ${TEXT_LIMITS.MAX_SUMMARY_LENGTH} characters`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  if (typeof email !== "string") {
    return { isValid: false, error: "Email must be a string" };
  }

  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return { isValid: false, error: "Email cannot be empty" };
  }

  if (!REGEX_PATTERNS.EMAIL.test(trimmedEmail)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true, error: null };
}

/**
 * Validate blog summary data
 */
export function validateBlogSummary(data) {
  const errors = [];

  if (!data.url) errors.push("URL is required");
  if (!data.title) errors.push("Title is required");
  if (!data.summary) errors.push("Summary is required");
  if (!data.urdu_summary) errors.push("Urdu summary is required");
  if (typeof data.word_count !== "number")
    errors.push("Word count must be a number");

  // Validate URL format
  const urlValidation = validateUrl(data.url);
  if (!urlValidation.isValid) errors.push(urlValidation.error);

  // Validate title length
  const titleValidation = validateTitle(data.title);
  if (!titleValidation.isValid) errors.push(titleValidation.error);

  // Validate summary
  const summaryValidation = validateSummary(data.summary);
  if (!summaryValidation.isValid) errors.push(summaryValidation.error);

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize input to prevent XSS and injection attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return input;

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .replace(/data:/gi, "") // Remove data: protocol
    .replace(/vbscript:/gi, ""); // Remove vbscript: protocol
}

/**
 * Validate and sanitize form data
 */
export function validateFormData(data, rules) {
  const errors = {};
  const sanitized = {};
  const warnings = [];

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    // Sanitize input
    sanitized[field] = sanitizeInput(value);

    // Check if required
    if (
      rule.required &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      errors[field] = `${field} is required`;
      continue;
    }

    // Skip validation if field is not required and empty
    if (
      !rule.required &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      continue;
    }

    // Type validation
    if (rule.type && typeof value !== rule.type) {
      errors[field] = `${field} must be a ${rule.type}`;
      continue;
    }

    // Length validation
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
      continue;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} cannot exceed ${rule.maxLength} characters`;
      continue;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
      continue;
    }

    // Custom validation
    if (rule.validator) {
      const result = rule.validator(value);
      if (!result.isValid) {
        errors[field] = result.error;
        continue;
      }
    }

    // Add warnings for optional validations
    if (rule.warning && !rule.warning.test(value)) {
      warnings.push(
        `${field}: ${rule.warningMessage || "Consider reviewing this field"}`
      );
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
    warnings,
  };
}

/**
 * Comprehensive validation for blog data
 */
export function validateBlogData(data) {
  const validations = [
    validateUrl(data.url),
    validateTitle(data.title),
    validateContent(data.content),
  ];

  const errors = validations.filter((v) => !v.isValid).map((v) => v.error);

  // Additional business logic validations
  if (data.author && typeof data.author !== "string") {
    errors.push("Author must be a string");
  }

  if (data.publishedDate) {
    const date = new Date(data.publishedDate);
    if (isNaN(date.getTime())) {
      errors.push("Published date must be a valid date");
    }

    // Check if date is not in the future
    if (date > new Date()) {
      errors.push("Published date cannot be in the future");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      url: sanitizeInput(data.url),
      title: sanitizeInput(data.title),
      content: sanitizeInput(data.content),
      author: data.author ? sanitizeInput(data.author) : null,
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : null,
    },
  };
}
