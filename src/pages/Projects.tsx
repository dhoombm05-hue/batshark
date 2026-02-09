import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Monitor, Trophy } from "lucide-react";

const Projects = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-foreground mb-4">مشاريعنا</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              BATSHARK هي الكيان الرئيسي الذي يدير ويطور مشاريع تجارية متعددة ومتنوعة
            </p>
          </motion.div>

          {/* Umbrix */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto mb-20"
          >
            <div className="rounded-3xl bg-card border border-border overflow-hidden hover:shadow-elevated transition-all">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 lg:p-14 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground mb-4 w-fit">
                    <Monitor className="w-4 h-4" />
                    مشروع مستقل
                  </div>
                  <h2 className="heading-md text-foreground mb-4">Umbrix</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    مشروع Umbrix هو أحد المشاريع المستقلة التابعة لشركة BATSHARK.
                    يقدم حلولاً مبتكرة ومتطورة في مجاله. سيتم إضافة المزيد من التفاصيل قريباً.
                  </p>
                  <div className="w-full h-48 rounded-xl bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">صور ومحتوى المشروع قريباً</span>
                  </div>
                </div>
                <div className="bg-muted flex items-center justify-center p-14">
                  <div className="text-center">
                    <h3 className="text-6xl font-black text-foreground mb-2">UMBRIX</h3>
                    <p className="text-muted-foreground">قريباً المزيد من التفاصيل</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Padel Courts */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-3xl bg-primary text-primary-foreground overflow-hidden hover:shadow-elevated transition-all">
              <div className="grid lg:grid-cols-2">
                <div className="bg-primary-foreground/5 flex items-center justify-center p-14 order-2 lg:order-1">
                  <div className="text-center">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-primary-foreground/80" />
                    <h3 className="text-4xl font-black mb-2">Padel Courts</h3>
                    <p className="text-primary-foreground/70">Portico & Chinese</p>
                  </div>
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-sm font-medium mb-4 w-fit">
                    <Trophy className="w-4 h-4" />
                    ملاعب بادل
                  </div>
                  <h2 className="heading-md mb-4">Portico & Chinese Padel Courts</h2>
                  <p className="text-primary-foreground/80 leading-relaxed mb-6">
                    مشاريع ملاعب البادل التابعة لشركة BATSHARK. نقدم تجربة رياضية مميزة
                    بأعلى المعايير العالمية في مواقع استراتيجية.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                      <h4 className="font-bold text-lg">Portico</h4>
                      <p className="text-primary-foreground/70 text-sm mt-1">ملعب بادل</p>
                    </div>
                    <div className="bg-primary-foreground/10 rounded-xl p-4 text-center">
                      <h4 className="font-bold text-lg">Chinese</h4>
                      <p className="text-primary-foreground/70 text-sm mt-1">ملعب بادل</p>
                    </div>
                  </div>

                  <div className="w-full h-40 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                    <span className="text-primary-foreground/60 text-sm">صور ومحتوى المشروع قريباً</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-foreground mb-6">مهتم بالتعاون معنا؟</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              نرحب بالشراكات وفرص التعاون مع جميع الجهات
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105"
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

export default Projects;
