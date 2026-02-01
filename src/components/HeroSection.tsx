import { motion } from "framer-motion";
import sharkBatImage from "@/assets/shark-bat-illustration.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${sharkBatImage})` }}
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-xl text-foreground mb-6"
          >
            اجعل علامتك التجارية
            <span className="block mt-2">تتألق على الشاشات</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            شبكة من الشاشات الإعلانية الذكية في المطاعم والمولات والمحلات التجارية
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-105"
            >
              ابدأ الآن
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent text-foreground font-medium text-lg border-2 border-border hover:bg-muted transition-all hover:scale-105"
            >
              اعرف المزيد
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
