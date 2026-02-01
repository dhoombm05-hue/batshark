import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg text-foreground mb-4">تواصل معنا</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            نحن هنا لمساعدتك في تحقيق أهدافك الإعلانية
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Phone */}
          <motion.a
            href="tel:0505050505"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-brown-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6 text-primary-brown" />
            </div>
            <h4 className="font-bold text-foreground mb-1">هاتف</h4>
            <p className="text-muted-foreground text-center" dir="ltr">0505050505</p>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/966505050505"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-brown-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-primary-brown" />
            </div>
            <h4 className="font-bold text-foreground mb-1">واتساب</h4>
            <p className="text-muted-foreground text-center" dir="ltr">0505050505</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:info@batshark.com"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-card transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-brown-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-primary-brown" />
            </div>
            <h4 className="font-bold text-foreground mb-1">ايميل</h4>
            <p className="text-muted-foreground text-center">info@batshark.com</p>
          </motion.a>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center p-6 rounded-2xl bg-background border border-border"
          >
            <div className="w-14 h-14 rounded-full bg-brown-light flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-primary-brown" />
            </div>
            <h4 className="font-bold text-foreground mb-1">ساعات العمل</h4>
            <p className="text-muted-foreground text-center text-sm">السبت - الخميس</p>
            <p className="text-muted-foreground text-center text-sm">9 صباحاً - 10 مساءً</p>
          </motion.div>
        </div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-10 text-muted-foreground"
        >
          <MapPin className="w-5 h-5" />
          <span>الرياض، المملكة العربية السعودية</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
