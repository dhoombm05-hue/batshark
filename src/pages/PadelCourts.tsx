import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy, ArrowLeft, ArrowRight, Check, Ruler, Shield, Layers,
  Sun, Fence, Award, ChevronLeft, Package
} from "lucide-react";

interface Court {
  id: string;
  name: string;
  tag: string;
  price: number;
  usage: string;
  specs: {
    dimensions: string;
    glass: string;
    frame: string;
    turf: string;
    warranty: string;
  };
  features: string[];
}

const courtsData: Record<string, Court[]> = {
  spanish: [
    {
      id: "ace",
      name: "Ace Court",
      tag: "الفئة الاقتصادية",
      price: 114500,
      usage: "تجاري / ترفيهي",
      specs: {
        dimensions: "20m × 10m",
        glass: "زجاج مقسّى 10mm — عزل صوتي 33dB",
        frame: "فولاذ مجلفن S275 JR مع أعمدة 80×80mm",
        turf: "عشب صناعي 12mm — MONDO / JUTAgrass",
        warranty: "10 سنوات هيكل — 7 سنوات طلاء",
      },
      features: [
        "تصميم محسّن للشحن — 6 ملاعب في حاوية واحدة",
        "مناسب للمشاريع الناشئة والأندية",
        "إضاءة LED — 150W أو 320W للمنافسات",
        "طلاء حراري مقاوم بألوان متعددة",
      ],
    },
    {
      id: "standard",
      name: "Standard Court",
      tag: "الأكثر طلباً",
      price: 124000,
      usage: "تجاري / احترافي",
      specs: {
        dimensions: "20m × 10m",
        glass: "زجاج مقسّى 12mm عالي الشفافية — 34dB",
        frame: "فولاذ مجلفن S275 JR مقاوم للتآكل",
        turf: "عشب صناعي إسباني فاخر 12mm",
        warranty: "10 سنوات هيكل — 7 سنوات طلاء",
      },
      features: [
        "جودة أعلى ومواصفات محسّنة",
        "مناسب للاستخدام التجاري المكثف",
        "إضاءة LED احترافية متعددة القوة",
        "أفضل خيار للمشاريع المتوسطة والكبيرة",
      ],
    },
    {
      id: "panoramic",
      name: "Panoramic Court",
      tag: "الفئة الاحترافية",
      price: 127500,
      usage: "بطولات / احترافي",
      specs: {
        dimensions: "20m × 10m",
        glass: "زجاج بانورامي مقسّى 12mm — 34dB",
        frame: "فولاذ مجلفن S275 JR بتصميم بانورامي مدعّم",
        turf: "عشب صناعي للبطولات 12mm — ماركات عالمية",
        warranty: "10 سنوات هيكل — 7 سنوات طلاء",
      },
      features: [
        "تصميم بانورامي زجاجي بالكامل",
        "معتمد للبطولات والمسابقات الدولية",
        "رؤية واضحة من جميع الزوايا للجمهور",
        "3 ملاعب فقط في الحاوية — جودة تصنيع فاخرة",
      ],
    },
  ],
  chinese: [
    {
      id: "cn-panoramic",
      name: "Panoramic Court",
      tag: "تصميم بانورامي",
      price: 64500,
      usage: "تجاري / احترافي",
      specs: {
        dimensions: "20m × 10m",
        glass: "زجاج مقوّى عالي الجودة",
        frame: "فولاذ مجلفن بالغمس الساخن Q235",
        turf: "عشب صناعي عالي الكثافة 8000D-13500D",
        warranty: "ضمان سنتين شامل",
      },
      features: [
        "تصميم بانورامي بجودة عالية",
        "أداء ممتاز وسعر منافس",
        "إطارات شبك فولاذية قوية",
        "مناسب للأندية والمشاريع التجارية",
      ],
    },
    {
      id: "cn-super-panoramic",
      name: "Super Panoramic Court",
      tag: "أعلى فئة",
      price: 62500,
      usage: "تجاري / بطولات",
      specs: {
        dimensions: "20m × 10m",
        glass: "زجاج بانورامي متطور",
        frame: "فولاذ مجلفن متقدم SPHC",
        turf: "عشب صناعي عالي الأداء 13500D",
        warranty: "ضمان سنتين شامل",
      },
      features: [
        "أعلى فئة ضمن الملاعب الصينية",
        "تصميم متطور بمواصفات عالمية",
        "أفضل قيمة مقابل السعر",
        "مناسب للبطولات والاستخدام المكثف",
      ],
    },
  ],
};

const specIcons: Record<string, typeof Ruler> = {
  dimensions: Ruler,
  glass: Shield,
  frame: Layers,
  turf: Sun,
  warranty: Award,
};

const specLabels: Record<string, string> = {
  dimensions: "الأبعاد",
  glass: "الزجاج",
  frame: "الهيكل",
  turf: "العشب",
  warranty: "الضمان",
};

const PriceCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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

  return <span ref={ref}>{displayValue.toLocaleString("en-US")}</span>;
};

