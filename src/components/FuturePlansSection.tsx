import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock } from "lucide-react";

const plans = [
  {
    title: "التوسع في المناطق الشرقية",
    description: "نعمل على زيادة شبكة الشاشات في المنطقة الشرقية لتغطية أكبر عدد من المولات والمحلات.",
    timeline: "الربع الثاني 2025"
  },
  {
    title: "تطبيق إدارة الحملات",
    description: "إطلاق تطبيق ذكي يمكّنك من إدارة حملاتك الإعلانية ومتابعة الإحصائيات بسهولة.",
    timeline: "الربع الثالث 2025"
  },
  {
    title: "شاشات تفاعلية",
    description: "إضافة شاشات تفاعلية تتيح للجمهور التفاعل مع الإعلانات عبر اللمس وQR codes.",
    timeline: "الربع الرابع 2025"
  },
];

const FuturePlansSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-secondary/50" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-4">خططنا المستقبلية</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            مشاريعنا القادمة لتقديم خدمات أفضل
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-background p-8 rounded-2xl border border-border hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {plan.timeline}
                </span>
              </div>
              
              <h4 className="font-bold text-foreground text-lg mb-3">{plan.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuturePlansSection;
