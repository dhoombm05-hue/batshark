import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد خالد",
    role: "مدير تسويق",
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "شراكتنا مع BATSHARK أضاءت أعمالنا وزادت من انتشارنا بشكل كبير."
  },
  {
    name: "فاطمة الزهراء",
    role: "صاحبة عمل",
    image: "https://images.unsplash.com/photo-1591714098656-94a8a95dcf50?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "الحلول الإعلانية التي تقدمها BATSHARK فريدة وتصل لجمهور أوسع."
  },
  {
    name: "يوسف علي",
    role: "رائد أعمال",
    image: "https://images.unsplash.com/photo-1656338997878-279d71d48f6e?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "من خلال شاشات BATSHARK، حققنا نموًا ملحوظًا في المبيعات."
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-4">شركاؤنا</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            آراء عملائنا الذين يثقون بنا
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -right-2 w-8 h-8 text-primary/20" />
                <p className="text-muted-foreground text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-border"
                />
                <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
