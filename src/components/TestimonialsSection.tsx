import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor } from "lucide-react";

const testimonials = [
  {
    company: "مطاعم البيك",
    quote: "شراكتنا مع BATSHARK أضاءت أعمالنا وزادت من انتشارنا بشكل كبير."
  },
  {
    company: "مجموعة الفطيم",
    quote: "الحلول الإعلانية التي تقدمها BATSHARK فريدة وتصل لجمهور أوسع."
  },
  {
    company: "شركة المراعي",
    quote: "من خلال شاشات BATSHARK، حققنا نموًا ملحوظًا في المبيعات."
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-4">آراء عملائنا</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ماذا يقول عملاؤنا عن خدماتنا
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-background p-8 rounded-2xl border border-border"
            >
              <div className="mb-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.company}</h4>
                  <p className="text-sm text-muted-foreground">شريك معتمد</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
