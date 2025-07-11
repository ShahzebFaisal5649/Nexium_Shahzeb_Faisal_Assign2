# Nexium_Shahzeb_Faisal_Assign2

## 📖 Blog Summariser Web App

A full-stack web application that extracts content from blog URLs, generates intelligent summaries, and provides Urdu translations. Built with Next.js 15, featuring modern UI components and dual database storage.

## 🚀 Live Demo

**Deployed URL:** [Your Vercel Deployment URL]

## 🎯 Project Overview

This Blog Summariser is part of the Nexium AI-First Web Development Internship (Assignment 2). The application demonstrates:

- **Web Scraping**: Extract text content from blog URLs
- **AI-Powered Summarization**: Generate concise summaries using simulated AI logic
- **Translation**: Convert summaries to Urdu using JavaScript dictionary logic
- **Dual Database Storage**: Structured data in Supabase, raw text in MongoDB
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS

## ✨ Features

### Core Functionality
- 📝 **Blog URL Input**: Clean form interface for entering blog URLs
- 🔍 **Content Extraction**: Scrape and parse blog text content
- 🤖 **Smart Summarization**: AI-simulated keyword extraction and summary generation
- 🌐 **Urdu Translation**: Local dictionary-based translation system
- 💾 **Dual Storage**: Summaries in Supabase PostgreSQL, full text in MongoDB

### Technical Features
- ⚡ **Next.js 15**: Latest App Router and Server Components
- 🎨 **ShadCN UI**: Modern, accessible component library
- 🎯 **TypeScript**: Type-safe development
- 📱 **Responsive Design**: Mobile-first approach
- 🔄 **Real-time Updates**: Live processing feedback
- 🛡️ **Error Handling**: Comprehensive error management

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React

### Backend
- **API Routes**: Next.js API Routes
- **Web Scraping**: Cheerio/Puppeteer
- **Text Processing**: Custom JavaScript logic

### Databases
- **Structured Data**: Supabase (PostgreSQL)
- **Raw Text Storage**: MongoDB Atlas
- **ORM**: Prisma (for PostgreSQL)

### Deployment & DevOps
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Version Control**: Git with conventional commits

## 🏗️ Project Structure

```
assignment-2/
├── app/
│   ├── api/
│   │   ├── scrape/
│   │   ├── summarize/
│   │   └── translate/
│   ├── components/
│   │   ├── ui/
│   │   └── blog-summarizer/
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── supabase.ts
│   │   └── mongodb.ts
│   └── page.tsx
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS ≥ 20)
- pnpm package manager
- Supabase account
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShahzebFaisal5649/Nexium_Shahzeb_Faisal_Assign2.git
   cd Nexium_Shahzeb_Faisal_Assign2
   ```

2. **Install dependencies**
   ```bash
   corepack enable && corepack prepare pnpm@latest --activate
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexium-mongo

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. **Database Setup**
   ```bash
   # Setup Prisma
   npx prisma generate
   npx prisma db push

   # Verify MongoDB connection
   # (Connection will be tested on first API call)
   ```

6. **Run the development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How It Works

### 1. URL Input
- User enters a blog URL through the ShadCN UI form
- Client-side validation ensures proper URL format
- Loading states provide user feedback

### 2. Content Extraction
- Server-side API scrapes the blog content
- Extracts title, main text, and metadata
- Handles various blog formats and structures

### 3. AI Summarization
- Simulated AI logic processes the extracted text
- Keyword extraction and importance scoring
- Generates concise, meaningful summaries

### 4. Urdu Translation
- JavaScript dictionary-based translation
- Handles common English-to-Urdu word mappings
- Fallback logic for untranslated terms

### 5. Database Storage
- **Supabase**: Stores structured summary data
  - Blog URL, title, summary, translation
  - Metadata and timestamps
- **MongoDB**: Stores raw blog content
  - Full text content for future processing
  - Original HTML structure

## 🗄️ Database Schema

### Supabase (PostgreSQL)
```sql
CREATE TABLE blog_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  title TEXT,
  summary TEXT NOT NULL,
  urdu_translation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### MongoDB Document Structure
