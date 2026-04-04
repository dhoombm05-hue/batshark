import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy, ArrowLeft, ArrowRight, Check, Ruler, Shield, Layers,
  Sun, Award, ChevronLeft, Package, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import padelHeroFallback from "@/assets/padel-court-hero.jpg";
import ProjectVideos from "@/components/ProjectVideos";

interface Court {
  id: string;
  origin: string;
  court_id: string;
  name: string;
  tag: string;
  price: number;
  usage_type: string;
  dimensions: string;
  glass: string;
  frame: string;
  turf: string;
  warranty: string;
  sort_order: number;
}

const specIcons: Record<string, typeof Ruler> = { dimensions: Ruler, glass: Shield, frame: Layers, turf: Sun, warranty: Award };
const specLabels: Record<string, string> = { dimensions: "الأبعاد", glass: "الزجاج", frame: "الهيكل", turf: "العشب", warranty: "الضمان" };

const PriceCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span>{displayValue.toLocaleString("en-US")}</span>;
};

const PadelCourts = () => {
  const [step, setStep] = useState<"origin" | "courts" | "details">("origin");
  const [origin, setOrigin] = useState<"spanish" | "chinese" | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [heroImage, setHeroImage] = useState<string>(padelHeroFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Load courts from DB
      const { data: courtsData } = await supabase
        .from("padel_courts")
        .select("*")
        .order("origin")
        .order("sort_order");
      if (courtsData) setCourts(courtsData as Court[]);

      // Load hero image
      const { data: imgData } = await supabase
        .from("site_images")
        .select("image_url")
        .eq("page", "padel")
        .eq("section", "hero")
        .maybeSingle();
      if (imgData?.image_url) setHeroImage(imgData.image_url);

      setLoading(false);
    };
    load();
  }, []);

  const filteredCourts = origin ? courts.filter((c) => c.origin === origin) : [];
  const spanishCount = courts.filter((c) => c.origin === "spanish").length;
  const chineseCount = courts.filter((c) => c.origin === "chinese").length;

  const handleSelectOrigin = (o: "spanish" | "chinese") => { setOrigin(o); setStep("courts"); };
  const handleSelectCourt = (court: Court) => { setSelectedCourt(court); setStep("details"); };
  const handleBack = () => {
    if (step === "details") { setSelectedCourt(null); setStep("courts"); }
    else if (step === "courts") { setOrigin(null); setStep("origin"); }
  };

  const getSpecs = (court: Court) => ({
    dimensions: court.dimensions,
    glass: court.glass,
    frame: court.frame,
    turf: court.turf,
    warranty: court.warranty,
  });

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-padel" />
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="ملاعب بادل" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/75" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-padel/40 text-padel text-sm font-bold mb-6">
              <Trophy className="w-4 h-4" />
              Portico Sport — إسبانيا
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary-foreground tracking-tight leading-tight mb-4">ملاعب البادل</h1>
            <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto mb-2">
              ملاعب بادل من أفضل وأقوى شركة في إسبانيا — جودة عالمية، تصميم مستخدم في البطولات، وتجربة لعب تحاكي الملاعب الاحترافية الدولية.
            </p>
            <p className="text-padel text-sm font-bold">اختيارك هنا يعني استثمار ناجح ومعايير لا تُقارن</p>
          </motion.div>
        </div>
      </section>

      {/* Step Content */}
      <section className="py-16 px-6 bg-background min-h-[50vh]">
        <div className="container mx-auto max-w-5xl">
          <AnimatePresence>
            {step !== "origin" && (
              <motion.button
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowRight className="w-4 h-4" /> رجوع
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === "origin" && (
              <motion.div key="origin" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h2 className="heading-md text-foreground text-center mb-4">اختر نوع الملاعب</h2>
                <p className="text-muted-foreground text-center mb-10">ملاعب من أفضل المصادر العالمية — السعر شامل كل شيء</p>
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {([
                    { key: "spanish" as const, flag: "🇪🇸", title: "ملاعب إسبانية", sub: "Spanish Padel Courts", desc: "أعلى معايير الجودة العالمية", count: `${spanishCount} فئات` },
                    { key: "chinese" as const, flag: "🇨🇳", title: "ملاعب صينية", sub: "Chinese Padel Courts", desc: "جودة عالية وأسعار منافسة", count: `${chineseCount} فئات` },
                  ]).map((item) => (
                    <motion.button key={item.key} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOrigin(item.key)}
                      className="group relative p-10 rounded-3xl bg-card border-2 border-border hover:border-padel/40 transition-all text-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-padel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <span className="text-5xl mb-4 block">{item.flag}</span>
                        <h3 className="text-2xl font-black text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm font-bold text-padel mb-1">{item.sub}</p>
                        <p className="text-muted-foreground text-sm mb-4">{item.desc}</p>
                        <div className="inline-flex items-center gap-2 text-sm font-bold text-padel">
                          <span>{item.count} متاحة</span>
                          <ChevronLeft className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === "courts" && origin && (
              <motion.div key="courts" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <div className="text-center mb-10">
                  <span className="text-4xl mb-2 block">{origin === "spanish" ? "🇪🇸" : "🇨🇳"}</span>
                  <h2 className="heading-md text-foreground mb-2">
                    {origin === "spanish" ? "الملاعب الإسبانية" : "الملاعب الصينية"}
                  </h2>
                  <p className="text-muted-foreground">اختر فئة الملعب المناسبة لمشروعك</p>
                </div>
                <div className={`grid gap-6 max-w-4xl mx-auto ${filteredCourts.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {filteredCourts.map((court, index) => (
                    <motion.button key={court.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectCourt(court)}
                      className="group relative p-8 rounded-2xl bg-card border-2 border-border hover:border-padel/40 transition-all text-right overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-padel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-padel/10 text-padel text-xs font-bold mb-4">{court.tag}</span>
                        <h3 className="text-xl font-black text-foreground mb-2">{court.name}</h3>
                        <p className="text-muted-foreground text-sm mb-1">{court.usage_type}</p>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-padel">
                          <span>عرض التفاصيل والسعر</span>
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === "details" && selectedCourt && (
              <motion.div key="details" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-padel/10 text-padel text-sm font-bold mb-3">{selectedCourt.tag}</span>
                    <h2 className="heading-lg text-foreground mb-2">{selectedCourt.name}</h2>
                    <p className="text-muted-foreground">{selectedCourt.usage_type}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {Object.entries(getSpecs(selectedCourt)).map(([key, value], index) => {
                      const IconComp = specIcons[key] || Shield;
                      return (
                        <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="p-5 rounded-2xl bg-card border border-border">
                          <div className="w-10 h-10 rounded-xl bg-padel/10 flex items-center justify-center mb-3">
                            <IconComp className="w-5 h-5 text-padel" />
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{specLabels[key]}</p>
                          <p className="text-sm font-bold text-foreground">{value}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="rounded-3xl bg-foreground text-primary-foreground p-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Package className="w-5 h-5 text-padel" />
                      <span className="text-sm font-bold text-padel">السعر النهائي الشامل</span>
                    </div>
                    <div className="mb-4">
                      <span className="text-5xl md:text-7xl font-black">
                        <PriceCounter value={selectedCourt.price} />
                      </span>
                      <span className="text-xl text-primary-foreground/70 mr-2">ريال</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {["التصنيع", "الشحن", "الجمارك", "التوصيل", "التركيب"].map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full bg-primary-foreground/10 text-xs font-medium">✓ {item}</span>
                      ))}
                    </div>
                    <p className="text-primary-foreground/50 text-sm mb-8">سعر نهائي شامل — بدون أي رسوم مخفية</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-padel text-padel-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105">
                        طلب عرض سعر <ArrowLeft className="w-5 h-5" />
                      </Link>
                      <a href="https://wa.me/966560340081" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/20 font-medium hover:bg-primary-foreground/10 transition-all">
                        تواصل عبر واتساب
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ProjectVideos project="padel" title="شاهد الملاعب على أرض الواقع" accentColor="padel" />
    </>
  );
};

export default PadelCourts;
