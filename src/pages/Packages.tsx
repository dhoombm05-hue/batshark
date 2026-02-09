import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Check, Wrench, ArrowLeft, Star } from "lucide-react";

const spanishCourts = [
  {
    name: "Ace Court",
    tag: "الفئة الاقتصادية",
    price: "114,500",
    features: [
      "جودة احترافية بسعر مناسب",
      "مناسب للمشاريع الناشئة",
      "السعر شامل التصنيع والشحن والجمارك والتجهيز",
      "ضمان شامل على الهيكل",
    ],
  },
  {
    name: "Standard Court",
    tag: "الأكثر طلباً",
    price: "124,000",
    popular: true,
    features: [
      "جودة أعلى ومواصفات محسّنة",
      "مناسب للاستخدام التجاري",
      "السعر شامل جميع التكاليف",
      "مواد عالية الجودة ومتانة استثنائية",
    ],
  },
  {
    name: "Panoramic Court",
    tag: "الفئة الاحترافية",
    price: "127,500",
    features: [
      "تصميم بانورامي احترافي",
      "مستخدم في الملاعب المتقدمة والبطولات",
      "السعر شامل جميع التكاليف",
      "أعلى معايير الجودة العالمية",
    ],
  },
];

const chineseCourts = [
  {
    name: "Panoramic Court",
    tag: "تصميم بانورامي",
    price: "64,500",
    features: [
      "تصميم بانورامي بجودة عالية",
      "مناسب للمشاريع التجارية",
      "السعر شامل جميع التكاليف",
      "أداء ممتاز وسعر منافس",
    ],
  },
  {
    name: "Super Panoramic Court",
    tag: "أعلى فئة",
    price: "62,500",
    popular: true,
    features: [
      "تصميم متطور وأعلى فئة",
      "أفضل قيمة مقابل السعر",
      "السعر شامل جميع التكاليف",
      "مواصفات عالمية بأسعار منافسة",
    ],
  },
];

const CourtCard = ({ court, index }: { court: typeof spanishCourts[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`relative rounded-2xl p-8 transition-all hover:shadow-elevated ${
      court.popular
        ? "bg-primary text-primary-foreground shadow-card scale-[1.02]"
        : "bg-card border border-border hover:border-foreground/20"
    }`}
  >
    {court.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background text-primary text-sm font-bold rounded-full border border-border flex items-center gap-1">
        <Star className="w-3 h-3" />
        الأكثر طلباً
      </div>
    )}

    <div className="text-center mb-6">
      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
        court.popular ? "bg-primary-foreground/10" : "bg-muted"
      }`}>
        {court.tag}
      </span>
      <h3 className={`text-2xl font-black mt-4 mb-3 ${court.popular ? "" : "text-foreground"}`}>
        {court.name}
      </h3>
      <div className="mb-1">
        <span className={`text-4xl font-black ${court.popular ? "" : "text-foreground"}`}>
          {court.price}
        </span>
        <span className={`text-sm ${court.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {" "}ريال
        </span>
      </div>
      <p className={`text-xs ${court.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
        شامل جميع التكاليف
      </p>
    </div>

    <ul className="space-y-3 mb-8">
      {court.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${court.popular ? "" : "text-foreground"}`} />
          <span className={`text-sm ${court.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
            {feature}
          </span>
        </li>
      ))}
    </ul>

    <div className="flex flex-col gap-2">
      <Link
        to="/contact"
        className={`block text-center py-3 px-6 rounded-full font-bold transition-all hover:scale-105 ${
          court.popular
            ? "bg-primary-foreground text-primary"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        طلب عرض
      </Link>
      <Link
        to="/contact"
        className={`block text-center py-2.5 px-6 rounded-full font-medium text-sm transition-all ${
          court.popular
            ? "border border-primary-foreground/30 hover:bg-primary-foreground/10"
            : "border border-border hover:bg-muted"
        }`}
      >
        تفاصيل أكثر
      </Link>
    </div>
  </motion.div>
);

const Packages = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-background">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground mb-6">
              <Trophy className="w-4 h-4" />
              ملاعب بادل عالمية
            </div>
            <h1 className="heading-xl text-foreground mb-4">ملاعب البادل</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              نوفر أجود ملاعب البادل بمواصفات عالمية وأسعار شاملة جميع التكاليف من التصنيع حتى التسليم
            </p>
          </motion.div>
        </div>
      </section>

      {/* Spanish Padel Courts */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-bold mb-4">
              🇪🇸 صناعة إسبانية
            </div>
            <h2 className="heading-lg text-foreground mb-3">Spanish Padel Courts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ملاعب إسبانية الصنع بأعلى معايير الجودة العالمية، أسعار شاملة جميع التكاليف
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {spanishCourts.map((court, index) => (
              <CourtCard key={court.name} court={court} index={index} />
            ))}
          </div>

          {/* Installation Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-10"
          >
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-background border border-border">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
                <Wrench className="w-7 h-7 text-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">خيار التركيب</h4>
                <p className="text-muted-foreground text-sm">
                  خدمة التركيب متاحة كخيار إضافي بسعر <span className="font-bold text-foreground">6,000 ريال</span> لكل ملعب
                </p>
              </div>
              <div className="flex flex-col gap-1 text-xs font-medium">
                <span className="px-3 py-1 rounded-full bg-muted text-center">مع تركيب ✓</span>
                <span className="px-3 py-1 rounded-full bg-muted text-center">بدون تركيب</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chinese Padel Courts */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-bold mb-4">
              🇨🇳 جودة عالية
            </div>
            <h2 className="heading-lg text-foreground mb-3">Chinese Padel Courts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              أسعار منافسة مع جودة عالية، شاملة جميع التكاليف من البداية للنهاية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {chineseCourts.map((court, index) => (
              <CourtCard key={court.name} court={court} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">ابدأ مشروعك الآن</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              تواصل معنا للحصول على عرض مفصّل واستشارة مجانية لاختيار الملعب المناسب
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-bold hover:opacity-90 transition-all hover:scale-105"
              >
                طلب عرض سعر
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/966560340081"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary-foreground/30 font-medium hover:bg-primary-foreground/10 transition-all hover:scale-105"
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

export default Packages;
