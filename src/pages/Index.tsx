import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Trophy, Sparkles, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import heroDark from "@/assets/hero-dark.jpg";

const projects = [
  {
    title: "ملاعب البادل",
    subtitle: "Padel Courts",
    description: "ملاعب إسبانية وصينية بمواصفات عالمية",
    icon: Trophy,
    link: "/padel-courts",
    colorClass: "padel",
  },
  {
    title: "الشاشات الإعلانية",
    subtitle: "Screen Advertising",
    description: "شاشات رقمية عالية الدقة في مواقع استراتيجية",
    icon: Monitor,
    link: "/screen-advertising",
    colorClass: "digital",
  },
  {
    title: "Umbrix",
    subtitle: "حماية ذكية لسيارتك",
    description: "مظلّة متحركة فاخرة بتصميم عصري",
    icon: Sparkles,
    link: "/umbrix",
    colorClass: "umbrix",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string; btnBg: string; btnText: string }> = {
  padel: {
    bg: "bg-padel/5",
    text: "text-padel",
    border: "border-padel/20 hover:border-padel/50",
    iconBg: "bg-padel/10 group-hover:bg-padel",
    btnBg: "bg-padel",
    btnText: "text-padel-foreground",
  },
  digital: {
    bg: "bg-digital/5",
    text: "text-digital",
    border: "border-digital/20 hover:border-digital/50",
    iconBg: "bg-digital/10 group-hover:bg-digital",
    btnBg: "bg-digital",
    btnText: "text-digital-foreground",
  },
  umbrix: {
    bg: "bg-umbrix/5",
    text: "text-umbrix",
    border: "border-umbrix/20 hover:border-umbrix/50",
    iconBg: "bg-umbrix/10 group-hover:bg-umbrix",
    btnBg: "bg-umbrix",
    btnText: "text-umbrix-foreground",
  },
};

const Index = () => {
  return (
    <>
      {/* Hero — compact */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroDark} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <img src={logo} alt="BATSHARK" className="h-16 md:h-24 w-auto mx-auto invert" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-primary-foreground mb-4"
          >
            حلول ذكية
            <span className="block mt-1 text-primary-foreground/60 text-xl md:text-2xl font-bold">
              تبني المستقبل
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-primary-foreground/50 text-base md:text-lg max-w-xl mx-auto"
          >
            شركة متخصصة في الحلول الذكية — من الإعلانات الرقمية إلى المشاريع الرياضية والحلول المبتكرة
          </motion.p>
        </div>
      </section>

      {/* Projects — 3 large cards */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-lg text-foreground mb-2">مشاريعنا</h2>
            <p className="text-muted-foreground">اختر المشروع الذي يهمك</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {projects.map((project, index) => {
              const colors = colorMap[project.colorClass];
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={project.link}
                    className={`group relative block p-8 rounded-2xl ${colors.bg} border ${colors.border} overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-5 group-hover:text-primary-foreground transition-all duration-300`}>
                      <project.icon className="w-7 h-7" />
                    </div>

                    <p className={`text-xs font-bold tracking-widest uppercase ${colors.text} mb-1`}>
                      {project.subtitle}
                    </p>
                    <h3 className="text-xl font-black text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${colors.btnBg} ${colors.btnText} text-sm font-bold group-hover:gap-3 transition-all duration-300`}>
                      <span>الدخول</span>
                      <ArrowLeft className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team — minimal footer-style */}
      <section className="py-12 px-6 bg-card border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm mb-4">الهيئة الإدارية</p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-muted transition-all text-sm"
          >
            استعراض أعضاء الشركة
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Index;
