import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Monitor, Trophy, Sparkles, ArrowLeft, ChevronDown, Users } from "lucide-react";
import logo from "@/assets/logo.png";
import heroDark from "@/assets/hero-dark.jpg";

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

const teamMembers = [
  "عبدالرحمن بن محبوب",
  "محمد بن محبوب",
  "نايف بن محمد المطيري",
  "فهد بن سلطان المحبوب",
  "سعد بن سلطان المحبوب",
];

const Index = () => {
  const [showTeam, setShowTeam] = useState(false);

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
                  className={`group relative block p-8 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-elevated hover:border-${section.color}/30 hover:-translate-y-2`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${section.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-${section.color}/10 flex items-center justify-center mb-5 group-hover:bg-${section.color} group-hover:text-${section.color}-foreground transition-all duration-300`}>
                      <section.icon className="w-7 h-7" />
                    </div>
                    <p className={`text-xs font-bold tracking-widest uppercase text-${section.color} mb-2`}>
                      {section.subtitle}
                    </p>
                    <h3 className="text-xl font-black text-foreground mb-2">{section.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {section.description}
                    </p>
                    <div className={`inline-flex items-center gap-2 text-sm font-bold text-${section.color} group-hover:gap-3 transition-all duration-300`}>
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
            <button
              onClick={() => setShowTeam(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-foreground/20 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all text-sm font-medium"
            >
              <Users className="w-4 h-4" />
              أعضاء الشركة
            </button>
          </motion.div>
        </div>
      </section>

      {/* Team Modal */}
      {showTeam && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowTeam(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-background rounded-3xl p-8 max-w-md w-full shadow-elevated"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="heading-md text-foreground">أعضاء الشركة</h3>
              <button
                onClick={() => setShowTeam(false)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-foreground">{index + 1}</span>
                  </div>
                  <span className="font-bold text-foreground">{member}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

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
