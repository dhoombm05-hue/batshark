import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "أساسي",
    price: "999",
    period: "شهرياً",
    description: "مثالي للبدء في عالم الإعلانات الرقمية",
    features: [
      "شاشة واحدة",
      "10 ساعات عرض يومياً",
      "دعم فني أساسي",
      "تقارير شهرية",
      "تصميم إعلان واحد",
    ],
    popular: false,
  },
  {
    name: "احترافي",
    price: "2,499",
    period: "شهرياً",
    description: "الأكثر شعبية للشركات المتوسطة",
    features: [
      "5 شاشات",
      "24 ساعة عرض يومياً",
      "دعم فني على مدار الساعة",
      "تقارير أسبوعية",
      "3 تصاميم إعلانية",
      "تحليلات متقدمة",
      "أولوية في المواقع",
    ],
    popular: true,
  },
  {
    name: "المؤسسات",
    price: "تواصل معنا",
    period: "",
    description: "حلول مخصصة للشركات الكبرى",
    features: [
      "شاشات غير محدودة",
      "عرض حصري",
      "مدير حساب مخصص",
      "تقارير مخصصة",
      "تصاميم غير محدودة",
      "API للتكامل",
      "عقود مرنة",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">باقات الاشتراك</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            اختر الباقة المناسبة لاحتياجاتك وابدأ رحلتك الإعلانية
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-primary text-primary-foreground border-primary glow-effect"
                  : "bg-background border-border hover:border-accent/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  الأكثر شعبية
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      ر.س / {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-accent"}`} />
                    <span className={plan.popular ? "text-primary-foreground/90" : "text-foreground"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-medium text-lg transition-all ${
                  plan.popular
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                اختر الباقة
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;