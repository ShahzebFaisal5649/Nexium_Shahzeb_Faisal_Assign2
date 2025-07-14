import { useState, useCallback, useRef } from "react";
import { toast } from "@/hooks/useToast";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
} from "@/utils/constants";
import { translateToUrdu } from "@/lib/translator";

export function useTranslation() {
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [translationCache, setTranslationCache] = useState(new Map());
  const abortControllerRef = useRef(null);

  const translateText = useCallback(
    async (text, options = {}) => {
      if (!text) return "";

      // Check cache first
      const cacheKey = text.substring(0, 100); // Use first 100 chars as key
      if (translationCache.has(cacheKey) && !options.forceRefresh) {
        return translationCache.get(cacheKey);
      }

      // Cancel any ongoing translation
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsTranslating(true);
      setError(null);

      try {
        // For local translation (Assignment 2 requirement)
        if (options.useLocal !== false) {
          const translation = translateToUrdu(text);

          // Cache the result
          setTranslationCache((prev) =>
            new Map(prev).set(cacheKey, translation)
          );

          if (options.showToast !== false) {
            toast({
              title: SUCCESS_MESSAGES.TRANSLATION_COMPLETE,
              description: "Text has been translated to Urdu",
              variant: "success",
            });
          }

          return translation;
        }

        // API translation (for future enhancement)
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, ...options }),
          signal: abortControllerRef.current.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || ERROR_MESSAGES.TRANSLATION_FAILED);
        }

        const translation = result.data.translation;

        // Cache the result
        setTranslationCache((prev) => new Map(prev).set(cacheKey, translation));

        if (options.showToast !== false) {
          toast({
            title: SUCCESS_MESSAGES.TRANSLATION_COMPLETE,
            description: "Text has been translated successfully",
            variant: "success",
          });
        }

        return translation;
      } catch (err) {
        if (err.name === "AbortError") {
          return ""; // Translation was cancelled
        }

        const errorMessage = err.message || ERROR_MESSAGES.TRANSLATION_FAILED;
        setError(errorMessage);

        if (options.showToast !== false) {
          toast({
            title: "Translation Failed",
            description: errorMessage,
            variant: "destructive",
          });
        }

        throw err;
      } finally {
        setIsTranslating(false);
        abortControllerRef.current = null;
      }
    },
    [translationCache]
  );

  const translateBatch = useCallback(
    async (texts, options = {}) => {
      const results = [];
      const { showProgress = true } = options;

      for (let i = 0; i < texts.length; i++) {
        if (showProgress) {
          toast({
            title: `Translating ${i + 1}/${texts.length}`,
            description: "Processing batch translation...",
            duration: 1000,
          });
        }

        try {
          const translation = await translateText(texts[i], {
            ...options,
            showToast: false,
          });
          results.push({ original: texts[i], translation, success: true });
        } catch (err) {
          results.push({
            original: texts[i],
            translation: "",
            success: false,
            error: err.message,
          });
        }
      }

      if (showProgress) {
        const successCount = results.filter((r) => r.success).length;
        toast({
          title: "Batch Translation Complete",
          description: `${successCount}/${texts.length} translations completed`,
          variant: successCount === texts.length ? "success" : "warning",
        });
      }

      return results;
    },
    [translateText]
  );

  const cancelTranslation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTranslating(false);
      toast({
        title: "Translation Cancelled",
        description: "Translation process has been stopped",
      });
    }
  }, []);

  const clearCache = useCallback(() => {
    setTranslationCache(new Map());
    toast({
      title: "Translation Cache Cleared",
      description: "All cached translations have been cleared",
    });
  }, []);

  return {
    translateText,
    translateBatch,
    cancelTranslation,
    clearCache,
    isTranslating,
    error,
    cacheSize: translationCache.size,
  };
}

// Hook for managing translation preferences
export function useTranslationPreferences() {
  const [preferences, setPreferences] = useState({
    autoTranslate: false,
    showOriginal: true,
    fontSize: "medium",
    direction: "rtl",
  });

  const updatePreference = useCallback((key, value) => {
    setPreferences((prev) => {
      const newPrefs = { ...prev, [key]: value };
      localStorage.setItem("translationPreferences", JSON.stringify(newPrefs));
      return newPrefs;
    });
  }, []);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("translationPreferences");
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        setPreferences((prev) => ({ ...prev, ...prefs }));
      } catch (err) {
        console.error("Failed to load translation preferences:", err);
      }
    }
  }, []);

  return {
    preferences,
    updatePreference,
  };
}
