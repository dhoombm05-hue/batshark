
-- Add new columns to ad_requests table
ALTER TABLE public.ad_requests
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS brand_name text,
  ADD COLUMN IF NOT EXISTS screen_location text,
  ADD COLUMN IF NOT EXISTS screens_count integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS ad_type text,
  ADD COLUMN IF NOT EXISTS ad_link text;
