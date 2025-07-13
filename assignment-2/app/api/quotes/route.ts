import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db-service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const random = searchParams.get("random");

    let quotes;

    if (random === "true") {
      quotes = await DatabaseService.getRandomQuotes(3);
    } else if (category && category.trim() !== "") {
      quotes = await DatabaseService.getQuotesByCategory(category.trim());
    } else {
      quotes = await DatabaseService.getAllQuotes();
    }

    return NextResponse.json({
      quotes,
      count: quotes.length,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch quotes",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, author, category, userId } = body;

    // Validation
    if (!content || !author || !category) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: content, author, and category are required",
          success: false,
        },
        { status: 400 }
      );
    }

    const quote = await DatabaseService.createQuote({
      content: content.trim(),
      author: author.trim(),
      category: category.trim().toLowerCase(),
      userId,
    });

    return NextResponse.json(
      {
        quote,
        success: true,
        message: "Quote created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      {
        error: "Failed to create quote",
        success: false,
      },
      { status: 500 }
    );
  }
}
