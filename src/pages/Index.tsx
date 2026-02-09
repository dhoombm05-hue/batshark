import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, ArrowLeft, Trophy, Briefcase } from "lucide-react";
import logo from "@/assets/logo.png";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src={logo} alt="BATSHARK" className="h-28 md:h-40 w-auto mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="heading-xl text-foreground mb-6"
          >
            اجعل علامتك التجارية
            <span className="block mt-2">تتألق على الشاشات</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            شركة متخصصة في الشاشات الإعلانية الرقمية وإدارة المشاريع التجارية المتعددة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/screen-advertising"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              الشاشات الإعلانية
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent text-foreground font-medium text-lg border-2 border-border hover:bg-muted transition-all hover:scale-105"
            >
              اعرف المزيد
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
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">خدماتنا الأساسية</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              نقدم حلولاً متكاملة في مجال الإعلانات الرقمية وإدارة المشاريع
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Monitor,
                title: "الشاشات الإعلانية",
                description: "شبكة واسعة من الشاشات الإعلانية في المولات والمحلات التجارية",
                link: "/screen-advertising",
              },
              {
                icon: Trophy,
                title: "ملاعب البادل",
                description: "ملاعب بادل إسبانية وصينية بمواصفات عالمية وأسعار شاملة",
                link: "/padel-courts",
              },
              {
                icon: Briefcase,
                title: "إدارة المشاريع",
                description: "إدارة وتطوير مشاريع تجارية متنوعة بأعلى معايير الجودة",
                link: "/projects",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={service.link}
                  className="block p-8 rounded-2xl bg-background border border-border hover:border-foreground/20 hover:shadow-card transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5 group-hover:bg-foreground group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                    <span>اكتشف المزيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <PartnersSection />

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-6">جاهز لتبدأ حملتك الإعلانية؟</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              تواصل معنا اليوم واحصل على استشارة مجانية
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-foreground text-primary font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              تواصل معنا الآن
            </Link>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </>
  );
};

export default Index;
