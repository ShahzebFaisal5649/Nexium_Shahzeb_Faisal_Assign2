// Summary Types for Supabase
export interface BlogSummary {
  id: string;
  url: string;
  title: string;
  summary: string;
  urdu_summary: string;
  word_count: number;
  mongo_id: string;
  created_at: string;
  updated_at: string;
  metadata?: SummaryMetadata;
}

export interface SummaryMetadata {
  domain: string;
  author?: string;
  published_date?: string;
  reading_time?: number;
  keywords?: string[];
  language: "en" | "ur" | "mixed";
  confidence_score?: number;
  processing_time?: number;
}

// Summary Creation Types
export interface CreateSummaryRequest {
  url: string;
  title: string;
  summary: string;
  urdu_summary: string;
  word_count: number;
  mongo_id: string;
  metadata?: Partial<SummaryMetadata>;
}

export interface UpdateSummaryRequest {
  title?: string;
  summary?: string;
  urdu_summary?: string;
  word_count?: number;
  metadata?: Partial<SummaryMetadata>;
}

// Summary Query Types
export interface SummaryQuery {
  url?: string;
  title?: string;
  domain?: string;
  author?: string;
  language?: "en" | "ur" | "mixed";
  dateFrom?: string;
  dateTo?: string;
  minWordCount?: number;
  maxWordCount?: number;
  search?: string;
}

export interface SummaryQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: keyof BlogSummary;
  sortOrder?: "asc" | "desc";
  includeMetadata?: boolean;
}

// Summary Response Types
export interface SummaryResponse {
  summary: BlogSummary;
  related?: BlogSummary[];
  statistics?: SummaryStatistics;
}

export interface SummaryListResponse {
  summaries: BlogSummary[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  filters?: SummaryFilters;
}

export interface SummaryStatistics {
  averageWordCount: number;
  averageReadingTime: number;
  languageDistribution: {
    language: string;
    count: number;
    percentage: number;
  }[];
  domainDistribution: { domain: string; count: number; percentage: number }[];
  createdThisWeek: number;
  createdThisMonth: number;
  totalSummaries: number;
}

// Summary Filters and Facets
export interface SummaryFilters {
  domains: { value: string; label: string; count: number }[];
  authors: { value: string; label: string; count: number }[];
  languages: { value: string; label: string; count: number }[];
  dateRanges: { value: string; label: string; count: number }[];
  wordCountRanges: { value: string; label: string; count: number }[];
}

// Summary Analytics
export interface SummaryAnalytics {
  overview: {
    totalSummaries: number;
    totalWords: number;
    averageWordCount: number;
    uniqueDomains: number;
    uniqueAuthors: number;
  };
  trends: {
    dailyCreated: { date: string; count: number }[];
    weeklyCreated: { week: string; count: number }[];
    monthlyCreated: { month: string; count: number }[];
  };
  topPerformers: {
    mostSummarizedDomains: { domain: string; count: number }[];
    mostActiveAuthors: { author: string; count: number }[];
    longestSummaries: { id: string; title: string; wordCount: number }[];
  };
  qualityMetrics: {
    averageConfidenceScore: number;
    averageProcessingTime: number;
    successRate: number;
    errorRate: number;
  };
}

// Summary Processing Types
export interface SummaryProcessingJob {
  id: string;
  url: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  result?: BlogSummary;
}

export interface SummaryProcessingOptions {
  maxLength?: number;
  includeKeywords?: boolean;
  translateToUrdu?: boolean;
  priority?: "low" | "normal" | "high";
  retryOnFailure?: boolean;
  webhookUrl?: string;
}

// Summary Quality Assessment
export interface SummaryQuality {
  coherence: number; // 0-1 score
  informativeness: number; // 0-1 score
  readability: number; // 0-1 score
  accuracy: number; // 0-1 score
  overallScore: number; // 0-1 score
  feedback?: string;
}

export interface SummaryComparison {
  original: string;
  summary: string;
  compressionRatio: number;
  keyPointsCovered: string[];
  keyPointsMissed: string[];
  quality: SummaryQuality;
}

// Summary Templates
export interface SummaryTemplate {
  id: string;
  name: string;
  description: string;
  maxLength: number;
  style: "extractive" | "abstractive" | "bullet-points" | "executive";
  language: "en" | "ur" | "both";
  includeKeywords: boolean;
  includeStatistics: boolean;
  customPrompt?: string;
}

// Summary Sharing and Export
export interface SummaryShare {
  id: string;
  summaryId: string;
  shareToken: string;
  expiresAt: Date;
  accessCount: number;
  maxAccess?: number;
  password?: string;
  publicAccess: boolean;
}

export interface SummaryExport {
  format: "json" | "csv" | "pdf" | "docx" | "txt";
  includeOriginal: boolean;
  includeMetadata: boolean;
  includeUrduTranslation: boolean;
  template?: string;
  customFields?: string[];
}
// Summary Validation
export interface SummaryValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}
export interface SummaryValidationRules {
  minLength: number;
  maxLength: number;
  requiredElements: string[];
  forbiddenElements: string[];
  languageConsistency: boolean;
  factualAccuracy: boolean;
}
// Summary Versioning
export interface SummaryVersion {
  id: string;
  summaryId: string;
  version: number;
  summary: string;
  urdu_summary: string;
  changes: string[];
  createdAt: Date;
  createdBy: string;
  approved: boolean;
}
// Summary Workflow
export interface SummaryWorkflow {
  id: string;
  name: string;
  steps: SummaryWorkflowStep[];
  triggers: SummaryWorkflowTrigger[];
  isActive: boolean;
}
export interface SummaryWorkflowStep {
  id: string;
  name: string;
  type: "scrape" | "process" | "translate" | "validate" | "approve" | "notify";
  config: any;
  order: number;
  isRequired: boolean;
}
export interface SummaryWorkflowTrigger {
  event: string;
  conditions: any;
  actions: string[];
}
