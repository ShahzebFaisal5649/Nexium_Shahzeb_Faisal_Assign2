import { BlogContentService } from "@/lib/blogContentService";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        // Save new blog content
        const savedContent = await BlogContentService.saveBlogContent(req.body);
        res.status(201).json({ success: true, data: savedContent });
        break;

      case "GET":
        if (req.query.url) {
          // Get specific blog by URL
          const content = await BlogContentService.getBlogContentByUrl(
            req.query.url
          );
          res.status(200).json({ success: true, data: content });
        } else {
          // Get all blogs with pagination
          const { page = 1, limit = 10 } = req.query;
          const result = await BlogContentService.getAllBlogContents(
            parseInt(page),
            parseInt(limit)
          );
          res.status(200).json({ success: true, ...result });
        }
        break;

      case "PUT":
        // Update blog content
        const { url, ...updateData } = req.body;
        const updated = await BlogContentService.updateBlogContent(
          url,
          updateData
        );
        res.status(200).json({ success: true, data: updated });
        break;

      case "DELETE":
        // Delete blog content
        const deleted = await BlogContentService.deleteBlogContent(
          req.query.url
        );
        res.status(200).json({ success: true, data: deleted });
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Blog content API error:", error);
    res.status(500).json({ error: error.message });
  }
}
