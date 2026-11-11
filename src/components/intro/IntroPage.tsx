import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import EditableImage from "@/components/admin/EditableImage";

export interface IntroItem { icon: LucideIcon; title: string; text: string }

interface Props {
  page: string;
  fallbackImage: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  accent: "padel" | "digital";
  aboutTitle: string;
  aboutText: string;
  offerings: IntroItem[];
  steps: { title: string; text: string }[];
  values: string[];
}

const IntroPage = (p: Props) => {
  const [hero, setHero] = useState(p.fallbackImage);
  useEffect(() => {
    supabase.from("site_images").select("image_url").eq("page", p.page).eq("section", "hero").maybeSingle()
      .then(({ data }) => data?.image_url && setHero(data.image_url));
  }, [p.page]);
  const a = p.accent === "padel"
    ? { text: "text-padel", bg: "bg-padel", soft: "bg-padel/10", fg: "text-padel-foreground" }
    : { text: "text-digital", bg: "bg-digital", soft: "bg-digital/10", fg: "text-digital-foreground" };

  return (
    <>
      <section className="relative h-[65vh] min-h-[460px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <EditableImage page={p.page} section="hero" currentSrc={hero} alt={p.title} className="w-full h-full object-cover" onUpdated={setHero} />
          <div className="absolute inset-0 bg-foreground/70 pointer-events-none" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs font-bold tracking-[0.3em] uppercase ${a.text} mb-3`}>{p.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-primary-foreground mb-4">{p.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-primary-foreground/70 text-lg max-w-xl">{p.subtitle}</motion.p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-[1fr_2fr] gap-10 items-start">
          <h2 className="heading-lg text-foreground">{p.aboutTitle}</h2>
          <p className="text-muted-foreground text-lg leading-loose">{p.aboutText}</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="heading-lg text-foreground mb-10 text-center">ماذا نقدّم</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {p.offerings.map((o, i) => (
              <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border">
                <div className={`w-12 h-12 rounded-xl ${a.soft} ${a.text} flex items-center justify-center mb-4`}><o.icon className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-foreground mb-2">{o.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{o.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="heading-lg text-foreground mb-10 text-center">كيف نعمل</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {p.steps.map((s, i) => (
              <div key={s.title} className="p-5 rounded-2xl border border-border">
                <span className={`inline-flex w-9 h-9 rounded-full ${a.bg} ${a.fg} items-center justify-center font-black mb-3`}>{i + 1}</span>
                <h3 className="font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {p.values.map((v) => <span key={v} className={`px-4 py-2 rounded-full ${a.soft} ${a.text} text-sm font-bold`}>{v}</span>)}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${a.bg} ${a.fg} font-bold`}>
              تواصل معنا <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default IntroPage;
