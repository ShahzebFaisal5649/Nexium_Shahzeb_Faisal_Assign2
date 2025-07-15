# Blog Summariser - Assignment 2

A Next.js application that scrapes blog content, generates summaries, translates to Urdu, and stores data in MongoDB + Supabase.

## Features

- 🔗 Blog URL scraping
- 📝 AI-powered summarization (simulated)
- 🌐 Urdu translation
- 💾 MongoDB for full content storage
- 🗄️ Supabase for summary metadata
- 🎨 ShadCN UI components
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, MongoDB, Supabase
- **Deployment**: Vercel

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your credentials
4. Run development server: `npm run dev`

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `DATABASE_URL`: PostgreSQL connection string
- `MONGODB_URI`: MongoDB connection string

## API Endpoints

- `POST /api/scrape-blog`: Scrape and process blog content
- `GET /api/blog-content`: Get blog content from MongoDB
- `POST /api/blog-content`: Save blog content to MongoDB
- `GET /api/blog-summary`: Get summaries from Supabase
- `POST /api/blog-summary`: Save summary to Supabase

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```
