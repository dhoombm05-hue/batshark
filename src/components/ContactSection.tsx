import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(180 100% 50%) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">تواصل معنا</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            فريقنا جاهز للإجابة على استفساراتك ومساعدتك في اختيار الحل الأمثل
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Contact Info - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Phone */}
            <a
              href="tel:+966500000000"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">اتصل بنا</p>
                <p className="text-foreground text-lg font-medium" dir="ltr">+966 50 000 0000</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-[#25D366]/50 transition-all group hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">واتساب</p>
                <p className="text-foreground text-lg font-medium" dir="ltr">+966 50 000 0000</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@batshark.com"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">البريد الإلكتروني</p>
                <p className="text-foreground text-lg font-medium">info@batshark.com</p>
              </div>
            </a>
          </motion.div>

          {/* Logo/Brand - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="relative">
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
              
              {/* Logo */}
              <div className="relative">
                <span className="text-6xl md:text-8xl font-black tracking-wider text-gradient">
                  BATSHARK
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-xl mt-8 max-w-sm">
              نقود ثورة الإعلانات الرقمية في المملكة
            </p>

            {/* Pixel art decoration */}
            <div className="flex gap-2 mt-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  className="w-3 h-3 bg-primary/60 rounded-sm"
                  style={{
                    opacity: 1 - i * 0.15
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
