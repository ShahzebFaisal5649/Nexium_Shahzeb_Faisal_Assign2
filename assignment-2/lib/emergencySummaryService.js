// lib/emergencySummaryService.js - MongoDB only (emergency fallback)
import connectDB from "./mongodb";
import mongoose from "mongoose";

// Create a summary schema for MongoDB
const SummarySchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  urdu_summary: { type: String, required: true },
  word_count: { type: Number, default: 0 },
  mongo_id: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Summary =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);

export class EmergencySummaryService {
  // CREATE: Save summary to MongoDB
  static async saveSummary(data) {
    await connectDB();

    try {
      const summary = new Summary({
        url: data.url,
        title: data.title,
        summary: data.summary,
        urdu_summary: data.urdu_summary,
        word_count: data.word_count || 0,
        mongo_id: data.mongo_id,
      });

      const saved = await summary.save();
      return saved;
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate URL - update instead
        return await this.updateSummaryByUrl(data.url, data);
      }
      throw error;
    }
  }

  // READ: Get summary by URL
  static async getSummaryByUrl(url) {
    await connectDB();

    try {
      const summary = await Summary.findOne({ url });
      return summary;
    } catch (error) {
      console.error("Error getting summary:", error);
      return null;
    }
  }

  // UPDATE: Update existing summary
  static async updateSummaryByUrl(url, data) {
    await connectDB();

    try {
      const updated = await Summary.findOneAndUpdate(
        { url },
        {
          title: data.title,
          summary: data.summary,
          urdu_summary: data.urdu_summary,
          word_count: data.word_count,
          updated_at: new Date(),
        },
        { new: true }
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }

  // READ: Get all summaries
  static async getAllSummaries(page = 1, limit = 10) {
    await connectDB();

    try {
      const skip = (page - 1) * limit;
      const summaries = await Summary.find()
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Summary.countDocuments();

      return {
        summaries,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // DELETE: Remove summary
  static async deleteSummary(url) {
    await connectDB();

    try {
      const deleted = await Summary.findOneAndDelete({ url });
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
