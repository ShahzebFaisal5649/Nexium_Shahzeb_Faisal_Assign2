import { useState } from "react";
import Head from "next/head";
import BlogForm from "@/components/blog/BlogForm";
import BlogSummary from "@/components/blog/BlogSummary";
import ErrorMessage from "@/components/blog/ErrorMessage";
import LoadingSpinner from "@/components/blog/LoadingSpinner";

export default function Home() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBlogSubmit = async (url) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch("/api/scrape-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setSummary(data.data);
      } else {
        setError(data.error || "Failed to process blog");
      }
    } catch (err) {
      setError("Failed to process blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Blog Summariser - AI-Powered Content Summarization</title>
        <meta
          name="description"
          content="Summarise any blog post with AI and get translations in Urdu"
        />
      </Head>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog Summariser
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter any blog URL to get an AI-powered summary in English and Urdu.
            Perfect for quickly understanding long articles and blog posts.
          </p>
        </div>

        <BlogForm onSubmit={handleBlogSubmit} loading={loading} />

        {loading && <LoadingSpinner message="Processing blog content..." />}

        {error && <ErrorMessage message={error} title="Processing Failed" />}

        {summary && <BlogSummary data={summary} />}
      </div>
    </>
  );
}
