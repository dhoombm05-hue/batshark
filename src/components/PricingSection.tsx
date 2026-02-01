import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const features = [
  { name: "عدد الشاشات", basic: "1", pro: "5", enterprise: "غير محدود" },
  { name: "ساعات العرض اليومية", basic: "10", pro: "24", enterprise: "24" },
  { name: "الدعم الفني", basic: "أساسي", pro: "على مدار الساعة", enterprise: "مدير حساب مخصص" },
  { name: "التقارير", basic: "شهرية", pro: "أسبوعية", enterprise: "مخصصة" },
  { name: "تصاميم إعلانية", basic: "1", pro: "3", enterprise: "غير محدود" },
  { name: "تحليلات متقدمة", basic: false, pro: true, enterprise: true },
  { name: "أولوية في المواقع", basic: false, pro: true, enterprise: true },
  { name: "API للتكامل", basic: false, pro: false, enterprise: true },
  { name: "عقود مرنة", basic: false, pro: false, enterprise: true },
];

const plans = [
  { id: "basic", name: "أساسي", price: "999", period: "شهرياً", popular: false },
  { id: "pro", name: "احترافي", price: "2,499", period: "شهرياً", popular: true },
  { id: "enterprise", name: "المؤسسات", price: "تواصل معنا", period: "", popular: false },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
      );
    }
    return <span className="text-foreground">{value}</span>;
  };

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

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[700px] border-collapse">
            {/* Header with plans */}
            <thead>
              <tr>
                <th className="p-4 text-right border-b border-border bg-background rounded-tr-2xl">
                  <span className="text-muted-foreground">المميزات</span>
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={plan.id}
                    className={`p-6 text-center border-b border-border relative ${
                      plan.popular 
                        ? "bg-primary/10 border-x border-t border-primary/30" 
                        : "bg-background"
                    } ${index === plans.length - 1 ? "rounded-tl-2xl" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        الأكثر شعبية
                      </div>
                    )}
                    <div className="text-xl font-bold mb-2">{plan.name}</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-3xl font-bold ${plan.popular ? "text-primary" : "text-foreground"}`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground text-sm">ر.س / {plan.period}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Features rows */}
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature.name} className="group">
                  <td className="p-4 text-right border-b border-border bg-background group-hover:bg-muted/30 transition-colors">
                    <span className="text-foreground">{feature.name}</span>
                  </td>
                  <td className="p-4 text-center border-b border-border bg-background group-hover:bg-muted/30 transition-colors">
                    {renderFeatureValue(feature.basic)}
                  </td>
                  <td className={`p-4 text-center border-b border-border border-x border-primary/30 bg-primary/5 group-hover:bg-primary/10 transition-colors`}>
                    {renderFeatureValue(feature.pro)}
                  </td>
                  <td className="p-4 text-center border-b border-border bg-background group-hover:bg-muted/30 transition-colors">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}

              {/* CTA row */}
              <tr>
                <td className="p-4 bg-background rounded-br-2xl"></td>
                {plans.map((plan, index) => (
                  <td
                    key={`cta-${plan.id}`}
                    className={`p-6 text-center ${
                      plan.popular 
                        ? "bg-primary/10 border-x border-b border-primary/30" 
                        : "bg-background"
                    } ${index === plans.length - 1 ? "rounded-bl-2xl" : ""}`}
                  >
                    <button
                      className={`w-full py-3 px-6 rounded-full font-medium transition-all hover:scale-105 ${
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:opacity-90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      اختر الباقة
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
