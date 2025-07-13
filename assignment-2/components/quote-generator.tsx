'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, RefreshCw, Quote, Plus } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface Quote {
  id: string
  content: string
  author: string
  category: string
  createdAt: string
}

export default function QuoteGenerator() {
  const [category, setCategory] = useState('')
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Form state for adding new quotes
  const [newQuote, setNewQuote] = useState({
    content: '',
    author: '',
    category: ''
  })

  const generateQuotes = async () => {
    setLoading(true)
    try {
      const url = category.trim() 
        ? `/api/quotes?category=${encodeURIComponent(category.trim())}`
        : '/api/quotes?random=true'
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.success) {
        setQuotes(data.quotes)
      } else {
        console.error('Error:', data.error)
      }
    } catch (error) {
      console.error('Error generating quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRandomQuotes = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/quotes?random=true')
      const data = await response.json()
      
      if (data.success) {
        setQuotes(data.quotes)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const addQuote = async () => {
    if (!newQuote.content || !newQuote.author || !newQuote.category) {
      alert('Please fill in all fields')
      return
    }

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuote),
      })

      const data = await response.json()
      
      if (data.success) {
        setNewQuote({ content: '', author: '', category: '' })
        setShowAddForm(false)
        // Refresh quotes list
        await getRandomQuotes()
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error adding quote:', error)
      alert('Failed to add quote')
    }
  }

  // Load random quotes on component mount
  useEffect(() => {
    getRandomQuotes()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Motivational Quote Generator
        </h1>
        <p className="text-muted-foreground">
          Generate inspiring quotes or add your own to the collection
        </p>
      </div>

      {/* Search & Generate Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="w-5 h-5" />
            Find Quotes
          </CardTitle>
          <CardDescription>
            Search by category or get random inspirational quotes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a topic (e.g., success, motivation, life)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateQuotes()}
            />
            <Button onClick={generateQuotes} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={getRandomQuotes}
              disabled={loading}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Get Random Quotes
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Quote Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Quote</CardTitle>
            <CardDescription>
              Contribute your favorite quote to the collection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter the quote content..."
              value={newQuote.content}
              onChange={(e) => setNewQuote({ ...newQuote, content: e.target.value })}
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Author name"
                value={newQuote.author}
                onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
              />
              <Input
                placeholder="Category (e.g., motivation)"
                value={newQuote.category}
                onChange={(e) => setNewQuote({ ...newQuote, category: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addQuote}>Add Quote</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quotes Display */}
      {quotes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            {category ? `Quotes about "${category}"` : 'Random Quotes'}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({quotes.length} found)
            </span>
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <blockquote className="text-lg font-medium leading-relaxed mb-4 italic">
                    "{quote.content}"
                  </blockquote>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span className="font-medium">— {quote.author}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                      {quote.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {quotes.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Quote className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No quotes found</h3>
            <p className="text-muted-foreground mb-4">
              Try searching for a different category or add some quotes to get started
            </p>
            <Button onClick={getRandomQuotes}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Load Some Quotes
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}