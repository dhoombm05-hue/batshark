import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Trophy, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import heroDarkFallback from "@/assets/hero-dark.jpg";

const iconMap: Record<string, typeof Trophy> = {
  "padel-courts": Trophy,
  "screen-advertising": Monitor,
  "umbrix": Sparkles,
};

const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string; btnBg: string; btnText: string }> = {
  "padel-courts": {
    bg: "bg-padel/5", text: "text-padel", border: "border-padel/20 hover:border-padel/50",
    iconBg: "bg-padel/10 group-hover:bg-padel", btnBg: "bg-padel", btnText: "text-padel-foreground",
  },
  "screen-advertising": {
    bg: "bg-digital/5", text: "text-digital", border: "border-digital/20 hover:border-digital/50",
    iconBg: "bg-digital/10 group-hover:bg-digital", btnBg: "bg-digital", btnText: "text-digital-foreground",
  },
  "umbrix": {
    bg: "bg-umbrix/5", text: "text-umbrix", border: "border-umbrix/20 hover:border-umbrix/50",
    iconBg: "bg-umbrix/10 group-hover:bg-umbrix", btnBg: "bg-umbrix", btnText: "text-umbrix-foreground",
  },
};

const defaultColors = {
  bg: "bg-primary/5", text: "text-primary", border: "border-primary/20 hover:border-primary/50",
  iconBg: "bg-primary/10 group-hover:bg-primary", btnBg: "bg-primary", btnText: "text-primary-foreground",
};

interface Section {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  route: string;
  is_visible: boolean;
  sort_order: number;
}

const Index = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [heroImage, setHeroImage] = useState(heroDarkFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: secData } = await supabase
        .from("business_sections")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order");
      if (secData) setSections(secData as Section[]);

      const { data: imgData } = await supabase
        .from("site_images")
        .select("image_url")
        .eq("page", "index")
        .eq("section", "hero")
        .maybeSingle();
      if (imgData?.image_url) setHeroImage(imgData.image_url);

      setLoading(false);
    };
    load();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-6">
            <img src={logo} alt="BATSHARK" className="h-16 md:h-24 w-auto mx-auto invert" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-primary-foreground mb-4">
            حلول ذكية
            <span className="block mt-1 text-primary-foreground/60 text-xl md:text-2xl font-bold">تبني المستقبل</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-primary-foreground/50 text-base md:text-lg max-w-xl mx-auto">
            شركة متخصصة في الحلول الذكية — من الإعلانات الرقمية إلى المشاريع الرياضية والحلول المبتكرة
          </motion.p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="heading-lg text-foreground mb-2">مشاريعنا</h2>
            <p className="text-muted-foreground">اختر المشروع الذي يهمك</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
          ) : (
            <div className={`grid gap-5 max-w-5xl mx-auto ${sections.length === 3 ? "md:grid-cols-3" : sections.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-lg"}`}>
              {sections.map((section, index) => {
                const colors = colorMap[section.slug] || defaultColors;
                const Icon = iconMap[section.slug] || Sparkles;
                return (
                  <motion.div key={section.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                    <Link to={section.route} className={`group relative block p-8 rounded-2xl ${colors.bg} border ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1`}>
                      <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-5 group-hover:text-primary-foreground transition-all duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className={`text-xs font-bold tracking-widest uppercase ${colors.text} mb-1`}>{section.name_en}</p>
                      <h3 className="text-xl font-black text-foreground mb-2">{section.name_ar}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">{section.description_ar}</p>
                      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${colors.btnBg} ${colors.btnText} text-sm font-bold group-hover:gap-3 transition-all duration-300`}>
                        <span>الدخول</span>
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Team */}
      <section className="py-12 px-6 bg-card border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-4">الهيئة الإدارية</p>
          <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-all text-sm">
            استعراض أعضاء الشركة
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
