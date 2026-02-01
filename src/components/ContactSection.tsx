import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="heading-lg mb-6">تواصل معنا</h2>
          <p className="text-muted-foreground text-lg mb-12">
            فريقنا جاهز للإجابة على استفساراتك ومساعدتك في اختيار الحل الأمثل لإعلاناتك
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#25D366] text-white font-medium text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              <span>واتساب</span>
            </a>
            
            <a
              href="tel:+966500000000"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-secondary text-secondary-foreground font-medium text-lg hover:bg-secondary/80 transition-all hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              <span>اتصل بنا</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;