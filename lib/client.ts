import { createBrowserClient } from '@supabase/ssr'

import {
  assertSupabaseBrowserEnv,
  getBrowserSupabaseKey,
  getBrowserSupabaseUrl,
} from '@/lib/supabase-env'

export function createClient() {
  assertSupabaseBrowserEnv()
  return createBrowserClient(
    getBrowserSupabaseUrl(),
    getBrowserSupabaseKey()
  )
}
