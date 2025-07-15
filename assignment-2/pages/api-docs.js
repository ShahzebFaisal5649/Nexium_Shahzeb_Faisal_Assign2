// pages/api-docs.js
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Book,
  Key,
  Zap,
  Shield,
  Globe,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  FileText,
  Settings,
  Users,
  AlertCircle,
  Lock,
} from "lucide-react";

export default function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: "POST",
      path: "/api/summarize",
      description: "Generate a summary from a blog URL",
      parameters: [
        {
          name: "url",
          type: "string",
          required: true,
          description: "The blog URL to summarize",
        },
        {
          name: "language",
          type: "string",
          required: false,
          description: "Target language (default: 'en')",
        },
        {
          name: "length",
          type: "string",
          required: false,
          description: "Summary length: 'short', 'medium', 'long'",
        },
      ],
    },
    {
      method: "POST",
      path: "/api/translate",
      description: "Translate text to Urdu",
      parameters: [
        {
          name: "text",
          type: "string",
          required: true,
          description: "Text to translate",
        },
        {
          name: "from",
          type: "string",
          required: false,
          description: "Source language (default: 'en')",
        },
        {
          name: "to",
          type: "string",
          required: false,
          description: "Target language (default: 'ur')",
        },
      ],
    },
    {
      method: "GET",
      path: "/api/keywords",
      description: "Extract keywords from text",
      parameters: [
        {
          name: "text",
          type: "string",
          required: true,
          description: "Text to analyze",
        },
        {
          name: "limit",
          type: "number",
          required: false,
          description: "Number of keywords to return",
        },
      ],
    },
  ];

  const codeExamples = {
    javascript: `// JavaScript Example
const response = await fetch('/api/summarize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/blog-post',
    language: 'en',
    length: 'medium'
  })
});

const data = await response.json();
console.log(data.summary);`,
    python: `# Python Example
import requests

url = "https://blogai.vercel.app/api/summarize"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "url": "https://example.com/blog-post",
    "language": "en",
    "length": "medium"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result["summary"])`,
    curl: `# cURL Example
curl -X POST https://blogai.vercel.app/api/summarize \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "url": "https://example.com/blog-post",
    "language": "en",
    "length": "medium"
  }'`,
  };

  const features = [
    {
      icon: Zap,
      title: "Fast Processing",
      description:
        "Get summaries in under 3 seconds with our optimized pipeline",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and never stored permanently",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Support for 50+ languages with high-quality translations",
    },
    {
      icon: Key,
      title: "Easy Authentication",
      description: "Simple API key authentication for seamless integration",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Book },
    { id: "endpoints", label: "Endpoints", icon: Code },
    { id: "examples", label: "Examples", icon: FileText },
    { id: "authentication", label: "Auth", icon: Key },
  ];

  return (
    <>
      <Head>
        <title>API Documentation - AI Blog Summariser</title>
        <meta
          name="description"
          content="Complete API documentation for the AI Blog Summariser. Learn how to integrate our summarization API into your applications."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                  <Code className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                API Documentation
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Integrate our powerful AI summarization capabilities into your
                applications with our simple and robust RESTful API.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get API Key
                </motion.button>
                <motion.button
                  className="btn-outline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Try Interactive Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="card card-hover text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center mb-12">
                <div className="flex p-2 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {activeTab === "overview" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="card">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Getting Started
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Our API provides powerful text summarization and
                          translation capabilities. All endpoints return JSON
                          responses and support both GET and POST methods.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Base URL
                        </h3>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                          <code className="text-blue-600 dark:text-blue-400">
                            https://blogai.vercel.app/api
                          </code>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Response Format
                        </h3>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                          <pre className="text-sm text-gray-700 dark:text-gray-300">
                            {`{
  "success": true,
  "data": {
    "summary": "Generated summary...",
    "keywords": ["keyword1", "keyword2"],
    "readingTime": 3,
    "wordCount": 150
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                          </pre>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "endpoints" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="space-y-6">
                        {endpoints.map((endpoint, index) => (
                          <div key={index} className="card">
                            <div className="flex items-center gap-3 mb-4">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  endpoint.method === "POST"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {endpoint.method}
                              </span>
                              <code className="text-lg font-mono text-gray-900 dark:text-white">
                                {endpoint.path}
                              </code>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {endpoint.description}
                            </p>

                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                              Parameters:
                            </h4>
                            <div className="space-y-2">
                              {endpoint.parameters.map((param, paramIndex) => (
                                <div
                                  key={paramIndex}
                                  className="flex items-start gap-3 text-sm"
                                >
                                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600 dark:text-blue-400">
                                    {param.name}
                                  </code>
                                  <span className="text-gray-500 dark:text-gray-400">
                                    {param.type}
                                  </span>
                                  {param.required && (
                                    <span className="text-red-500 text-xs">
                                      required
                                    </span>
                                  )}
                                  <span className="text-gray-600 dark:text-gray-300">
                                    {param.description}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "examples" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="space-y-6">
                        {Object.entries(codeExamples).map(([lang, code]) => (
                          <div key={lang} className="card">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                                {lang === "javascript"
                                  ? "JavaScript"
                                  : lang === "python"
                                  ? "Python"
                                  : "cURL"}
                              </h3>
                              <button
                                onClick={() => copyToClipboard(code, lang)}
                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              >
                                {copiedCode === lang ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-500" />
                                )}
                                <span className="text-sm">
                                  {copiedCode === lang ? "Copied!" : "Copy"}
                                </span>
                              </button>
                            </div>
                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-sm text-gray-300">
                                <code>{code}</code>
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "authentication" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="space-y-6">
                        <div className="card">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Authentication
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Our API uses API key authentication. Include your
                            API key in the Authorization header of every request
                            to authenticate your application.
                          </p>

                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                  Keep your API key secure
                                </h4>
                                <p className="text-blue-700 dark:text-blue-300 text-sm">
                                  Never expose your API key in client-side code
                                  or public repositories. Always use environment
                                  variables or secure configuration files.
                                </p>
                              </div>
                            </div>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Getting Your API Key
                          </h3>
                          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                            <li>Sign up for a free account on our platform</li>
                            <li>
                              Navigate to the API Keys section in your dashboard
                            </li>
                            <li>Click "Generate New API Key"</li>
                            <li>Copy and securely store your API key</li>
                          </ol>

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Using Your API Key
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Include your API key in the Authorization header
                            using the Bearer token format:
                          </p>

                          <div className="bg-gray-900 rounded-lg p-4 mb-6">
                            <pre className="text-sm text-gray-300">
                              <code>
                                Authorization: Bearer YOUR_API_KEY_HERE
                              </code>
                            </pre>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            Rate Limits
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Free Tier
                              </h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• 100 requests per hour</li>
                                <li>• 1,000 requests per month</li>
                                <li>• Basic support</li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Pro Tier
                              </h4>
                              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li>• 1,000 requests per hour</li>
                                <li>• 50,000 requests per month</li>
                                <li>• Priority support</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="card">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Error Handling
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            When authentication fails, the API returns a 401
                            Unauthorized status code with an error message:
                          </p>

                          <div className="bg-gray-900 rounded-lg p-4">
                            <pre className="text-sm text-gray-300">
                              {`{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key",
    "details": "Please check your Authorization header"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-8 space-y-6">
                    {/* Quick Links */}
                    <div className="card">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Links
                      </h3>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <Key className="w-4 h-4" />
                          Get API Key
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Dashboard
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          Support
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Status Page
                        </a>
                      </div>
                    </div>

                    {/* API Status */}
                    <div className="card">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        API Status
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          All systems operational
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Last updated: 2 minutes ago
                      </div>
                    </div>

                    {/* Support */}
                    <div className="card">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Need Help?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Can't find what you're looking for? Our support team is
                        here to help.
                      </p>
                      <button className="w-full btn-outline text-sm">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
