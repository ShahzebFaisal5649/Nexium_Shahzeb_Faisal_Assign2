import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold'>Blog Summarizer</h1>
      <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p>Project setup complete!</p>
    </div>
  )
}
