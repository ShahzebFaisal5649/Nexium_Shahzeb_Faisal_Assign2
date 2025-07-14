import { useState, useCallback } from "react";
import { toast } from "@/hooks/useToast";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
} from "@/utils/constants";

export function useBlogScraper() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const scrapeBlog = useCallback(async (url) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    // Show loading toast
    const loadingToast = toast({
      title: LOADING_MESSAGES.SCRAPING,
      description: "Please wait while we process your blog...",
      duration: 0, // Keep until dismissed
    });

    try {
      const response = await fetch("/api/scrape-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || ERROR_MESSAGES.SCRAPING_FAILED);
      }

      setData(result.data);

      // Dismiss loading toast and show success
      loadingToast.dismiss();
      toast({
        title: SUCCESS_MESSAGES.BLOG_SCRAPED,
        description: `Successfully processed "${result.data.title}"`,
        variant: "success",
      });

      return result.data;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      setError(errorMessage);

      // Dismiss loading toast and show error
      loadingToast.dismiss();
      toast({
        title: "Scraping Failed",
        description: errorMessage,
        variant: "destructive",
      });

      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  const retry = useCallback(
    (url) => {
      if (url) {
        return scrapeBlog(url);
      }
    },
    [scrapeBlog]
  );

  return {
    scrapeBlog,
    isLoading,
    error,
    data,
    reset,
    retry,
  };
}

// Custom hook for handling blog scraping with caching
export function useBlogScraperWithCache() {
  const [cache, setCache] = useState(new Map());
  const { scrapeBlog, isLoading, error, data, reset } = useBlogScraper();

  const scrapeBlogCached = useCallback(
    async (url) => {
      // Check cache first
      if (cache.has(url)) {
        const cachedData = cache.get(url);
        toast({
          title: "Using Cached Data",
          description: "Found previously scraped content for this URL",
          variant: "success",
        });
        return cachedData;
      }

      // Scrape new content
      const result = await scrapeBlog(url);

      // Cache the result
      setCache((prev) => new Map(prev).set(url, result));

      return result;
    },
    [cache, scrapeBlog]
  );

  const clearCache = useCallback(() => {
    setCache(new Map());
    toast({
      title: "Cache Cleared",
      description: "All cached blog data has been cleared",
    });
  }, []);

  return {
    scrapeBlog: scrapeBlogCached,
    isLoading,
    error,
    data,
    reset,
    cache: Array.from(cache.entries()),
    clearCache,
  };
}
