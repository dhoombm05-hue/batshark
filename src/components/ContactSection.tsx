import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

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
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent-soft text-sm font-medium text-foreground mb-4">
            📞 تواصل معنا
          </span>
          <h2 className="heading-lg mb-4">نحن هنا لمساعدتك</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            فريقنا جاهز للإجابة على استفساراتك ومساعدتك في اختيار الحل الأمثل
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Contact Cards - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid gap-4"
          >
            {/* Phone */}
            <a
              href="tel:+966500000000"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-purple-300 hover:shadow-soft transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-0.5">اتصل بنا</p>
                <p className="text-foreground text-lg font-semibold" dir="ltr">+966 50 000 0000</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-green-300 hover:shadow-soft transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-0.5">واتساب</p>
                <p className="text-foreground text-lg font-semibold" dir="ltr">+966 50 000 0000</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@batshark.com"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-purple-300 hover:shadow-soft transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-0.5">البريد الإلكتروني</p>
                <p className="text-foreground text-lg font-semibold">info@batshark.com</p>
              </div>
            </a>
          </motion.div>

          {/* Brand Section - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center lg:text-right"
          >
            <div className="inline-block">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
                
                <div className="relative">
                  <span className="text-5xl md:text-7xl font-black tracking-wider text-gradient">
                    BATSHARK
                  </span>
                  
                  <p className="text-muted-foreground text-xl mt-6">
                    نقود ثورة الإعلانات الرقمية في المملكة
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 justify-center lg:justify-start mt-6 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>المملكة العربية السعودية</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
