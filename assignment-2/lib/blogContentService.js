// lib/blogContentService.js - Using MongoDB (as per Assignment 2 requirements)
import connectDB from "./mongodb";
import BlogContent from "@/models/BlogContent";

export class BlogContentService {
  // CREATE: Save scraped blog content
  static async saveBlogContent(data) {
    await connectDB();

    try {
      const blogContent = new BlogContent({
        url: data.url,
        title: data.title,
        content: data.content,
        wordCount: data.content.split(" ").length,
        metadata: {
          domain: new URL(data.url).hostname,
          publishedDate: data.publishedDate,
          author: data.author,
        },
      });

      const saved = await blogContent.save();
      return saved;
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate URL - update instead
        return await this.updateBlogContent(data.url, data);
      }
      throw error;
    }
  }

  // READ: Get blog content by URL
  static async getBlogContentByUrl(url) {
    await connectDB();

    try {
      const content = await BlogContent.findOne({ url });
      return content;
    } catch (error) {
      throw error;
    }
  }

  // READ: Get all blog contents (with pagination)
  static async getAllBlogContents(page = 1, limit = 10) {
    await connectDB();

    try {
      const skip = (page - 1) * limit;
      const contents = await BlogContent.find()
        .select("-content") // Exclude full content for listing
        .sort({ extractedAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await BlogContent.countDocuments();

      return {
        contents,
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

  // UPDATE: Update existing blog content
  static async updateBlogContent(url, data) {
    await connectDB();

    try {
      const updated = await BlogContent.findOneAndUpdate(
        { url },
        {
          title: data.title,
          content: data.content,
          wordCount: data.content.split(" ").length,
          extractedAt: new Date(),
          metadata: {
            domain: new URL(data.url).hostname,
            publishedDate: data.publishedDate,
            author: data.author,
          },
        },
        { new: true }
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }

  // DELETE: Remove blog content
  static async deleteBlogContent(url) {
    await connectDB();

    try {
      const deleted = await BlogContent.findOneAndDelete({ url });
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  // SEARCH: Find blogs by title or content
  static async searchBlogContents(query) {
    await connectDB();

    try {
      const results = await BlogContent.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
        ],
      })
        .select("-content")
        .sort({ extractedAt: -1 })
        .limit(20);

      return results;
    } catch (error) {
      throw error;
    }
  }

  // UTILITY: Check if blog exists
  static async blogExists(url) {
    await connectDB();

    try {
      const exists = await BlogContent.exists({ url });
      return !!exists;
    } catch (error) {
      throw error;
    }
  }
}
