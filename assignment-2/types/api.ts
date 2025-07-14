// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Request Types
export interface ScrapeBlogRequest {
  url: string;
}

export interface TranslateRequest {
  text: string;
  targetLanguage?: "ur" | "en";
}

export interface BlogContentRequest {
  url: string;
  title: string;
  content: string;
  author?: string;
  publishedDate?: string;
}

export interface BlogSummaryRequest {
  url: string;
  title: string;
  summary: string;
  urdu_summary: string;
  word_count: number;
  mongo_id?: string;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Common Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

// API Endpoint Types
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  description: string;
}

// Response Status Codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

// Content Types
export enum ContentType {
  JSON = "application/json",
  FORM_DATA = "multipart/form-data",
  URL_ENCODED = "application/x-www-form-urlencoded",
  TEXT_PLAIN = "text/plain",
  TEXT_HTML = "text/html",
}

// Rate Limiting
export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Webhook Types
export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature: string;
}

// File Upload Types
export interface FileUpload {
  fieldName: string;
  originalName: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

// Cache Types
export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[];
  version?: string;
}

// Metadata Types
export interface RequestMetadata {
  userAgent?: string;
  ip?: string;
  referer?: string;
  timestamp: string;
  requestId: string;
}
