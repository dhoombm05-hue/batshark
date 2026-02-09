import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, Shield, Droplets, Cog, ArrowLeft, Check, Wrench, Lock
} from "lucide-react";
import umbrixLogo from "@/assets/umbrix-logo.jpg";

const specs = [
  {
    icon: Shield,
    title: "هيكل ستانلس ستيل",
    points: [
      "مقاوم للتآكل — عمر تشغيلي يصل إلى 10 سنوات",
      "قدرة تحمّل تصل إلى 300 كجم",
      "وزن تقريبي 60 كجم",
    ],
  },
  {
    icon: Droplets,
    title: "غطاء Oxford 600D",
    points: [
      "عازل للحرارة ومقاوم للأوساخ",
      "طبقة فضية مقاومة للماء — 2000mm",
      "حواف ملحومة حراريًا لمنع التسريب",
    ],
  },
  {
    icon: Cog,
    title: "نظام هيدروليكي",
    points: [
      "فتح وإغلاق سلس وسريع",
      "تشغيل يدوي أو أوتوماتيكي",
      "محرك + بطارية + نظام تحكم",
    ],
  },
  {
    icon: Wrench,
    title: "التثبيت والإكسسوارات",
    points: [
      "ملحقات تثبيت كاملة — براغي وقواعد",
      "صفائح تثبيت وأقفال أمان",
      "تصميم ثابت وآمن للاستخدام اليومي",
    ],
  },
];

const Umbrix = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden bg-foreground text-primary-foreground">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[180px]"
          style={{ background: "hsl(var(--umbrix) / 0.15)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block p-6 rounded-3xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm mb-6">
              <img src={umbrixLogo} alt="Umbrix" className="h-32 md:h-44 w-auto rounded-xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-umbrix/30 text-umbrix text-sm font-bold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            مظلّة متحركة فاخرة
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight mb-6"
          >
            <span className="bg-gradient-to-l from-umbrix to-primary-foreground bg-clip-text text-transparent">
              Umbrix
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-primary-foreground/60 text-lg max-w-lg mx-auto mb-10"
          >
            مظلّة متحركة بتصميم عصري وهيكل ستانلس ستيل — حماية وأناقة في كل مكان
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">المواصفات</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              صُممت لتدوم — مواد فاخرة وتقنية متطورة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-umbrix/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-umbrix/10 flex items-center justify-center mb-5 group-hover:bg-umbrix group-hover:text-umbrix-foreground transition-all duration-300">
                  <spec.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{spec.title}</h3>
                <ul className="space-y-2.5">
                  {spec.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
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

      {/* Highlights */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, label: "متانة عالية", sub: "عمر تشغيلي 10 سنوات" },
              { icon: Lock, label: "أقفال أمان", sub: "تثبيت آمن ومستقر" },
              { icon: Cog, label: "تشغيل ذكي", sub: "يدوي أو أوتوماتيكي" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-umbrix/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-umbrix" />
                </div>
                <h4 className="font-bold text-foreground mb-1">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md text-foreground mb-4">مهتم بمظلّة Umbrix؟</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
              تواصل معنا للحصول على عرض سعر مخصص
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all hover:scale-105"
            >
              تواصل معنا
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Umbrix;
