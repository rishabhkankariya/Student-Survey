import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Build will use mock client.');
}

// Export real client if keys exist, otherwise a safe mock for build-time static generation
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      }),
      insert: () => Promise.resolve({ error: null })
    })
  };

