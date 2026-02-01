import { motion } from "framer-motion";
import heroImage from "@/assets/hero-screen.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Glow effect background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl mb-6"
          >
            مستقبل الإعلانات الرقمية
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-xl mb-8"
          >
            اجعل علامتك التجارية
            <span className="block text-gradient">تتألق على الشاشات</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            شبكة من الشاشات الإعلانية الذكية المنتشرة في أفضل المواقع الاستراتيجية
            لضمان وصول رسالتك لأكبر عدد من الجمهور المستهدف
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-opacity"
            >
              ابدأ الآن
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border text-foreground font-medium text-lg hover:bg-secondary transition-colors"
            >
              اعرف المزيد
            </a>
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-24 relative"
        >
          <div className="relative rounded-2xl overflow-hidden glow-effect">
            <img
              src={heroImage}
              alt="شاشة إعلانية رقمية"
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;