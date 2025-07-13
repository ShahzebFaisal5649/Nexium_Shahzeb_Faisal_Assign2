import { prisma } from './prisma'

export class DatabaseService {
  // User operations
  static async createUser(data: { email: string; name?: string }) {
    return prisma.user.create({
      data,
    })
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        quotes: true,
        summaries: true,
      },
    })
  }

  // Quote operations
  static async createQuote(data: {
    content: string
    author: string
    category: string
    userId?: string
  }) {
    return prisma.quote.create({
      data,
    })
  }

  static async getQuotesByCategory(category: string) {
    return prisma.quote.findMany({
      where: { 
        category: {
          contains: category,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
  }

  static async getRandomQuotes(count: number = 3) {
    // Get total count
    const totalQuotes = await prisma.quote.count()
    
    if (totalQuotes === 0) {
      return []
    }

    // Generate random skip value
    const skip = Math.max(0, Math.floor(Math.random() * (totalQuotes - count)))
    
    return prisma.quote.findMany({
      take: count,
      skip,
      orderBy: { createdAt: 'desc' }
    })
  }

  static async getAllQuotes() {
    return prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  // Blog summary operations (for Assignment 2)
  static async createBlogSummary(data: {
    title: string
    url: string
    summary: string
    urduSummary?: string
    keywords: string[]
    userId?: string
  }) {
    return prisma.blogSummary.create({
      data,
    })
  }

  static async getBlogSummaries(userId?: string) {
    return prisma.blogSummary.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
  }

  static async getBlogSummaryById(id: string) {
    return prisma.blogSummary.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
  }
}