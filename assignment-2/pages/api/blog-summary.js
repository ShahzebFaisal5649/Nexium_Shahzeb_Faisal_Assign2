import { SummaryService } from "@/lib/summaryService";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        // Save new summary
        const savedSummary = await SummaryService.saveSummary(req.body);
        res.status(201).json({ success: true, data: savedSummary });
        break;

      case "GET":
        if (req.query.url) {
          // Get specific summary by URL
          const summary = await SummaryService.getSummaryByUrl(req.query.url);
          res.status(200).json({ success: true, data: summary });
        } else {
          // Get all summaries
          const summaries = await SummaryService.getAllSummaries();
          res.status(200).json({ success: true, data: summaries });
        }
        break;

      case "DELETE":
        // Delete summary
        const deleted = await SummaryService.deleteSummary(req.query.url);
        res.status(200).json({ success: true, data: deleted });
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Summary API error:", error);
    res.status(500).json({ error: error.message });
  }
}
