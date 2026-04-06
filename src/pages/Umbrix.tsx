import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, Shield, Droplets, Sun, Wind, CloudRain, Cat, Car,
  ArrowLeft, Check, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import EditableImage from "@/components/admin/EditableImage";
import EditablePrice from "@/components/admin/EditablePrice";
import umbrixLogoFallback from "@/assets/umbrix-logo.jpg";
import umbrixCarFallback from "@/assets/umbrix-car.jpg";
import ProjectVideos from "@/components/ProjectVideos";

const protections = [
  { icon: Sun, label: "أشعة الشمس" },
  { icon: Cat, label: "القطط" },
  { icon: CloudRain, label: "الأمطار" },
  { icon: Wind, label: "الغبار" },
  { icon: Shield, label: "العواصف" },
];

const specs = [
  {
    title: "هيكل ستانلس ستيل",
    points: ["مقاوم للتآكل — عمر تشغيلي 10 سنوات", "تحمّل يصل إلى 300 كجم"],
  },
  {
    title: "غطاء Oxford 600D",
    points: ["عازل للحرارة ومقاوم للماء 2000mm", "حواف ملحومة حراريًا"],
  },
  {
    title: "نظام هيدروليكي",
    points: ["فتح وإغلاق سلس", "يدوي أو أوتوماتيكي"],
  },
  {
    title: "تثبيت وأمان",
    points: ["ملحقات تثبيت كاملة", "أقفال أمان للاستخدام اليومي"],
  },
];

const Umbrix = () => {
  const [heroImage, setHeroImage] = useState(umbrixCarFallback);
  const [logoImage, setLogoImage] = useState(umbrixLogoFallback);
  const [price, setPrice] = useState(1950);
  const [priceId, setPriceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Load images
      const { data: images } = await supabase
        .from("site_images")
        .select("*")
        .eq("page", "umbrix");
      
      if (images) {
        const hero = images.find(i => i.section === "hero");
        const logo = images.find(i => i.section === "logo");
        if (hero?.image_url) setHeroImage(hero.image_url);
        if (logo?.image_url) setLogoImage(logo.image_url);
      }

      // Load price from site_images (using section "price" to store it)
      const { data: priceData } = await supabase
        .from("site_images")
        .select("*")
        .eq("page", "umbrix")
        .eq("section", "price")
        .maybeSingle();
      
      if (priceData) {
        setPriceId(priceData.id);
        const parsed = Number(priceData.image_url);
        if (!isNaN(parsed)) setPrice(parsed);
      }

      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-umbrix" />
      </section>
    );
  }

  return (
    <>
      {/* Hero with car image */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <EditableImage
            page="umbrix"
            section="hero"
            currentSrc={heroImage}
            alt="Umbrix"
            className="w-full h-full object-cover"
            onUpdated={setHeroImage}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-foreground/90 via-foreground/70 to-foreground/40 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl mr-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-block p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 mb-4">
                <EditableImage
                  page="umbrix"
                  section="logo"
                  currentSrc={logoImage}
                  alt="Umbrix"
                  className="h-20 w-auto rounded-lg"
                  onUpdated={setLogoImage}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-umbrix/40 text-umbrix text-sm font-bold mb-4"
            >
              <Car className="w-4 h-4" />
              حماية ذكية لسيارتك
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black text-primary-foreground tracking-tight leading-tight mb-4"
            >
              <span className="bg-gradient-to-l from-umbrix to-primary-foreground bg-clip-text text-transparent">
                Umbrix
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-primary-foreground/60 text-lg leading-relaxed mb-6 max-w-md"
            >
              حل مبتكر لحماية سيارتك في جميع الظروف، مصمم ليحمي سطح السيارة ويحافظ عليها يوميًا.
              تصميم عملي، سهل الاستخدام، ويمنح سيارتك حماية مستمرة بدون عناء.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-umbrix text-umbrix-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
              >
                اطلب الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/966560340081"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/20 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-all"
              >
                تواصل عبر واتساب
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Protection Benefits */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-foreground mb-3">تحمي سيارتك من</h2>
            <p className="text-muted-foreground text-lg">حماية شاملة لسيارتك على مدار السنة</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {protections.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-umbrix/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-umbrix/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-umbrix" />
                </div>
                <span className="text-sm font-bold text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg text-foreground mb-3">المواصفات</h2>
            <p className="text-muted-foreground">صُممت لتدوم — مواد فاخرة وتقنية متطورة</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <h3 className="text-lg font-bold text-foreground mb-3">{spec.title}</h3>
                <ul className="space-y-2">
                  {spec.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-umbrix flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <ProjectVideos project="umbrix" title="شاهد Umbrix أثناء الاستخدام" accentColor="umbrix" />

      {/* Price CTA */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-umbrix mx-auto mb-4" />
            <h2 className="heading-lg mb-4">السعر</h2>
            <div className="mb-2">
              <EditablePrice
                table="site_images"
                id={priceId || ""}
                field="image_url"
                value={price}
                onUpdated={setPrice}
              >
                <span className="text-6xl md:text-8xl font-black text-umbrix">{price.toLocaleString("en-US")}</span>
                <span className="text-2xl text-primary-foreground/60 mr-2">ريال</span>
              </EditablePrice>
            </div>
            <p className="text-primary-foreground/50 text-lg mb-4">سعر رمزي — حماية كاملة لسيارتك</p>

            <div className="flex flex-col gap-2 max-w-md mx-auto mb-10 text-primary-foreground/60 text-sm">
              <p>📲 للاستفسار والتفاصيل يتم التواصل عبر واتساب</p>
              <p>⚡ حل عملي وسريع التركيب للاستخدام اليومي</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-umbrix text-umbrix-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
              >
                اطلب الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/966560340081"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/20 font-medium hover:bg-primary-foreground/10 transition-all"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Umbrix;
