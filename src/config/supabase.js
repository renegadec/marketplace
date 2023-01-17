import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://vuuzmdtfwzqouojwoauu.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1dXptZHRmd3pxb3VvandvYXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM5NzY3OTQsImV4cCI6MTk4OTU1Mjc5NH0.-qVXEMFg8ey4Yt_RA5XqGL6mN1x6H3Erno5uS9UnWtE'
)