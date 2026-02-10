
-- Create project_videos table
CREATE TABLE public.project_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project TEXT NOT NULL CHECK (project IN ('umbrix', 'padel')),
  title TEXT NOT NULL,
  video_type TEXT NOT NULL CHECK (video_type IN ('youtube', 'uploaded')),
  youtube_url TEXT,
  storage_path TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

-- Everyone can view videos
CREATE POLICY "Anyone can view project videos"
ON public.project_videos
FOR SELECT
USING (true);

-- Only authenticated or service role can insert/update/delete
CREATE POLICY "Service role can manage videos"
ON public.project_videos
FOR ALL
USING (true)
WITH CHECK (true);

-- Create storage bucket for uploaded videos
INSERT INTO storage.buckets (id, name, public) VALUES ('project-videos', 'project-videos', true);

-- Storage policies
CREATE POLICY "Public can view project videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-videos');

CREATE POLICY "Authenticated can upload project videos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-videos');

CREATE POLICY "Authenticated can delete project videos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-videos');
