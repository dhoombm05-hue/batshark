
-- Create padel_courts table
CREATE TABLE public.padel_courts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin text NOT NULL,
  court_id text NOT NULL,
  name text NOT NULL,
  tag text NOT NULL,
  price numeric NOT NULL,
  usage_type text NOT NULL,
  dimensions text NOT NULL DEFAULT '20m × 10m',
  glass text NOT NULL,
  frame text NOT NULL,
  turf text NOT NULL,
  warranty text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.padel_courts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view courts" ON public.padel_courts FOR SELECT USING (true);

-- Create site_images table
CREATE TABLE public.site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  image_url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(page, section)
);

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view images" ON public.site_images FOR SELECT USING (true);

-- Create business_sections table
CREATE TABLE public.business_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  description_ar text,
  route text NOT NULL,
  is_visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.business_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view sections" ON public.business_sections FOR SELECT USING (true);

-- Seed padel courts data
INSERT INTO public.padel_courts (origin, court_id, name, tag, price, usage_type, dimensions, glass, frame, turf, warranty, sort_order) VALUES
('spanish', 'ace', 'Ace Court', 'الفئة الاقتصادية', 114500, 'تجاري / ترفيهي', '20m × 10m', 'زجاج مقسّى 10mm — عزل صوتي 33dB', 'فولاذ مجلفن S275 JR — أعمدة 80×80mm', 'عشب صناعي 12mm — MONDO / JUTAgrass', '10 سنوات هيكل — 7 سنوات طلاء', 0),
('spanish', 'standard', 'Standard Court', 'الأكثر طلباً', 124000, 'تجاري / احترافي', '20m × 10m', 'زجاج مقسّى 12mm — عزل صوتي 34dB', 'فولاذ مجلفن S275 JR مقاوم للتآكل', 'عشب صناعي إسباني فاخر 12mm', '10 سنوات هيكل — 7 سنوات طلاء', 1),
('spanish', 'panoramic', 'Panoramic Court', 'الفئة الاحترافية', 127500, 'بطولات / احترافي', '20m × 10m', 'زجاج بانورامي مقسّى 12mm — 34dB', 'فولاذ مجلفن S275 JR بتصميم بانورامي', 'عشب صناعي للبطولات 12mm', '10 سنوات هيكل — 7 سنوات طلاء', 2),
('chinese', 'cn-panoramic', 'Panoramic Court', 'تصميم بانورامي', 64500, 'تجاري / احترافي', '20m × 10m', 'زجاج مقوّى عالي الجودة', 'فولاذ مجلفن بالغمس الساخن Q235', 'عشب صناعي عالي الكثافة 8000D-13500D', 'ضمان سنتين شامل', 0),
('chinese', 'cn-super-panoramic', 'Super Panoramic Court', 'أعلى فئة', 62500, 'تجاري / بطولات', '20m × 10m', 'زجاج بانورامي متطور', 'فولاذ مجلفن متقدم SPHC', 'عشب صناعي عالي الأداء 13500D', 'ضمان سنتين شامل', 1);

-- Seed business sections
INSERT INTO public.business_sections (slug, name_ar, name_en, description_ar, route, sort_order) VALUES
('screen-advertising', 'الشاشات الإعلانية', 'Screen Advertising', 'خدمات الإعلان على الشاشات', '/screen-advertising', 0),
('padel-courts', 'ملاعب البادل', 'Padel Courts', 'ملاعب بادل إسبانية وصينية', '/padel-courts', 1),
('umbrix', 'Umbrix', 'Umbrix', 'مشروع أمبركس', '/umbrix', 2);

-- Create storage bucket for site assets
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

CREATE POLICY "Anyone can view site assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Service role can manage site assets" ON storage.objects FOR ALL USING (bucket_id = 'site-assets') WITH CHECK (bucket_id = 'site-assets');
