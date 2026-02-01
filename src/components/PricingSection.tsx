import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, Crown, Building2 } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "أساسي",
    icon: Sparkles,
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
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "pro",
    name: "احترافي",
    icon: Crown,
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
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "enterprise",
    name: "المؤسسات",
    icon: Building2,
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
    gradient: "from-amber-500 to-orange-500",
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
          <span className="inline-block px-4 py-2 rounded-full bg-accent-soft text-sm font-medium text-foreground mb-4">
            💎 باقات مرنة
          </span>
          <h2 className="heading-lg mb-4">اختر الباقة المناسبة لك</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            باقات متنوعة تناسب جميع الأحجام والميزانيات
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl"
                  : "bg-background border border-border hover:shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-full shadow-lg">
                  ⭐ الأكثر شعبية
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                plan.popular ? "bg-white/20" : `bg-gradient-to-br ${plan.gradient}`
              }`}>
                <plan.icon className={`w-7 h-7 ${plan.popular ? "text-white" : "text-white"}`} />
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-white/80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className={plan.popular ? "text-white/70" : "text-muted-foreground"}>
                    ر.س / {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? "bg-white/20" : "bg-green-100"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-white" : "text-green-600"}`} />
                    </div>
                    <span className={plan.popular ? "text-white/90" : "text-foreground"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105 ${
                  plan.popular
                    ? "bg-white text-purple-600 hover:bg-white/90"
                    : "bg-accent-gradient text-white shadow-lg"
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