```javascript
{
  _id: ObjectId,
  url: String,
  title: String,
  content: String,
  html: String,
  metadata: {
    wordCount: Number,
    scrapedAt: Date,
    contentLength: Number
  },
  createdAt: Date
}
```

## 📊 API Endpoints

### `POST /api/scrape`
Scrapes content from a blog URL
- **Input**: `{ url: string }`
- **Output**: `{ title: string, content: string, metadata: object }`

### `POST /api/summarize`
Generates summary from blog content
- **Input**: `{ content: string, title: string }`
- **Output**: `{ summary: string, keywords: string[] }`

### `POST /api/translate`
Translates text to Urdu
- **Input**: `{ text: string }`
- **Output**: `{ translation: string, confidence: number }`

### `POST /api/process-blog`
Complete blog processing pipeline
- **Input**: `{ url: string }`
- **Output**: `{ summary: string, translation: string, id: string }`

## 🧪 Testing

### Manual Testing
1. Test with various blog URLs
2. Verify summarization quality
3. Check Urdu translation accuracy
4. Validate database storage

### URL Test Cases
- Medium articles
- Personal blogs
- News articles
- Technical documentation

## 🚀 Deployment

### Vercel Deployment
1. **Connect GitHub repository to Vercel**
2. **Configure environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
MONGODB_URI=your_production_mongodb_uri
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 📈 Performance Optimizations

- **Server-side rendering** for better SEO
- **Image optimization** with Next.js Image component
- **Code splitting** for reduced bundle size
- **Caching strategies** for API responses
- **Database indexing** for faster queries

## 🔒 Security Features

- **Input validation** on all API endpoints
- **Rate limiting** to prevent abuse
- **CORS configuration** for secure cross-origin requests
- **Environment variable protection**
- **SQL injection prevention** with Prisma

## 🎨 UI/UX Features

### Design System
- **Consistent spacing** with Tailwind CSS
- **Accessible color palette**
- **Responsive breakpoints**
- **Loading states** and error handling
- **Toast notifications** for user feedback

### Components
- **Blog URL Form**: Clean input with validation
- **Summary Display**: Well-formatted output
- **Translation Toggle**: Switch between languages
- **History View**: Previously summarized blogs

## 🔍 SEO Optimization

- **Meta tags** for better search visibility
- **Open Graph** tags for social sharing
- **JSON-LD** structured data
- **Sitemap** generation
- **Robot.txt** configuration

## 📱 Mobile Responsiveness

- **Mobile-first** design approach
- **Touch-friendly** interface elements
- **Optimized typography** for small screens
- **Responsive images** and media
- **PWA capabilities** for app-like experience

## 🔄 Future Enhancements

- [ ] Real AI integration (OpenAI/Hugging Face)
- [ ] Advanced Urdu NLP processing
- [ ] User authentication and personal history
- [ ] Bulk URL processing
- [ ] Export summaries to PDF/Word
- [ ] Social sharing capabilities
- [ ] Analytics and usage tracking

## 🐛 Known Issues

- Translation accuracy depends on dictionary coverage
- Some complex blog layouts may not scrape perfectly
- Rate limiting may affect rapid successive requests

## 📚 Learning Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [ShadCN UI Components](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)

## 🤝 Contributing

This project is part of the Nexium internship program. For questions or feedback:

1. **Tag mentors** in GitHub Issues
2. **Attend mentor sessions**: Monday & Thursday 7-8 PM PKT
3. **Email support** for specific technical issues

## 👨‍💻 Developer

**Shahzeb Faisal**
- GitHub: [@ShahzebFaisal5649](https://github.com/ShahzebFaisal5649)
- Project: Nexium AI-First Web Development Internship
- Assignment: 2 - Blog Summariser

## 📄 License

This project is developed as part of the Nexium internship program.

---

**🎯 Assignment Requirements Checklist:**
- ✅ Input: Blog URL → scrape text
- ✅ Simulate AI summary (keyword extraction/static logic)
- ✅ Translate to Urdu (JS dictionary/logic)
- ✅ Save summary in Supabase; full text in MongoDB
- ✅ Use ShadCN UI & deploy to Vercel
- ✅ Code in assignment-2/ folder

**📊 Project Weight: 35% of final grade**

**🚀 Demo Day: July 14, 2024**