const PadelCourts = () => {
  const [step, setStep] = useState<"origin" | "courts" | "details">("origin");
  const [origin, setOrigin] = useState<"spanish" | "chinese" | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);

  const handleSelectOrigin = (o: "spanish" | "chinese") => {
    setOrigin(o);
    setStep("courts");
  };

  const handleSelectCourt = (court: Court) => {
    setSelectedCourt(court);
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details") {
      setSelectedCourt(null);
      setStep("courts");
    } else if (step === "courts") {
      setOrigin(null);
      setStep("origin");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--padel)) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-padel/10 text-padel text-sm font-bold mb-6">
              <Trophy className="w-4 h-4" />
              ملاعب بادل عالمية
            </div>
            <h1 className="heading-xl text-foreground mb-4">ملاعب البادل</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              أجود الملاعب بمواصفات عالمية — السعر شامل كل شيء من الألف إلى الياء
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step Content */}
      <section className="pb-24 px-6 bg-background min-h-[50vh]">
        <div className="container mx-auto max-w-5xl">

          {/* Back button */}
          <AnimatePresence>
            {step !== "origin" && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowRight className="w-4 h-4" />
                رجوع
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Step 1: Origin Selection */}
            {step === "origin" && (
              <motion.div
                key="origin"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="heading-md text-foreground text-center mb-4">اختر نوع الملاعب</h2>
                <p className="text-muted-foreground text-center mb-12">نوفر ملاعب من أفضل المصادر العالمية</p>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectOrigin("spanish")}
                    className="group relative p-10 rounded-3xl bg-card border-2 border-border hover:border-padel/40 transition-all text-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-padel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <span className="text-6xl mb-4 block">🇪🇸</span>
                      <h3 className="text-2xl font-black text-foreground mb-2">ملاعب إسبانية</h3>
                      <p className="text-sm font-bold text-padel mb-2">Spanish Padel Courts</p>
                      <p className="text-muted-foreground text-sm">أعلى معايير الجودة العالمية</p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-padel">
                        <span>3 فئات متاحة</span>
                        <ChevronLeft className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectOrigin("chinese")}
                    className="group relative p-10 rounded-3xl bg-card border-2 border-border hover:border-padel/40 transition-all text-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-padel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <span className="text-6xl mb-4 block">🇨🇳</span>
                      <h3 className="text-2xl font-black text-foreground mb-2">ملاعب صينية</h3>
                      <p className="text-sm font-bold text-padel mb-2">Chinese Padel Courts</p>
                      <p className="text-muted-foreground text-sm">جودة عالية وأسعار منافسة</p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-padel">
                        <span>فئتان متاحتان</span>
                        <ChevronLeft className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Court Selection */}
            {step === "courts" && origin && (
              <motion.div
                key="courts"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <span className="text-4xl mb-3 block">{origin === "spanish" ? "🇪🇸" : "🇨🇳"}</span>
                  <h2 className="heading-md text-foreground mb-2">
                    {origin === "spanish" ? "الملاعب الإسبانية" : "الملاعب الصينية"}
                  </h2>
                  <p className="text-muted-foreground">اختر فئة الملعب المناسبة لمشروعك</p>
                </div>

                <div className={`grid gap-6 max-w-4xl mx-auto ${
                  courtsData[origin].length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
                }`}>
                  {courtsData[origin].map((court, index) => (
                    <motion.button
                      key={court.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectCourt(court)}
                      className="group relative p-8 rounded-2xl bg-card border-2 border-border hover:border-padel/40 transition-all text-right overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-padel/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-padel/10 text-padel text-xs font-bold mb-4">
                          {court.tag}
                        </span>
                        <h3 className="text-xl font-black text-foreground mb-2">{court.name}</h3>
                        <p className="text-muted-foreground text-sm mb-1">{court.usage}</p>
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

            {/* Step 3: Court Details */}
            {step === "details" && selectedCourt && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-4xl mx-auto">
                  {/* Court Header */}
                  <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-padel/10 text-padel text-sm font-bold mb-4">
                      {selectedCourt.tag}
                    </span>
                    <h2 className="heading-lg text-foreground mb-2">{selectedCourt.name}</h2>
                    <p className="text-muted-foreground">{selectedCourt.usage}</p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {Object.entries(selectedCourt.specs).map(([key, value], index) => {
                      const IconComp = specIcons[key] || Shield;
                      return (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className="p-5 rounded-2xl bg-card border border-border"
                        >
                          <div className="w-10 h-10 rounded-xl bg-padel/10 flex items-center justify-center mb-3">
                            <IconComp className="w-5 h-5 text-padel" />
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{specLabels[key]}</p>
                          <p className="text-sm font-bold text-foreground">{value}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Features */}
                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-foreground mb-6">المميزات</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedCourt.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.08 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
                        >
                          <div className="w-6 h-6 rounded-full bg-padel/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-padel" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Price Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="rounded-3xl bg-foreground text-primary-foreground p-10 text-center"
                  >
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

                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {["التصنيع", "الشحن", "الجمارك", "التوصيل", "التركيب"].map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full bg-primary-foreground/10 text-xs font-medium">
                          ✓ {item}
                        </span>
                      ))}
                    </div>

                    <p className="text-primary-foreground/50 text-sm mb-8">
                      سعر نهائي شامل جميع التكاليف — بدون أي رسوم مخفية
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-padel text-padel-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
                      >
                        طلب عرض سعر
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default PadelCourts;
