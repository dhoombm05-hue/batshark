import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "أساسي",
    price: "50",
    period: "/شهري",
    description: "باقة مثالية للشركات الناشئة",
    features: ["5 شاشات", "منطقة واحدة", "مدة الإعلان: 15 ثانية", "تقارير أساسية", "دعم عبر البريد"],
    popular: false,
  },
  {
    name: "مميز",
    price: "120",
    period: "/شهري",
    description: "حلول متكاملة للشركات المتوسطة",
    features: ["15 شاشة", "3 مناطق", "مدة الإعلان: 30 ثانية", "تقارير متقدمة", "دعم سريع", "تحليلات الجمهور"],
    popular: true,
  },
  {
    name: "احترافي",
    price: "250",
    period: "/شهري",
    description: "خدمات مخصصة للشركات الكبرى",
    features: ["50 شاشة", "جميع المناطق", "مدة الإعلان: 60 ثانية", "تقارير مفصلة", "دعم مخصص 24/7", "تحليلات متقدمة", "مدير حساب خاص"],
    popular: false,
  },
];

const Packages = () => {
  return (
    <>
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-foreground mb-4">الباقات</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              اختر الباقة المناسبة لاحتياجاتك وابدأ حملتك الإعلانية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 transition-all hover:shadow-elevated ${
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-card scale-105"
                    : "bg-card border border-border hover:border-foreground/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background text-primary text-sm font-semibold rounded-full border border-border">
                    الأكثر طلباً
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-3">
                    <span className={`text-5xl font-black ${plan.popular ? "" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "" : "text-foreground"}`} />
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block text-center py-3 px-6 rounded-full font-medium transition-all hover:scale-105 ${
                    plan.popular
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  اطلب الآن
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground">
              تحتاج باقة مخصصة؟{" "}
              <Link to="/contact" className="text-foreground font-semibold underline underline-offset-4">
                تواصل معنا
              </Link>{" "}
              وسنصمم لك الحل المناسب
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Packages;
