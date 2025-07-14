// lib/scraper.js - Improved scraper with better content detection
import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBlogContent(url) {
  try {
    // Validate URL format
    if (!url.includes("/") || url.endsWith(".com") || url.endsWith(".org")) {
      throw new Error(
        "Please enter a specific blog post URL, not just a domain (e.g., https://example.com/blog/article-title)"
      );
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    // Remove unwanted elements
    $(
      "script, style, nav, footer, aside, .advertisement, .ads, .sidebar, .comments, .loading, .spinner"
    ).remove();

    // Extract title with multiple fallbacks
    let title =
      $("h1").first().text().trim() ||
      $("title").text().trim() ||
      $('meta[property="og:title"]').attr("content") ||
      $('[data-testid="post-title"]').text().trim() ||
      $(".entry-title").text().trim() ||
      $(".post-title").text().trim() ||
      "Untitled Blog Post";

    // Clean title
    title = title.replace(/\s+/g, " ").trim();

    // Extract main content with multiple selectors
    const contentSelectors = [
      "article .entry-content",
      "article .post-content",
      ".post-body",
      ".entry-content",
      ".post-content",
      ".content",
      ".article-content",
      "article",
      "main .content",
      '[data-testid="post-content"]',
      ".story-body",
      ".article-body",
    ];

    let content = "";
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length && element.text().trim().length > 200) {
        content = element.text().trim();
        break;
      }
    }

    // Fallback to body content if nothing found
    if (!content || content.length < 100) {
      content = $("body").text().trim();
    }

    // Clean up content
    content = content
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .replace(/Loading[.\s]*/gi, "")
      .replace(/Please wait[.\s]*/gi, "")
      .trim();

    // Check for loading/placeholder content
    const loadingKeywords = [
      "loading",
      "please wait",
      "grab all",
      "shouldnt take long",
      "loading sites",
    ];
    const hasLoadingContent = loadingKeywords.some((keyword) =>
      content.toLowerCase().includes(keyword.toLowerCase())
    );

    if (hasLoadingContent && content.length < 500) {
      throw new Error(
        "This appears to be a loading page or homepage. Please enter a direct link to a specific blog post or article."
      );
    }

    // Extract author
    const author =
      $('[rel="author"]').first().text().trim() ||
      $(".author").first().text().trim() ||
      $(".byline").first().text().trim() ||
      $('meta[name="author"]').attr("content") ||
      $('[data-testid="author"]').text().trim() ||
      "";

    // Extract published date
    const publishedDate =
      $("time").attr("datetime") ||
      $('meta[property="article:published_time"]').attr("content") ||
      $('meta[name="date"]').attr("content") ||
      null;

    // Final content validation
    if (content.length < 100) {
      throw new Error(
        "Unable to extract meaningful content. This might be a protected page, dynamic content, or invalid URL."
      );
    }

    // Check word count
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 50) {
      throw new Error(
        "Content too short. Please try a longer blog post or article."
      );
    }

    return {
      title,
      content,
      author,
      url,
      publishedDate: publishedDate ? new Date(publishedDate) : null,
      extractedAt: new Date(),
      wordCount,
    };
  } catch (error) {
    if (error.code === "ENOTFOUND") {
      throw new Error("URL not found. Please check the URL and try again.");
    } else if (error.code === "ECONNREFUSED") {
      throw new Error("Connection refused. The website may be down.");
    } else if (error.response?.status === 404) {
      throw new Error("Blog post not found (404).");
    } else if (error.response?.status === 403) {
      throw new Error(
        "Access denied. The website may be blocking automated requests."
      );
    } else {
      throw new Error(`${error.message}`);
    }
  }
}
