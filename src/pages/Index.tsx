import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Trophy, Sparkles, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

const sections = [
  {
    title: "الشاشات الإعلانية",
    subtitle: "Screen Advertising",
    description: "شبكة ضخمة من الشاشات الإعلانية الرقمية في أبرز المواقع الاستراتيجية",
    icon: Monitor,
    link: "/screen-advertising",
    accentClass: "digital",
  },
  {
    title: "ملاعب البادل",
    subtitle: "Padel Courts",
    description: "ملاعب بادل إسبانية وصينية بمواصفات عالمية وأسعار شاملة",
    icon: Trophy,
    link: "/padel-courts",
    accentClass: "padel",
  },
  {
    title: "Umbrix",
    subtitle: "Premium Brand",
    description: "علامة تجارية فاخرة تقدم حلولاً مبتكرة بأعلى معايير الجودة",
    icon: Sparkles,
    link: "/umbrix",
    accentClass: "umbrix",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "48px 48px"
        }} />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src={logo} alt="BATSHARK" className="h-24 md:h-36 w-auto mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="heading-xl text-foreground mb-6"
          >
            نبني المستقبل
            <span className="block mt-2 text-muted-foreground">مشروع تلو الآخر</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-16"
          >
            شركة سعودية متخصصة في الإعلانات الرقمية وإدارة المشاريع التجارية
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Three Section Cards */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-3">اكتشف خدماتنا</h2>
            <p className="text-muted-foreground text-lg">اختر القسم الذي يهمك</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Link
                  to={section.link}
                  className={`group relative block p-10 rounded-3xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-elevated hover:border-${section.accentClass}/30 hover:-translate-y-2`}
                >
                  {/* Accent gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${section.accentClass}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-${section.accentClass}/10 flex items-center justify-center mb-6 group-hover:bg-${section.accentClass} group-hover:text-${section.accentClass}-foreground transition-all duration-300`}>
                      <section.icon className="w-8 h-8" />
                    </div>

                    <p className={`text-xs font-bold tracking-widest uppercase text-${section.accentClass} mb-2`}>
                      {section.subtitle}
                    </p>

                    <h3 className="text-2xl font-black text-foreground mb-3">{section.title}</h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {section.description}
                    </p>

                    <div className={`inline-flex items-center gap-2 text-sm font-bold text-${section.accentClass} group-hover:gap-3 transition-all duration-300`}>
                      <span>اكتشف المزيد</span>
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-24 px-6 bg-card">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg text-foreground mb-4">جاهز تبدأ؟</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
              تواصل معنا واحصل على استشارة مجانية
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-all hover:scale-105"
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

export default Index;
