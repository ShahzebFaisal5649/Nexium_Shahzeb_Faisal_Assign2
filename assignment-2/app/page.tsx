'use client'

import { useState } from 'react'
import { FormEvent } from 'react'

export default function Home() {
  const [url, setUrl] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [urduTranslation, setUrduTranslation] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'english' | 'urdu'>('english')
  const [showResult, setShowResult] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError('')
    setShowResult(false)
    
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 2000))
      
      setSummary('This is a comprehensive summary of the blog post. The content discusses modern web development trends, focusing on Next.js 15, React server components, and AI integration in modern applications.')
      setUrduTranslation('یہ بلاگ پوسٹ کا جامع خلاصہ ہے۔ اس میں جدید ویب ڈیولپمنٹ کے رجحانات، Next.js 15، React سرور کمپوننٹس، اور جدید ایپلیکیشنز میں AI کے انضمام پر بحث کی گئی ہے۔')
      setShowResult(true)
      
    } catch (err) {
      setError('Failed to process the blog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const isValidUrl = url ? validateUrl(url) : true

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog Summarizer</h1>
                <p className="text-gray-600 font-medium">AI-Powered Content Analysis</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform lengthy blog posts into concise, meaningful summaries with intelligent translation capabilities.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Enter Blog URL</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Post URL
                </label>
                <div className="relative">
                  <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/blog-post"
                    className={`w-full px-4 py-4 border-2 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                      !isValidUrl 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    required
                  />
                  {url && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isValidUrl ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                {!isValidUrl && url && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Please enter a valid URL
                  </p>
                )}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || !url.trim() || !isValidUrl}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Analyze & Summarize
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg border p-8">
              <div className="text-center">
                <div className="flex justify-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <p className="text-gray-600 font-medium mb-4">Analyzing your blog post...</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>🌐 Fetching content from URL</p>
                  <p>⚡ Generating intelligent summary</p>
                  <p>🌍 Translating to Urdu</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {showResult && (summary || urduTranslation) && (
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('english')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === 'english'
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  📖 English Summary
                </button>
                <button
                  onClick={() => setActiveTab('urdu')}
                  className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                    activeTab === 'urdu'
                      ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  🌍 اردو خلاصہ
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'english' && summary && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Summary</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
                  </div>
                )}

                {activeTab === 'urdu' && urduTranslation && (
                  <div dir="rtl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">اردو ترجمہ</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{urduTranslation}</p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Analysis complete
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.open(url, '_blank')}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      🔗 View Original
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(activeTab === 'english' ? summary : urduTranslation)}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      📋 Copy Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600 text-sm">Advanced algorithms extract key insights and create comprehensive summaries.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multilingual Support</h3>
              <p className="text-gray-600 text-sm">Instant translation to Urdu with cultural context and accuracy.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-gray-600 text-sm">Get instant summaries without compromising on quality or detail.</p>
            </div>
          </div>

          {/* Project Status */}
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Development Progress</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-medium">Next.js 15 Setup</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-medium">Supabase Integration</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-medium">Modern UI Design</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-green-500 mr-3">✅</span>
                <span className="font-medium">TypeScript Configuration</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-blue-500 mr-3">🔄</span>
                <span className="font-medium text-blue-700">Web Scraping API</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-blue-500 mr-3">🔄</span>
                <span className="font-medium text-blue-700">AI Summarization</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-blue-500 mr-3">🔄</span>
                <span className="font-medium text-blue-700">Urdu Translation</span>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <span className="text-gray-400 mr-3">⏳</span>
                <span className="font-medium text-gray-500">Database Storage</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Assignment 2 - Nexium Internship</p>
                  <p className="font-semibold text-gray-900">Blog Summarizer Development</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="font-semibold text-blue-600">70% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="font-medium">Built with Next.js 15, Supabase & Tailwind CSS</p>
            <p className="text-sm mt-1">Nexium AI-First Web Development Internship • Assignment 2</p>
          </div>
        </div>
      </footer>
    </div>
  )
}