import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Sparkles,
  Globe,
  FileText,
  Clock,
  TrendingUp,
  Share2,
  Copy,
  Download,
  Languages,
  BarChart3,
  BookOpen,
  Zap,
  Star,
  Heart,
  MessageSquare,
  Eye,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Save,
  RefreshCw,
  Mic,
  Volume2,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BlogSummariser = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [activeTab, setActiveTab] = useState("summarize");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isListening, setIsListening] = useState(false);

  // Toast hook
  const useToast = () => ({
    toast: {
      success: (message) => window.alert(`Success: ${message}`),
      error: (message) => window.alert(`Error: ${message}`),
      info: (message) => window.alert(`Info: ${message}`),
      loading: (message) => console.log(`Loading: ${message}`),
    },
  });

  const { toast } = useToast();

  // Enhanced features state
  const [readingProgress, setReadingProgress] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    autoTranslate: true,
    saveHistory: true,
    enableNotifications: true,
  });

  useEffect(() => {
    // Load saved data
    const saved = localStorage.getItem("blog-summaries");
    if (saved) {
      setSavedSummaries(JSON.parse(saved));
    }

    const preferences = localStorage.getItem("user-preferences");
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    }

    const darkMode = localStorage.getItem("dark-mode");
    if (darkMode) {
      setIsDarkMode(JSON.parse(darkMode));
    }
  }, []);

  // Enhanced Urdu translation dictionary
  const urduTranslations = {
    "content marketing": "مواد کی مارکیٹنگ",
    strategy: "حکمت عملی",
    financial: "مالی",
    marketers: "مارکیٹرز",
    institute: "ادارہ",
    states: "بتاتا ہے",
    about: "تقریباً",
    using: "استعمال کر رہے ہیں",
    marketing: "مارکیٹنگ",
    business: "کاروبار",
    technology: "ٹیکنالوجی",
    digital: "ڈیجیٹل",
    online: "آن لائن",
    website: "ویب سائٹ",
    internet: "انٹرنیٹ",
    company: "کمپنی",
    customer: "کسٹمر",
    service: "خدمات",
    product: "پروڈکٹ",
    growth: "ترقی",
    success: "کامیابی",
    important: "اہم",
    "according to": "کے مطابق",
    "research shows": "تحقیق بتاتی ہے",
    approximately: "تقریباً",
  };

  // Enhanced summary generation
  const generateEnhancedSummary = (text) => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 20);

    const importantPatterns = [
      /\d+%|\d+ percent/gi,
      /according to|states that|research shows|study finds/gi,
      /key findings|main points|important|significant/gi,
      /benefits|advantages|solutions|opportunities/gi,
      /trends|growth|increase|decrease/gi,
      /strategy|approach|method|technique/gi,
    ];

    const scoredSentences = sentences.map((sentence) => {
      let score = 0;

      importantPatterns.forEach((pattern) => {
        if (pattern.test(sentence)) score += 2;
      });

      if (/\d/.test(sentence)) score += 1;

      const keywords = [
        "marketing",
        "business",
        "strategy",
        "growth",
        "success",
        "important",
      ];
      keywords.forEach((keyword) => {
        if (sentence.toLowerCase().includes(keyword)) score += 1;
      });

      return { sentence: sentence.trim(), score };
    });

    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.sentence);

    let summary = topSentences.join(". ");
    if (!summary.endsWith(".")) summary += ".";

    return summary;
  };

  // Enhanced Urdu translation
  const translateToUrdu = (text) => {
    let translatedText = text.toLowerCase();

    const sortedTranslations = Object.entries(urduTranslations).sort(
      ([a], [b]) => b.length - a.length
    );

    sortedTranslations.forEach(([english, urdu]) => {
      const regex = new RegExp(
        `\\b${english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "gi"
      );
      translatedText = translatedText.replace(regex, urdu);
    });

    return translatedText
      .replace(/\s+/g, " ")
      .replace(/(\d+)\s*فیصد/g, "$1 فیصد")
      .trim();
  };

  // Voice features
  const speakText = (text, language = "en") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "ur" ? "ur-PK" : "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUrl(transcript);
        setIsListening(false);
        toast.success("Voice input captured successfully!");
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error("Voice recognition failed. Please try again.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      toast.error("Voice recognition not supported in this browser.");
    }
  };

  // Mock article scraping
  const scrapeArticle = async (url) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return `
      Content marketing has become an essential strategy for businesses across all industries. According to the Content Marketing Institute (CMI), approximately 78% of financial marketers are actively using content marketing to reach their target audiences and drive engagement.

      The digital landscape continues to evolve rapidly, with new platforms and technologies emerging regularly. Companies that adapt their content marketing strategies to these changes see significantly better results than those who stick to traditional approaches.

      Research shows that businesses using advanced content marketing techniques experience 30% higher conversion rates compared to basic implementations. Key factors contributing to success include personalized content, data-driven insights, and multi-channel distribution strategies.

      Social media integration plays a crucial role in modern content marketing success. Platforms like LinkedIn, Twitter, and Instagram have become essential channels for B2B marketers, with video content showing particularly strong engagement rates.

      Looking ahead, artificial intelligence and machine learning are expected to revolutionize content creation and distribution. Early adopters of AI-powered content tools are already seeing improved efficiency and better audience targeting capabilities.

      The future of content marketing lies in creating authentic, valuable experiences that resonate with specific audience segments. Successful marketers focus on building long-term relationships rather than pursuing short-term gains.
    `;
  };

  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("برائے کرم ایک URL درج کریں");
      toast.error("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      toast.loading("Processing your blog post...");
      const content = await scrapeArticle(url);
      const englishSummary = generateEnhancedSummary(content);
      const urduSummary = translateToUrdu(englishSummary);

      const keywords = content
        .toLowerCase()
        .match(/\b\w{4,}\b/g)
        ?.filter(
          (word) =>
            ![
              "this",
              "that",
              "with",
              "from",
              "they",
              "have",
              "been",
              "will",
            ].includes(word)
        )
        ?.reduce((acc, word) => {
          acc[word] = (acc[word] || 0) + 1;
          return acc;
        }, {});

      const topKeywords = Object.entries(keywords || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 8)
        .map(([word]) => word);

      const readingTime = Math.ceil(englishSummary.split(" ").length / 200);

      const newSummary = {
        id: Date.now(),
        url,
        englishSummary,
        urduSummary,
        keywords: topKeywords,
        readingTime,
        createdAt: new Date().toLocaleString(),
        wordCount: englishSummary.split(" ").length,
        sentiment: "positive",
        category: "marketing",
        isFavorite: false,
      };

      setSummary(newSummary);
      setSavedSummaries((prev) => {
        const updated = [newSummary, ...prev];
        localStorage.setItem("blog-summaries", JSON.stringify(updated));
        return updated;
      });

      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [url, ...prev.filter((u) => u !== url)].slice(0, 5);
        localStorage.setItem("recent-searches", JSON.stringify(updated));
        return updated;
      });

      toast.success("Blog summarized successfully!");
    } catch (error) {
      setError("خرابی: آرٹیکل لوڈ نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔");
      toast.error("Failed to process the article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  const toggleFavorite = (id) => {
    setSavedSummaries((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
      );
      localStorage.setItem("blog-summaries", JSON.stringify(updated));
      return updated;
    });
    toast.info("Favorite status updated");
  };

  const exportSummary = (format = "txt") => {
    if (!summary) return;

    const content = `
Blog Summary Report
==================
URL: ${summary.url}
Generated: ${summary.createdAt}
Reading Time: ${summary.readingTime} minutes
Word Count: ${summary.wordCount} words

English Summary:
${summary.englishSummary}

Urdu Summary (اردو خلاصہ):
${summary.urduSummary}

Keywords: ${summary.keywords.join(", ")}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-summary-${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(`Summary exported as ${format.toUpperCase()}`);
  };

  const filteredSummaries = savedSummaries.filter((s) => {
    const matchesSearch =
      s.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "favorites" && s.isFavorite) ||
      (selectedFilter === "recent" &&
        new Date(s.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    return matchesSearch && matchesFilter;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("dark-mode", JSON.stringify(!isDarkMode));
    toast.info(`Switched to ${!isDarkMode ? "dark" : "light"} mode`);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"
      }`}
    >
      <Head>
        <title>AI Blog Summariser - Advanced Content Analysis</title>
        <meta
          name="description"
          content="Professional AI-powered blog summarisation with Urdu translation capabilities"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={toggleDarkMode}
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isDarkMode
              ? "bg-yellow-500 hover:bg-yellow-400"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-gray-900" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isDarkMode
              ? "bg-purple-600 hover:bg-purple-500"
              : "bg-blue-600 hover:bg-blue-500"
          } text-white`}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className={`p-4 rounded-2xl shadow-2xl animate-pulse-glow ${
                isDarkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600"
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              }`}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1
              className={`text-6xl font-bold bg-gradient-to-r ${
                isDarkMode
                  ? "from-purple-400 to-pink-400"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              AI Blog Summariser
            </h1>
          </div>

          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Transform lengthy blog posts into concise, intelligent summaries
            with
            <span
              className={`font-semibold ${
                isDarkMode ? "text-purple-400" : "text-purple-600"
              }`}
            >
              {" "}
              AI-powered analysis
            </span>{" "}
            and
            <span
              className={`font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {" "}
              professional Urdu translation
            </span>
          </p>

          {/* Statistics Bar */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-purple-400" : "text-blue-600"
                }`}
              >
                {savedSummaries.length}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Summaries
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-pink-400" : "text-purple-600"
                }`}
              >
                {savedSummaries.reduce((acc, s) => acc + s.wordCount, 0)}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Words Processed
              </div>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-blue-400" : "text-green-600"
                }`}
              >
                {favoriteList.length}
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Favorites
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div
            className={`flex p-2 rounded-2xl shadow-xl ${
              isDarkMode
                ? "bg-gray-800/50 backdrop-blur-xl"
                : "bg-white/50 backdrop-blur-xl"
            }`}
          >
            {[
              { id: "summarize", label: "Summarize", icon: Zap },
              { id: "history", label: "History", icon: Clock },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? isDarkMode
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Summarize Tab */}
          {activeTab === "summarize" && (
            <motion.div
              key="summarize"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Enhanced Input Section */}
              <div
                className={`p-8 rounded-3xl shadow-2xl ${
                  isDarkMode
                    ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                    : "bg-white/30 backdrop-blur-xl border border-white/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Globe
                    className={`w-7 h-7 ${
                      isDarkMode ? "text-purple-400" : "text-blue-500"
                    }`}
                  />
                  <h2 className="text-2xl font-bold">Enter Blog URL</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://example.com/blog-post"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSummarize()}
                      className={`w-full h-16 px-6 pr-32 rounded-2xl text-lg font-medium transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                          : "bg-white/70 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:shadow-xl focus:ring-4 focus:ring-opacity-20 ${
                        isDarkMode
                          ? "focus:ring-purple-500"
                          : "focus:ring-blue-500"
                      }`}
                    />

                    <div className="absolute right-2 top-2 flex gap-2">
                      <motion.button
                        onClick={startVoiceInput}
                        disabled={isListening}
                        className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isListening
                            ? "bg-red-500 text-white"
                            : isDarkMode
                            ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mic className="w-5 h-5" />
                      </motion.button>

                      <motion.button
                        onClick={handleSummarize}
                        disabled={isLoading || !url.trim()}
                        className={`h-12 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                          isLoading || !url.trim()
                            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                            : isDarkMode
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                        } shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Summarize
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Recent:
                      </span>
                      {recentSearches.slice(0, 3).map((recent, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setUrl(recent)}
                          className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {recent.length > 30
                            ? `${recent.substring(0, 30)}...`
                            : recent}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {error && (
                  <motion.div
                    className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">{error}</span>
                  </motion.div>
                )}
              </div>

              {/* Enhanced Results Section */}
              {summary && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-2 gap-8"
                >
                  {/* English Summary Card */}
                  <div
                    className={`p-8 rounded-3xl shadow-2xl ${
                      isDarkMode
                        ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                        : "bg-white/30 backdrop-blur-xl border border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <FileText
                          className={`w-6 h-6 ${
                            isDarkMode ? "text-green-400" : "text-green-500"
                          }`}
                        />
                        <h3 className="text-xl font-bold">English Summary</h3>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() =>
                            copyToClipboard(summary.englishSummary)
                          }
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            speakText(summary.englishSummary, "en")
                          }
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Volume2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => exportSummary("txt")}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => toggleFavorite(summary.id)}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            summary.isFavorite
                              ? "bg-red-500 text-white"
                              : isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              summary.isFavorite ? "fill-current" : ""
                            }`}
                          />
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {summary.readingTime} min read
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {summary.wordCount} words
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {summary.sentiment}
                      </div>
                    </div>

                    <p
                      className={`text-lg leading-relaxed mb-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {summary.englishSummary}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp
                          className={`w-4 h-4 ${
                            isDarkMode ? "text-blue-400" : "text-blue-500"
                          }`}
                        />
                        Key Topics
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {summary.keywords.map((keyword, index) => (
                          <motion.span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isDarkMode
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-blue-100 text-blue-700"
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {keyword}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Urdu Summary Card */}
                  <div
                    className={`p-8 rounded-3xl shadow-2xl ${
                      isDarkMode
                        ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                        : "bg-white/30 backdrop-blur-xl border border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Languages
                          className={`w-6 h-6 ${
                            isDarkMode ? "text-orange-400" : "text-orange-500"
                          }`}
                        />
                        <h3 className="text-xl font-bold">
                          اردو خلاصہ (Urdu Summary)
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => copyToClipboard(summary.urduSummary)}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => speakText(summary.urduSummary, "ur")}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Volume2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            navigator.share &&
                            navigator.share({
                              title: "Blog Summary",
                              text: summary.urduSummary,
                              url: summary.url,
                            })
                          }
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    <p
                      className={`text-lg leading-relaxed mb-6 text-right ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                      dir="rtl"
                    >
                      {summary.urduSummary}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`p-4 rounded-xl ${
                          isDarkMode ? "bg-green-500/20" : "bg-green-100"
                        }`}
                      >
                        <div
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Sentiment
                        </div>
                        <div
                          className={`font-semibold ${
                            isDarkMode ? "text-green-400" : "text-green-700"
                          }`}
                        >
                          {summary.sentiment}
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-xl ${
                          isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                        }`}
                      >
                        <div
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Category
                        </div>
                        <div
                          className={`font-semibold ${
                            isDarkMode ? "text-blue-400" : "text-blue-700"
                          }`}
                        >
                          {summary.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Features Showcase */}
              {!summary && (
                <motion.div
                  className="grid md:grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {[
                    {
                      icon: Zap,
                      title: "AI-Powered Analysis",
                      description:
                        "Advanced algorithms extract key insights and main points automatically",
                      color: isDarkMode
                        ? "from-blue-500 to-blue-600"
                        : "from-blue-500 to-blue-600",
                    },
                    {
                      icon: Languages,
                      title: "Dual Language Support",
                      description:
                        "Get summaries in both English and Urdu with intelligent translation",
                      color: isDarkMode
                        ? "from-orange-500 to-orange-600"
                        : "from-orange-500 to-orange-600",
                    },
                    {
                      icon: BookOpen,
                      title: "Smart Insights",
                      description:
                        "Extract keywords, sentiment analysis, and reading time estimates",
                      color: isDarkMode
                        ? "from-purple-500 to-purple-600"
                        : "from-purple-500 to-purple-600",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`p-8 text-center rounded-3xl shadow-2xl ${
                        isDarkMode
                          ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                          : "bg-white/30 backdrop-blur-xl border border-white/20"
                      } hover:shadow-3xl transition-all duration-500`}
                      whileHover={{ y: -10, scale: 1.02 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">
                        {feature.title}
                      </h3>
                      <p
                        className={`${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Search and Filter Bar */}
              <div
                className={`p-6 rounded-3xl shadow-2xl ${
                  isDarkMode
                    ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                    : "bg-white/30 backdrop-blur-xl border border-white/20"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search summaries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full h-12 pl-12 pr-4 rounded-xl transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400"
                          : "bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                  </div>
                  <div className="relative">
                    <Filter
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className={`h-12 pl-12 pr-8 rounded-xl transition-all duration-300 appearance-none ${
                        isDarkMode
                          ? "bg-gray-700/50 border border-gray-600 text-white"
                          : "bg-white/70 border border-gray-200 text-gray-900"
                      }`}
                    >
                      <option value="all">All Summaries</option>
                      <option value="favorites">Favorites</option>
                      <option value="recent">Recent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* History List */}
              {filteredSummaries.length === 0 ? (
                <div
                  className={`p-12 text-center rounded-3xl ${
                    isDarkMode
                      ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                      : "bg-white/30 backdrop-blur-xl border border-white/20"
                  }`}
                >
                  <FileText
                    className={`w-16 h-16 mx-auto mb-4 ${
                      isDarkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  />
                  <p
                    className={`text-xl ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {searchQuery
                      ? "No summaries match your search."
                      : "No summaries yet. Start by summarizing your first blog post!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSummaries.map((savedSummary, index) => (
                    <motion.div
                      key={savedSummary.id}
                      className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700 hover:bg-gray-800/50"
                          : "bg-white/30 backdrop-blur-xl border border-white/20 hover:bg-white/50"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-medium text-sm mb-2 ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            } truncate`}
                          >
                            {savedSummary.url}
                          </h4>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {savedSummary.createdAt}
                          </p>
                        </div>
                        <div className="flex gap-3 ml-4 flex-shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDarkMode
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {savedSummary.wordCount} words
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isDarkMode
                                ? "bg-green-500/20 text-green-400"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {savedSummary.readingTime} min
                          </span>
                          {savedSummary.isFavorite && (
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          )}
                        </div>
                      </div>

                      <p
                        className={`text-sm leading-relaxed mb-4 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {savedSummary.englishSummary.length > 200
                          ? savedSummary.englishSummary.substring(0, 200) +
                            "..."
                          : savedSummary.englishSummary}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                          {savedSummary.keywords
                            .slice(0, 3)
                            .map((keyword, i) => (
                              <span
                                key={i}
                                className={`px-2 py-1 rounded-lg text-xs ${
                                  isDarkMode
                                    ? "bg-gray-700 text-gray-300"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {keyword}
                              </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => {
                              setSummary(savedSummary);
                              setActiveTab("summarize");
                            }}
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() =>
                              copyToClipboard(savedSummary.englishSummary)
                            }
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => toggleFavorite(savedSummary.id)}
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              savedSummary.isFavorite
                                ? "bg-red-500 text-white"
                                : isDarkMode
                                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                : "bg-gray-200 hover:bg-gray-300 text-gray-600"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                savedSummary.isFavorite ? "fill-current" : ""
                              }`}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Summaries",
                    value: savedSummaries.length,
                    icon: FileText,
                    color: isDarkMode ? "text-blue-400" : "text-blue-600",
                    bg: isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                  },
                  {
                    label: "Avg. Reading Time",
                    value: `${
                      savedSummaries.length
                        ? Math.round(
                            savedSummaries.reduce(
                              (acc, s) => acc + s.readingTime,
                              0
                            ) / savedSummaries.length
                          )
                        : 0
                    } min`,
                    icon: Clock,
                    color: isDarkMode ? "text-green-400" : "text-green-600",
                    bg: isDarkMode ? "bg-green-500/20" : "bg-green-100",
                  },
                  {
                    label: "Words Processed",
                    value: savedSummaries
                      .reduce((acc, s) => acc + s.wordCount, 0)
                      .toLocaleString(),
                    icon: BarChart3,
                    color: isDarkMode ? "text-purple-400" : "text-purple-600",
                    bg: isDarkMode ? "bg-purple-500/20" : "bg-purple-100",
                  },
                  {
                    label: "Favorites",
                    value: savedSummaries.filter((s) => s.isFavorite).length,
                    icon: Heart,
                    color: isDarkMode ? "text-red-400" : "text-red-600",
                    bg: isDarkMode ? "bg-red-500/20" : "bg-red-100",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-2xl shadow-xl ${
                      isDarkMode
                        ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                        : "bg-white/30 backdrop-blur-xl border border-white/20"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Keywords Cloud */}
              {savedSummaries.length > 0 && (
                <div
                  className={`p-8 rounded-3xl shadow-2xl ${
                    isDarkMode
                      ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                      : "bg-white/30 backdrop-blur-xl border border-white/20"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <TrendingUp
                      className={`w-6 h-6 ${
                        isDarkMode ? "text-blue-400" : "text-blue-500"
                      }`}
                    />
                    Most Common Keywords
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {Array.from(
                      new Set(savedSummaries.flatMap((s) => s.keywords))
                    )
                      .slice(0, 20)
                      .map((keyword, index) => (
                        <motion.span
                          key={index}
                          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                            isDarkMode
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30"
                              : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200"
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {keyword}
                        </motion.span>
                      ))}
                  </div>
                </div>
              )}

              {/* Usage Chart Placeholder */}
              <div
                className={`p-8 rounded-3xl shadow-2xl ${
                  isDarkMode
                    ? "bg-gray-800/30 backdrop-blur-xl border border-gray-700"
                    : "bg-white/30 backdrop-blur-xl border border-white/20"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BarChart3
                    className={`w-6 h-6 ${
                      isDarkMode ? "text-purple-400" : "text-purple-500"
                    }`}
                  />
                  Usage Analytics
                </h3>
                <div
                  className={`h-48 rounded-xl border-2 border-dashed flex items-center justify-center ${
                    isDarkMode
                      ? "border-gray-600 text-gray-400"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Interactive charts coming soon!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite alternate;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseGlow {
          from {
            box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
              0 0 40px #e60073;
          }
          to {
            box-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
              0 0 50px #ff4da6;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogSummariser;
