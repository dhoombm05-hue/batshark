import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, Target, Heart, ArrowLeft, Monitor, Building2, Trophy } from "lucide-react";
import logo from "@/assets/logo.png";

const AboutUs = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-xl text-foreground mb-6">من نحن</h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                BATSHARK شركة سعودية متخصصة في الشاشات الإعلانية الرقمية وإدارة المشاريع التجارية المتعددة.
                نحن الكيان الرئيسي الذي يجمع تحت مظلته عدة مشاريع مبتكرة ومتنوعة.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                منذ تأسيسنا، ونحن نسعى لتقديم أفضل الخدمات بأعلى معايير الجودة والاحترافية،
                مع التركيز على الابتكار والتطوير المستمر لخدمة عملائنا والمجتمع.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center"
            >
              <div className="w-64 h-64 rounded-3xl bg-card border border-border flex items-center justify-center shadow-card">
                <img src={logo} alt="BATSHARK" className="h-32 w-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Eye,
                title: "الرؤية",
                description: "أن نكون الشركة الرائدة في مجال الشاشات الإعلانية الرقمية وإدارة المشاريع التجارية في المملكة العربية السعودية والمنطقة.",
              },
              {
                icon: Target,
                title: "الرسالة",
                description: "تقديم حلول إعلانية مبتكرة وإدارة مشاريع تجارية متميزة تلبي تطلعات عملائنا وتساهم في تطوير السوق المحلي.",
              },
              {
                icon: Heart,
                title: "القيم",
                description: "الاحترافية، الابتكار، الشفافية، الالتزام بالجودة، وبناء علاقات طويلة الأمد مع عملائنا وشركائنا.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="p-8 rounded-2xl bg-background border border-border text-center hover:shadow-card transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Projects */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">مشاريعنا تحت مظلة BATSHARK</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Monitor, title: "الشاشات الإعلانية", desc: "خدمتنا الرئيسية في الإعلانات الرقمية" },
              { icon: Building2, title: "Umbrix", desc: "مشروع مستقل تابع للشركة" },
              { icon: Trophy, title: "Padel Courts", desc: "ملاعب بادل Portico & Chinese" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
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
            <h2 className="heading-lg mb-6">تريد تعرف أكثر؟</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              تواصل معنا وسنكون سعداء بالإجابة على جميع استفساراتك
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary-foreground text-primary font-semibold hover:opacity-90 transition-all hover:scale-105"
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

export default AboutUs;
