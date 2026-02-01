import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Zap, Target, Shield } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "تقنية متطورة",
    description: "شاشات LED عالية الدقة بأحدث التقنيات العالمية",
  },
  {
    icon: Target,
    title: "مواقع استراتيجية",
    description: "تغطية شاملة في أكثر المواقع حيوية وازدحاماً",
  },
  {
    icon: Zap,
    title: "تحديث فوري",
    description: "إمكانية تحديث المحتوى في الوقت الفعلي عن بُعد",
  },
  {
    icon: Shield,
    title: "موثوقية عالية",
    description: "ضمان تشغيل مستمر مع صيانة دورية احترافية",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-lg mb-6">
              نبذة عنا
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              نحن شركة رائدة في مجال الإعلانات الرقمية، نقدم حلولاً مبتكرة للشاشات الإعلانية
              تجمع بين التقنية المتطورة والمواقع الاستراتيجية لضمان وصول رسالتك الإعلانية
              لأكبر شريحة ممكنة من الجمهور المستهدف.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              منذ تأسيسنا، ونحن نسعى لتقديم أفضل الخدمات الإعلانية بأعلى معايير الجودة،
              مع التركيز على تحقيق أهداف عملائنا وتعزيز حضورهم في السوق.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;