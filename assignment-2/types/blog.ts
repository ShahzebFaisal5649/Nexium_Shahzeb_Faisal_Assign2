// Blog Content Types
export interface BlogContent {
  _id: string;
  url: string;
  title: string;
  content: string;
  wordCount: number;
  extractedAt: Date;
  metadata: BlogMetadata;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BlogMetadata {
  domain: string;
  publishedDate?: Date;
  author?: string;
  tags?: string[];
  category?: string;
  language?: string;
  readingTime?: number;
}

// Scraped Blog Data
export interface ScrapedBlogData {
  url: string;
  title: string;
  content: string;
  author?: string;
  publishedDate?: Date;
  extractedAt: Date;
  metadata?: Partial<BlogMetadata>;
}

// Blog Processing Types
export interface BlogProcessingResult {
  title: string;
  summary: string;
  urduSummary: string;
  url: string;
  wordCount: number;
  extractedAt: Date;
  readingTime?: number;
  keywords?: string[];
}

// Text Processing Types
export interface TextStatistics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  averageWordsPerSentence: number;
  averageSentencesPerParagraph: number;
  readingTime: number;
}

export interface SummaryOptions {
  maxLength?: number;
  sentenceCount?: number;
  preserveFormatting?: boolean;
  includeKeywords?: boolean;
}

export interface TranslationOptions {
  targetLanguage: "ur" | "en";
  preserveFormatting?: boolean;
  fallbackToOriginal?: boolean;
}

// Blog Validation Types
export interface BlogValidationRules {
  minContentLength: number;
  maxContentLength: number;
  minTitleLength: number;
  maxTitleLength: number;
  allowedDomains?: string[];
  blockedDomains?: string[];
}

export interface BlogValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Search and Filter Types
export interface BlogSearchQuery {
  query?: string;
  title?: string;
  author?: string;
  domain?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minWordCount?: number;
  maxWordCount?: number;
  language?: string;
  tags?: string[];
}

export interface BlogSearchResult {
  blogs: BlogContent[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  facets?: BlogSearchFacets;
}

export interface BlogSearchFacets {
  domains: { domain: string; count: number }[];
  authors: { author: string; count: number }[];
  languages: { language: string; count: number }[];
  tags: { tag: string; count: number }[];
}

// Blog History Types
export interface BlogHistoryItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  urdu_summary: string;
  word_count: number;
  mongo_id: string;
  created_at: Date;
  updated_at: Date;
  domain?: string;
  author?: string;
  reading_time?: number;
}

export interface BlogHistoryFilter {
  dateRange?: {
    start: Date;
    end: Date;
  };
  domains?: string[];
  authors?: string[];
  minWordCount?: number;
  maxWordCount?: number;
}

// Export/Import Types
export interface BlogExport {
  format: "json" | "csv" | "pdf";
  includeContent: boolean;
  includeMetadata: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface BlogImport {
  source: "json" | "csv" | "rss" | "api";
  data: any;
  options: {
    skipDuplicates: boolean;
    updateExisting: boolean;
    validateContent: boolean;
  };
}

// Analytics Types
export interface BlogAnalytics {
  totalBlogs: number;
  totalWords: number;
  averageWordCount: number;
  mostFrequentDomains: { domain: string; count: number }[];
  mostActiveAuthors: { author: string; count: number }[];
  contentLengthDistribution: { range: string; count: number }[];
  languageDistribution: { language: string; count: number }[];
  processingTimeStats: {
    average: number;
    min: number;
    max: number;
    p95: number;
  };
}

// Error Types
export interface BlogError {
  type:
    | "SCRAPING_ERROR"
    | "PROCESSING_ERROR"
    | "VALIDATION_ERROR"
    | "STORAGE_ERROR";
  message: string;
  url?: string;
  details?: any;
  timestamp: Date;
}

// Webhook Types for Blog Events
export interface BlogWebhookEvent {
  event:
    | "blog.scraped"
    | "blog.processed"
    | "blog.summarized"
    | "blog.translated"
    | "blog.error";
  data: {
    blogId: string;
    url: string;
    title?: string;
    status: "success" | "error";
    error?: BlogError;
    metadata?: any;
  };
  timestamp: Date;
  version: string;
}
