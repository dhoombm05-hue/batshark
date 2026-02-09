import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Star, Shield, Gem, ArrowLeft } from "lucide-react";
import umbrixLogo from "@/assets/umbrix-logo.jpg";

const features = [
  {
    icon: Star,
    title: "جودة استثنائية",
    description: "نلتزم بأعلى معايير الجودة في كل تفاصيل منتجاتنا وخدماتنا",
  },
  {
    icon: Shield,
    title: "موثوقية عالية",
    description: "ثقة عملائنا هي أولويتنا من خلال التزامنا بالمواعيد والجودة",
  },
  {
    icon: Gem,
    title: "تصاميم فاخرة",
    description: "تصاميم مبتكرة تجمع بين الأناقة والعملية بأسلوب عصري",
  },
  {
    icon: Sparkles,
    title: "ابتكار مستمر",
    description: "نسعى دائماً لتقديم حلول جديدة ومبتكرة تلبي تطلعات السوق",
  },
];

const Umbrix = () => {
  return (
    <>
      {/* Hero - Dark Premium */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden bg-foreground text-primary-foreground">
        {/* Subtle gold gradient accents */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[180px]"
          style={{ background: "hsl(var(--umbrix) / 0.15)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[150px]"
          style={{ background: "hsl(var(--umbrix) / 0.1)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ repeat: Infinity, duration: 6 }}
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
            علامة تجارية فاخرة
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
            className="text-primary-foreground/60 text-lg max-w-xl mx-auto mb-10"
          >
            مشروع مستقل تابع لشركة BATSHARK يقدم حلولاً مبتكرة ومتطورة
            بأعلى معايير الجودة والفخامة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-umbrix text-umbrix-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              تواصل معنا
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">لماذا Umbrix؟</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              نتميّز بمعايير استثنائية تجعلنا الخيار الأمثل
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-umbrix/30 hover:shadow-card transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-umbrix/10 flex items-center justify-center mb-5 group-hover:bg-umbrix group-hover:text-umbrix-foreground transition-all duration-300">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon / More Details */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-umbrix/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-umbrix" />
              </div>
              <h2 className="heading-md text-foreground mb-4">المزيد قريباً</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                نعمل على تطوير المزيد من المنتجات والخدمات تحت علامة Umbrix.
                تابعنا لتكون أول من يعرف عن آخر المستجدات.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all hover:scale-105"
              >
                ابقَ على تواصل
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Umbrix;
