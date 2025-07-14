// @ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Loader2, AlertCircle } from "lucide-react";

export default function BlogForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    try {
      const urlObj = new URL(url);

      // Check if it's just a domain
      if (urlObj.pathname === "/" || urlObj.pathname === "") {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!url) {
      setErrors({ url: "URL is required" });
      return;
    }

    if (!validateUrl(url)) {
      setErrors({
        url: "Please enter a specific blog post URL (e.g., https://example.com/blog/article-title), not just a domain",
      });
      return;
    }

    onSubmit(url);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (errors.url) {
      setErrors({});
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Blog Summariser
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enter a specific blog post URL to get an AI-powered summary in English
          and Urdu
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="url"
              placeholder="https://example.com/blog/specific-article-title"
              value={url}
              onChange={handleUrlChange}
              className={errors.url ? "border-red-500" : ""}
            />
            {errors.url && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                <AlertCircle className="h-4 w-4" />
                <p>{errors.url}</p>
              </div>
            )}
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                <strong>Good examples:</strong>
              </p>
              <ul className="text-xs text-gray-500 mt-1 space-y-1">
                <li>• https://blog.vercel.com/nextjs-app-router</li>
                <li>• https://css-tricks.com/guide-to-flexbox</li>
                <li>• https://dev.to/author/article-title</li>
              </ul>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Summarise Blog"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
