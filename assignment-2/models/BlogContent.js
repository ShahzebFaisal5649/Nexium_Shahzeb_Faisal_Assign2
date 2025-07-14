import mongoose from "mongoose";

const BlogContentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  wordCount: {
    type: Number,
    default: 0,
  },
  extractedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    domain: String,
    publishedDate: Date,
    author: String,
  },
});

// Index for faster queries
BlogContentSchema.index({ url: 1 });
BlogContentSchema.index({ extractedAt: -1 });

export default mongoose.models.BlogContent ||
  mongoose.model("BlogContent", BlogContentSchema);
