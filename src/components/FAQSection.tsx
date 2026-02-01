import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "ما هي أنواع الشاشات المتاحة؟",
    answer: "نوفر شاشات LED بأحجام مختلفة تناسب جميع الاحتياجات، من الشاشات الصغيرة داخل المحلات إلى الشاشات العملاقة في المولات والأماكن العامة.",
  },
  {
    question: "كيف يمكنني متابعة أداء إعلاني؟",
    answer: "نوفر لوحة تحكم متقدمة تمكنك من متابعة إحصائيات إعلانك في الوقت الفعلي، بما في ذلك عدد مرات العرض والمواقع والأوقات.",
  },
  {
    question: "ما هي مدة الاشتراك الأدنى؟",
    answer: "يمكنك الاشتراك بدءاً من شهر واحد، مع خصومات خاصة للاشتراكات الطويلة من 3 أشهر فأكثر.",
  },
  {
    question: "هل يمكنني تغيير المحتوى الإعلاني؟",
    answer: "نعم، يمكنك تحديث المحتوى الإعلاني في أي وقت من خلال لوحة التحكم أو بالتواصل مع فريقنا.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل جميع طرق الدفع الإلكترونية بما في ذلك البطاقات الائتمانية وApple Pay وSTC Pay والتحويل البنكي.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-foreground mb-4">الأسئلة الشائعة</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            إجابات على أكثر الأسئلة شيوعاً
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-right hover:no-underline py-5">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
