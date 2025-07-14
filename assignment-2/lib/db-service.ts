import { error } from "console";
import { supabase } from "./supabase";

export class DatabaseService {
  static async getRandomQuotes(count: number = 3) {
    const { data: quotes, error } = await supabase
      .from("quotes")
      .select("*")
      .limit(count);

    if (error) {
      console.error("Error fetching quotes:", error);
      return [];
    }
    return quotes || [];
  }

  static async createQuote(data: {
    content: string;
    author: string;
    category: string;
  }) {
    const { data: quote, error } = await supabase
      .from("quotes")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return quote;
  }

  static async getQuotesByCategory(category: string) {
    const quotes = await (supabase.from("quotes") as any)
      .select("*")
      .where("category", "ilike", `%${category}%`)
      .limit(10);

    if (error) {
      console.error("Error fetching quotes:", error);
      return [];
    }
    return quotes || [];
  }
}
