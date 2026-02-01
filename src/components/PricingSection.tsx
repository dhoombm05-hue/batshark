import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "أساسي",
    price: "50",
    description: "باقة مثالية للشركات الناشئة لعرض إعلاناتهم.",
    features: ["5 شاشات", "منطقة واحدة", "تقارير أساسية", "دعم عبر البريد"],
    popular: false,
  },
  {
    name: "مميز",
    price: "120",
    description: "حلول متكاملة للشركات المتوسطة لزيادة الوعي بالعلامة التجارية.",
    features: ["15 شاشة", "3 مناطق", "تقارير متقدمة", "دعم سريع", "تحليلات الجمهور"],
    popular: true,
  },
  {
    name: "احترافي",
    price: "250",
    description: "خدمات مخصصة للشركات الكبرى لتحقيق أهداف إعلانية طموحة.",
    features: ["50 شاشة", "جميع المناطق", "تقارير مفصلة", "دعم مخصص 24/7", "تحليلات متقدمة", "مدير حساب"],
    popular: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-4">اشتراكات</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر الباقة المناسبة لاحتياجاتك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 transition-all hover:shadow-elevated ${
                plan.popular 
                  ? "bg-primary text-primary-foreground shadow-card" 
                  : "bg-card border border-border hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background text-primary text-sm font-semibold rounded-full border border-border">
                  الأكثر طلباً
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className={`text-4xl font-bold font-display ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "مخصص" && (
                    <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>/شهري</span>
                  )}
                </div>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 px-6 rounded-lg font-medium transition-all hover:scale-105 ${
                  plan.popular
                    ? "bg-background text-primary hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                اختر الباقة
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
