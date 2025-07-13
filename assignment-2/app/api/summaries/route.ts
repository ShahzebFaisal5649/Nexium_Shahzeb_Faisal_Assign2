import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const summaries = await DatabaseService.getBlogSummaries(
      userId || undefined
    );

    return NextResponse.json({
      summaries,
      count: summaries.length,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch summaries",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url, summary, urduSummary, keywords, userId } = body;

    // Validation
    if (!title || !url || !summary) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, url, and summary are required",
          success: false,
        },
        { status: 400 }
      );
    }

    const blogSummary = await DatabaseService.createBlogSummary({
      title: title.trim(),
      url: url.trim(),
      summary: summary.trim(),
      urduSummary: urduSummary?.trim(),
      keywords: Array.isArray(keywords) ? keywords : [],
      userId,
    });

    return NextResponse.json(
      {
        summary: blogSummary,
        success: true,
        message: "Blog summary created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating summary:", error);
    return NextResponse.json(
      {
        error: "Failed to create summary",
        success: false,
      },
      { status: 500 }
    );
  }
}
