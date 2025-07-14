// lib/summaryService.js - Minimal version that works with basic table
import { supabase } from "./supabase";

export class SummaryService {
  // CREATE: Save summary using only basic fields
  static async saveSummary(data) {
    try {
      // Only use the 4 core required fields
      const basicData = {
        url: data.url,
        title: data.title,
        summary: data.summary,
        urdu_summary: data.urdu_summary,
        word_count: data.word_count || 0,
      };

      console.log("Saving summary with data:", basicData);

      const { data: result, error } = await supabase
        .from("blog_summaries")
        .insert([basicData])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        // Handle unique constraint violation
        if (error.code === "23505") {
          console.log("Duplicate URL, attempting update...");
          return await this.updateSummaryByUrl(data.url, basicData);
        }
        throw error;
      }

      console.log("Successfully saved summary:", result);
      return result;
    } catch (error) {
      console.error("SummaryService.saveSummary error:", error);
      throw new Error(`Failed to save summary: ${error.message}`);
    }
  }

  // READ: Get summary by URL
  static async getSummaryByUrl(url) {
    try {
      const { data, error } = await supabase
        .from("blog_summaries")
        .select("*")
        .eq("url", url)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error getting summary:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("SummaryService.getSummaryByUrl error:", error);
      return null; // Return null if not found
    }
  }

  // READ: Get all summaries with pagination
  static async getAllSummaries(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;

      const {
        data: summaries,
        error,
        count,
      } = await supabase
        .from("blog_summaries")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(skip, skip + limit - 1);

      if (error) throw error;

      return {
        summaries: summaries || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit),
        },
      };
    } catch (error) {
      console.error("SummaryService.getAllSummaries error:", error);
      throw new Error(`Failed to get summaries: ${error.message}`);
    }
  }

  // UPDATE: Update existing summary
  static async updateSummaryByUrl(url, updateData) {
    try {
      const basicUpdateData = {
        title: updateData.title,
        summary: updateData.summary,
        urdu_summary: updateData.urdu_summary,
        word_count: updateData.word_count,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("blog_summaries")
        .update(basicUpdateData)
        .eq("url", url)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("SummaryService.updateSummaryByUrl error:", error);
      throw new Error(`Failed to update summary: ${error.message}`);
    }
  }

  // DELETE: Remove summary
  static async deleteSummary(url) {
    try {
      const { data, error } = await supabase
        .from("blog_summaries")
        .delete()
        .eq("url", url)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("SummaryService.deleteSummary error:", error);
      throw new Error(`Failed to delete summary: ${error.message}`);
    }
  }

  // UTILITY: Check if summary exists
  static async summaryExists(url) {
    try {
      const summary = await this.getSummaryByUrl(url);
      return !!summary;
    } catch (error) {
      return false;
    }
  }
}
