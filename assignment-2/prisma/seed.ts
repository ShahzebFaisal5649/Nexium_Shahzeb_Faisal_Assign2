import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleQuotes = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success",
  },
  {
    content:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "motivation",
  },
  {
    content:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "dreams",
  },
  {
    content:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "inspiration",
  },
  {
    content: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "opportunity",
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "motivation",
  },
  {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "inspiration",
  },
  {
    content:
      "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    category: "success",
  },
  {
    content: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "persistence",
  },
  {
    content: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford",
    category: "mindset",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create sample quotes
  for (const quote of sampleQuotes) {
    await prisma.quote.create({
      data: quote,
    });
    console.log(`✅ Created quote by ${quote.author}`);
  }

  console.log("🎉 Database seeded successfully!");
  console.log(`📊 Added ${sampleQuotes.length} quotes to the database`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
