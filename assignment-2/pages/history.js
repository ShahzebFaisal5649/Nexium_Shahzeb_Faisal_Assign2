import Head from "next/head";
import BlogHistory from "@/components/blog/BlogHistory";

export default function History() {
  return (
    <>
      <Head>
        <title>Blog History - Blog Summariser</title>
        <meta
          name="description"
          content="View your previously summarised blogs"
        />
      </Head>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog History
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View all your previously summarised blog posts and their
            translations.
          </p>
        </div>

        <BlogHistory />
      </div>
    </>
  );
}
