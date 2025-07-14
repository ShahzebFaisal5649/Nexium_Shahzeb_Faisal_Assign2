// models/Summary.js
// Supabase table structure definition
// This file defines the expected structure for the blog_summaries table

export const blogSummariesTableSchema = {
  id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
  url: 'text UNIQUE NOT NULL',
  title: 'text NOT NULL',
  summary: 'text NOT NULL',
  urdu_summary: 'text NOT NULL',
  word_count: 'integer DEFAULT 0',
  mongo_id: 'text',
  created_at: 'timestamp with time zone DEFAULT now()',
  updated_at: 'timestamp with time zone DEFAULT now()'
};

// SQL to create the table in Supabase
export const createTableSQL = `
  CREATE TABLE IF NOT EXISTS blog_summaries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    url text UNIQUE NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    urdu_summary text NOT NULL,
    word_count integer DEFAULT 0,
    mongo_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
  );

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_blog_summaries_url ON blog_summaries(url);
  CREATE INDEX IF NOT EXISTS idx_blog_summaries_created_at ON blog_summaries(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_blog_summaries_mongo_id ON blog_summaries(mongo_id);
`;

// JavaScript object representing BlogSummary structure
export const BlogSummarySchema = {
  id: 'string',
  url: 'string',
  title: 'string', 
  summary: 'string',
  urdu_summary: 'string',
  word_count: 'number',
  mongo_id: 'string|null',
  created_at: 'string',
  updated_at: 'string'
};

// Example BlogSummary object
export const exampleBlogSummary = {
  id: 'cuid-example',
  url: 'https://example.com/blog-post',
  title: 'Example Blog Post',
  summary: 'This is an example summary of the blog post.',
  urdu_summary: 'یہ بلاگ پوسٹ کا ایک مثالی خلاصہ ہے۔',
  word_count: 150,
  mongo_id: 'mongodb-object-id',
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-15T10:30:00Z'
};

// Validation function for BlogSummary
export function validateBlogSummary(data) {
  const errors = [];
  
  if (!data.url || typeof data.url !== 'string') {
    errors.push('URL is required and must be a string');
  }
  
  if (!data.title || typeof data.title !== 'string') {
    errors.push('Title is required and must be a string');
  }
  
  if (!data.summary || typeof data.summary !== 'string') {
    errors.push('Summary is required and must be a string');
  }
  
  if (!data.urdu_summary || typeof data.urdu_summary !== 'string') {
    errors.push('Urdu summary is required and must be a string');
  }
  
  if (typeof data.word_count !== 'number' || data.word_count < 0) {
    errors.push('Word count must be a non-negative number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helper function to create a new BlogSummary object
export function createBlogSummary(data) {
  const validation = validateBlogSummary(data);
  
  if (!validation.isValid) {
    throw new Error(`Invalid BlogSummary data: ${validation.errors.join(', ')}`);
  }
  
  return {
    url: data.url,
    title: data.title,
    summary: data.summary,
    urdu_summary: data.urdu_summary,
    word_count: data.word_count,
    mongo_id: data.mongo_id || null,
    created_at: data.created_at || new Date().toISOString(),
    updated_at: data.updated_at || new Date().toISOString()
  };
}