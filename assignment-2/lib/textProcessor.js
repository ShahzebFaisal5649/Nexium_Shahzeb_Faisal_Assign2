// lib/textProcessor.js - Enhanced summarization algorithms
export function generateSummary(content, options = {}) {
  const {
    maxLength = 300,
    sentenceCount = 4,
    style = "comprehensive",
  } = options;

  if (!content || content.length < 100) return "";

  // Clean and prepare content
  const cleanContent = content
    .replace(/\s+/g, " ")
    .replace(/[^\w\s.,!?;:()-]/g, "")
    .trim();

  // Split into sentences with better regex
  const sentences = cleanContent
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 300);

  if (sentences.length <= 3) return cleanContent;

  // Enhanced word frequency analysis
  const words = cleanContent.toLowerCase().split(/\s+/);
  const wordFreq = {};
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "can",
    "must",
    "shall",
    "this",
    "that",
    "these",
    "those",
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
  ]);

  // Calculate word frequencies with weights
  words.forEach((word) => {
    const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
    if (cleanWord.length > 3 && !stopWords.has(cleanWord)) {
      // Give higher weight to longer words and technical terms
      const weight = cleanWord.length > 6 ? 2 : 1;
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + weight;
    }
  });

  // Score sentences using multiple factors
  const sentenceScores = sentences.map((sentence, index) => {
    const sentenceWords = sentence.toLowerCase().split(/\s+/);
    let score = 0;
    let wordCount = 0;

    // Word frequency score
    sentenceWords.forEach((word) => {
      const cleanWord = word.replace(/[^\w]/g, "");
      if (cleanWord.length > 3 && !stopWords.has(cleanWord)) {
        score += wordFreq[cleanWord] || 0;
        wordCount++;
      }
    });

    // Normalize by word count
    const frequencyScore = wordCount > 0 ? score / wordCount : 0;

    // Position bonus (first and last sentences often important)
    const positionBonus =
      index < 2 || index >= sentences.length - 2 ? 1.3 : 1.0;

    // Length penalty for very short or very long sentences
    const lengthPenalty =
      sentence.length < 50 || sentence.length > 200 ? 0.8 : 1.0;

    // Keyword bonus for important terms
    const importantKeywords = [
      "important",
      "key",
      "main",
      "primary",
      "crucial",
      "essential",
      "significant",
    ];
    const keywordBonus = importantKeywords.some((keyword) =>
      sentence.toLowerCase().includes(keyword)
    )
      ? 1.2
      : 1.0;

    return {
      sentence: sentence.trim(),
      score: frequencyScore * positionBonus * lengthPenalty * keywordBonus,
      index,
      length: sentence.length,
    };
  });

  // Select best sentences
  const selectedSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, sentenceCount)
    .sort((a, b) => a.index - b.index) // Maintain original order
    .map((item) => item.sentence);

  // Join and format summary
  let summary = selectedSentences.join(" ");

  // Ensure proper ending
  if (!summary.match(/[.!?]$/)) {
    summary += ".";
  }

  // Trim to max length if needed
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength);
    const lastSentenceEnd = summary.lastIndexOf(".");
    if (lastSentenceEnd > maxLength * 0.7) {
      summary = summary.substring(0, lastSentenceEnd + 1);
    } else {
      summary = summary.substring(0, summary.lastIndexOf(" ")) + "...";
    }
  }

  return summary;
}

export function extractKeywords(content, maxKeywords = 8) {
  if (!content) return [];

  const words = content.toLowerCase().split(/\s+/);
  const wordFreq = {};

  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
  ]);

  words.forEach((word) => {
    const cleanWord = word.replace(/[^\w]/g, "").toLowerCase();
    if (cleanWord.length > 4 && !stopWords.has(cleanWord)) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  });

  return Object.entries(wordFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

export function generateBulletSummary(content) {
  const summary = generateSummary(content, { sentenceCount: 5 });
  const sentences = summary.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  return sentences.map((sentence) => `• ${sentence.trim()}`).join("\n");
}

export function calculateReadingTime(content) {
  if (!content) return 0;

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getTextComplexity(content) {
  if (!content) return "Simple";

  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = content.split(/\s+/);
  const avgWordsPerSentence = words.length / sentences.length;
  const avgCharsPerWord = content.replace(/\s/g, "").length / words.length;

  if (avgWordsPerSentence > 20 && avgCharsPerWord > 6) return "Complex";
  if (avgWordsPerSentence > 15 || avgCharsPerWord > 5) return "Moderate";
  return "Simple";
}

export function getTextStatistics(content) {
  if (!content) return null;

  const words = content.split(/\s+/);
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const paragraphs = content
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    characterCount: content.length,
    characterCountNoSpaces: content.replace(/\s/g, "").length,
    averageWordsPerSentence:
      sentences.length > 0 ? Math.round(words.length / sentences.length) : 0,
    readingTime: calculateReadingTime(content),
    complexity: getTextComplexity(content),
  };
}
