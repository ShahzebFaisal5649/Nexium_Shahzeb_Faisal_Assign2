import './globals.css'

export const metadata = {
  title: 'Blog Summarizer - Nexium Assignment 2',
  description: 'AI-powered blog summarization with Urdu translation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}