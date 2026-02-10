import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Trophy, Sparkles, ArrowLeft, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import heroDark from "@/assets/hero-dark.jpg";
import TeamMembers from "@/components/TeamMembers";

const sections = [
  {
    title: "الشاشات الإعلانية",
    subtitle: "Screen Advertising",
    description: "شاشات رقمية عالية الدقة في مواقع استراتيجية",
    icon: Monitor,
    link: "/screen-advertising",
    color: "digital",
  },
  {
    title: "ملاعب البادل",
    subtitle: "Padel Courts",
    description: "ملاعب إسبانية وصينية بمواصفات عالمية",
    icon: Trophy,
    link: "/padel-courts",
    color: "padel",
  },
  {
    title: "Umbrix",
    subtitle: "حماية ذكية لسيارتك",
    description: "مظلّة متحركة فاخرة بتصميم عصري",
    icon: Sparkles,
    link: "/umbrix",
    color: "umbrix",
  },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroDark} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src={logo} alt="BATSHARK" className="h-20 md:h-28 w-auto mx-auto invert" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-primary-foreground mb-6"
          >
            حلول ذكية
            <span className="block mt-2 text-primary-foreground/60">تبني المستقبل</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-primary-foreground/50 text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            شركة متخصصة في الحلول الذكية، من الإعلانات الرقمية إلى المشاريع الرياضية والحلول المبتكرة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-primary-foreground text-foreground font-bold text-lg hover:scale-105 transition-all"
            >
              اكتشف خدماتنا
              <ChevronDown className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-all"
            >
              تواصل معنا
            </Link>
          </motion.div>
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
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-3">خدماتنا</h2>
            <p className="text-muted-foreground text-lg">اختر القسم الذي يهمك</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <Link
                  to={section.link}
                  className="group relative block p-8 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-elevated hover:-translate-y-2"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <section.icon className="w-7 h-7" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">
                      {section.subtitle}
                    </p>
                    <h3 className="text-xl font-black text-foreground mb-2">{section.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {section.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-300">
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

      {/* Team Members */}
      <TeamMembers />

      {/* Brand Boost */}
      <section className="py-20 px-6 bg-foreground text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={logo} alt="BATSHARK" className="h-12 w-auto mx-auto mb-8 invert" />
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-primary-foreground/80 mb-8">
              شركة متخصصة في الحلول الذكية — من الإعلانات الرقمية
              إلى المشاريع الرياضية والحلول المبتكرة.
              <br />
              نقدم خدمات متكاملة بأعلى معايير الجودة والاحترافية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
