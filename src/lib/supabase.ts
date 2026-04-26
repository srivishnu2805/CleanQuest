import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
  console.error("❌ ERROR: NEXT_PUBLIC_SUPABASE_URL is missing or invalid.");
}

// Singletons to prevent connection overhead
let supabaseInstance: SupabaseClient | null = null;
let supabaseAdminInstance: SupabaseClient | null = null;
let supabaseReadInstance: SupabaseClient | null = null;

// Client for use in Browser/Client Components
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? (supabaseInstance ??= createClient(supabaseUrl, supabaseAnonKey))
  : (null as any);

// Client for use in Server Actions/Server Components (bypasses RLS)
export const getSupabaseAdmin = (role: 'read' | 'write' = 'write') => {
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ ERROR: Supabase Admin configuration missing.");
    return {
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error("Missing config") }) }) }),
        insert: () => Promise.resolve({ data: null, error: new Error("Missing config") }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error("Missing config") }) }),
      })
    } as any;
  }

  // CQRS / Database Scaling Pattern: Route to Read Replica if role is 'read'
  if (role === 'read') {
    const readUrl = process.env.NEXT_PUBLIC_SUPABASE_READ_URL || supabaseUrl;
    return (supabaseReadInstance ??= createClient(readUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }));
  }

  return (supabaseAdminInstance ??= createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }));
}
