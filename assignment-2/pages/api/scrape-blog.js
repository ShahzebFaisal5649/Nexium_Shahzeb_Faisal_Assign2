import { scrapeBlogContent } from "@/lib/scraper";
import { BlogContentService } from "@/lib/blogContentService";
import { SummaryService } from "@/lib/summaryService";
import { generateSummary } from "@/lib/textProcessor";
import { translateToUrdu } from "@/lib/translator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Check if we already have this blog
    const existingSummary = await SummaryService.getSummaryByUrl(url);
    if (existingSummary) {
      return res.status(200).json({ success: true, data: existingSummary });
    }

    // 1. Scrape the blog content
    const scrapedData = await scrapeBlogContent(url);

    // 2. Save full content to MongoDB
    const savedContent = await BlogContentService.saveBlogContent({
      url: url,
      title: scrapedData.title,
      content: scrapedData.content,
      author: scrapedData.author,
      publishedDate: scrapedData.publishedDate,
    });

    // 3. Generate summary
    const summary = generateSummary(scrapedData.content);

    // 4. Translate to Urdu
    const urduSummary = translateToUrdu(summary);

    // 5. Save summary to Supabase
    const savedSummary = await SummaryService.saveSummary({
      url,
      title: scrapedData.title,
      summary,
      urdu_summary: urduSummary,
      word_count: scrapedData.content.split(" ").length,
      mongo_id: savedContent._id.toString(),
    });

    const responseData = {
      title: scrapedData.title,
      summary,
      urduSummary,
      url,
      wordCount: scrapedData.content.split(" ").length,
      extractedAt: savedContent.extractedAt,
    };

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({ error: error.message });
  }
}
