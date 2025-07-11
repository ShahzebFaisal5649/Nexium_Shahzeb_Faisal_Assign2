'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Placeholder for blog summarizer logic
    setTimeout(() => {
      setSummary('This is a placeholder summary. Blog summarizer coming soon!')
      setLoading(false)
    }, 2000)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-12'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              📝 Blog Summarizer
            </h1>
            <p className='text-xl text-gray-600'>
              Assignment 2 - Nexium AI-First Web Development Internship
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <h2 className='text-2xl font-semibold mb-6'>Enter Blog URL</h2>
            
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/blog-post"
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {loading ? 'Processing...' : 'Summarize Blog'}
              </button>
            </form>

            {summary && (
              <div className='mt-8 p-6 bg-gray-50 rounded-lg'>
                <h3 className='font-semibold text-lg mb-3'>Summary</h3>
                <p className='text-gray-700'>{summary}</p>
              </div>
            )}
          </div>

          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h3 className='text-xl font-semibold mb-4'>Project Status</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center space-x-2'>
                <span className='text-green-500'>✅</span>
                <span>Next.js 15 Setup</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-green-500'>✅</span>
                <span>Supabase Config</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-green-500'>✅</span>
                <span>UI Components</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-yellow-500'>🔄</span>
                <span>Database Connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}