
-- Create ad_requests table for advertisement requests
CREATE TABLE public.ad_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  advertiser_name TEXT NOT NULL,
  ad_name TEXT NOT NULL,
  store_link TEXT,
  duration TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ad_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit ad requests
CREATE POLICY "Anyone can submit ad requests"
ON public.ad_requests
FOR INSERT
WITH CHECK (true);
