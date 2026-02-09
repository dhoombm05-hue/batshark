import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, MapPin, Zap, Shield, BarChart3, Users, ArrowLeft } from "lucide-react";
import screenCorporate from "@/assets/screen-corporate.jpg";
import screenMall from "@/assets/screen-mall.jpg";
import screenOutdoor from "@/assets/screen-outdoor.jpg";

const ScreenAdvertising = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground mb-6">
                <Monitor className="w-4 h-4" />
                خدمتنا الرئيسية
              </div>
              <h1 className="heading-xl text-foreground mb-6">
                الشاشات الإعلانية الرقمية
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                نوفر شبكة واسعة من الشاشات الإعلانية عالية الدقة في أبرز المواقع الاستراتيجية.
                نساعدك في إيصال رسالتك الإعلانية لأكبر شريحة من الجمهور المستهدف بأحدث التقنيات.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/packages"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105"
                >
                  تصفح الباقات
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  to="/advertisers"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-border text-foreground font-medium hover:bg-muted transition-all hover:scale-105"
                >
                  المعلنين الحاليين
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src={screenMall} alt="شاشات المولات" className="rounded-2xl w-full h-48 object-cover shadow-card" />
                  <img src={screenCorporate} alt="شاشات الشركات" className="rounded-2xl w-full h-32 object-cover shadow-soft" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src={screenOutdoor} alt="شاشات خارجية" className="rounded-2xl w-full h-32 object-cover shadow-soft" />
                  <div className="rounded-2xl bg-primary text-primary-foreground p-6 flex flex-col items-center justify-center h-48">
                    <span className="text-4xl font-bold">500+</span>
                    <span className="text-primary-foreground/80 text-sm mt-1">شاشة إعلانية</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Screen Advertising */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">ما هي الشاشات الإعلانية؟</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              الشاشات الإعلانية الرقمية هي وسيلة حديثة ومتطورة لعرض الإعلانات والمحتوى التسويقي
              في الأماكن العامة والتجارية. تتميز بجودة عالية وإمكانية التحديث الفوري عن بُعد،
              مما يجعلها الخيار الأمثل للشركات والعلامات التجارية.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: MapPin, title: "أماكن استراتيجية", description: "شاشاتنا موزعة في المولات والمطاعم والمحلات التجارية ذات الحركة العالية" },
              { icon: Zap, title: "تحديث فوري", description: "إمكانية تحديث المحتوى الإعلاني في الوقت الفعلي من أي مكان عبر لوحة التحكم" },
              { icon: Shield, title: "جودة عالية", description: "شاشات LED بأحدث التقنيات تضمن عرض المحتوى بأفضل جودة ممكنة" },
              { icon: BarChart3, title: "تقارير وتحليلات", description: "تقارير مفصلة عن أداء حملاتك الإعلانية وإحصائيات المشاهدة" },
              { icon: Users, title: "وصول أوسع", description: "تغطية واسعة تضمن وصول إعلانك لأكبر عدد من الجمهور المستهدف" },
              { icon: Monitor, title: "أحجام متنوعة", description: "شاشات بأحجام مختلفة تناسب جميع المساحات والاحتياجات الإعلانية" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-foreground mb-4">آلية الإعلان</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              خطوات بسيطة لبدء حملتك الإعلانية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "اختر الباقة", desc: "اختر الباقة المناسبة لاحتياجاتك وميزانيتك" },
              { step: "02", title: "أرسل المحتوى", desc: "أرسل لنا التصميم الإعلاني أو نصممه لك" },
              { step: "03", title: "نعرض إعلانك", desc: "يتم عرض إعلانك على الشاشات المحددة" },
              { step: "04", title: "تابع النتائج", desc: "تابع أداء حملتك عبر التقارير المفصلة" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
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
            <h2 className="heading-lg mb-6">ابدأ حملتك الإعلانية اليوم</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              تواصل معنا واحصل على استشارة مجانية لاختيار الباقة المناسبة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/packages"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary-foreground text-primary font-semibold hover:opacity-90 transition-all hover:scale-105"
              >
                تصفح الباقات
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-all hover:scale-105"
              >
                تواصل معنا
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ScreenAdvertising;
