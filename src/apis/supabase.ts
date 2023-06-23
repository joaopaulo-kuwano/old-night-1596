
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://bzpqxehliskfgqhxgmos.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cHF4ZWhsaXNrZmdxaHhnbW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU4MTgzMTIsImV4cCI6MjAwMTM5NDMxMn0.uor0etBZR4atG1fbCZOQPAEykk32J12nfcDF_m2wy84')
