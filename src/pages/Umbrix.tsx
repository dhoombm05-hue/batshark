import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, Shield, Droplets, Sun, Wind, CloudRain, Bug, Car,
  ArrowLeft, Check
} from "lucide-react";
import umbrixLogo from "@/assets/umbrix-logo.jpg";
import umbrixCar from "@/assets/umbrix-car.jpg";

const protections = [
  { icon: Sun, label: "الشمس" },
  { icon: Droplets, label: "الحر" },
  { icon: Shield, label: "البرد" },
  { icon: CloudRain, label: "المطر" },
  { icon: Wind, label: "الغبار" },
  { icon: Bug, label: "فضلات الطيور" },
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
  return (
    <>
      {/* Hero with car image */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={umbrixCar} alt="Umbrix" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-foreground/90 via-foreground/70 to-foreground/40" />
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
                <img src={umbrixLogo} alt="Umbrix" className="h-20 w-auto rounded-lg" />
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
              أفضل حل مبتكر لحماية سيارتك. لا غسيل للسيارة بعد اليوم.
              حماية كاملة، تصميم ذكي، وسهولة استخدام.
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
            <h2 className="heading-lg text-foreground mb-3">تحميها من</h2>
            <p className="text-muted-foreground text-lg">حماية شاملة لسيارتك على مدار السنة</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
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

      {/* Specs — Compact */}
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
              <span className="text-6xl md:text-8xl font-black text-umbrix">1,950</span>
              <span className="text-2xl text-primary-foreground/60 mr-2">ريال</span>
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
