import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('blog_summaries')
      .select('*')
      .limit(1)

    if (error) {
      console.log('Database error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        message: 'Database connection failed - table might not exist yet'
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful!',
      data: data
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Connection failed',
      details: error
    }, { status: 500 })
  }
}