import { translateToUrdu } from "@/lib/translator";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const translation = translateToUrdu(text);

    res.status(200).json({ success: true, data: { translation } });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: error.message });
  }
}
