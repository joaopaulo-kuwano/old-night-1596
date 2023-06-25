
import { createClient } from '@supabase/supabase-js'
import { Database } from './schemats'

const url = "https://bzpqxehliskfgqhxgmos.supabase.co"
const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." 
  + "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cHF4ZWhsaXNrZ"
  + "mdxaHhnbW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU4MTg"
  + "zMTIsImV4cCI6MjAwMTM5NDMxMn0.uor0etBZR4atG1fbCZOQPA"
  + "Eykk32J12nfcDF_m2wy84"

export const supabase = createClient<Database>(url, anon)
