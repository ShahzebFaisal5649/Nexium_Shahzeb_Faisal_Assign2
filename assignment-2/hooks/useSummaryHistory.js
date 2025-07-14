import { useState, useEffect, useCallback } from "react";
import { toast } from "@/hooks/useToast";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/utils/constants";

export function useSummaryHistory() {
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchSummaries = useCallback(async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/blog-summary?page=${page}&limit=${limit}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch summaries");
      }

      setSummaries(result.data || []);
      setPagination(result.pagination || { page, limit, total: 0, pages: 0 });
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      setError(errorMessage);
      toast({
        title: "Failed to Load History",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSummary = useCallback(async (url) => {
    try {
      const response = await fetch(
        `/api/blog-summary?url=${encodeURIComponent(url)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete summary");
      }

      // Remove from local state
      setSummaries((prev) => prev.filter((summary) => summary.url !== url));

      toast({
        title: "Summary Deleted",
        description: "Blog summary has been successfully deleted",
        variant: "success",
      });

      return result.data;
    } catch (err) {
      const errorMessage = err.message || ERROR_MESSAGES.UNKNOWN_ERROR;
      setError(errorMessage);

      toast({
        title: "Delete Failed",
        description: errorMessage,
        variant: "destructive",
      });

      throw err;
    }
  }, []);

  const searchSummaries = useCallback(
    async (query) => {
      if (!query.trim()) {
        fetchSummaries();
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/blog-summary/search?q=${encodeURIComponent(query)}`
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Search failed");
        }

        setSummaries(result.data || []);
        setPagination({
          page: 1,
          limit: result.data?.length || 0,
          total: result.data?.length || 0,
          pages: 1,
        });
      } catch (err) {
        const errorMessage = err.message || ERROR_MESSAGES.UNKNOWN_ERROR;
        setError(errorMessage);
        toast({
          title: "Search Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [fetchSummaries]
  );

  const refreshSummaries = useCallback(() => {
    fetchSummaries(pagination.page, pagination.limit);
  }, [fetchSummaries, pagination.page, pagination.limit]);

  const loadMore = useCallback(() => {
    if (pagination.page < pagination.pages) {
      fetchSummaries(pagination.page + 1, pagination.limit);
    }
  }, [fetchSummaries, pagination.page, pagination.pages, pagination.limit]);

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  return {
    summaries,
    isLoading,
    error,
    pagination,
    deleteSummary,
    searchSummaries,
    refreshSummaries,
    loadMore,
    refetch: fetchSummaries,
  };
}

// Hook for managing summary favorites
export function useSummaryFavorites() {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = useCallback((url) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(url)) {
        newFavorites.delete(url);
        toast({
          title: "Removed from Favorites",
          description: "Blog summary removed from favorites",
        });
      } else {
        newFavorites.add(url);
        toast({
          title: "Added to Favorites",
          description: "Blog summary added to favorites",
          variant: "success",
        });
      }
      // Save to localStorage
      localStorage.setItem("blogFavorites", JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (url) => {
      return favorites.has(url);
    },
    [favorites]
  );

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("blogFavorites");
    if (saved) {
      try {
        const favoriteUrls = JSON.parse(saved);
        setFavorites(new Set(favoriteUrls));
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    }
  }, []);

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
  };
}
