import { motion } from "framer-motion";
import heroImage from "@/assets/hero-screens-light.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-24">
      {/* Decorative gradient circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent-soft text-sm font-medium text-foreground">
                🚀 مستقبل الإعلانات الرقمية
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="heading-xl mb-6"
            >
              اجعل علامتك التجارية
              <span className="block text-gradient">تتألق على الشاشات</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10"
            >
              شبكة من الشاشات الإعلانية الذكية في المطاعم والمولات والمحلات التجارية
              لضمان وصول رسالتك لأكبر عدد من الجمهور المستهدف
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-accent-gradient text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                ابدأ الآن
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border-2 border-border text-foreground font-medium text-lg hover:bg-secondary transition-all hover:scale-105"
              >
                اعرف المزيد
              </a>
            </motion.div>

            {/* Stats mini */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              <div>
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-muted-foreground text-sm">شاشة</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">50+</div>
                <div className="text-muted-foreground text-sm">مدينة</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">10M+</div>
                <div className="text-muted-foreground text-sm">مشاهدة</div>
              </div>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-xl" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-white/50">
                <img
                  src={heroImage}
                  alt="شاشات BATSHARK الإعلانية في المولات والمطاعم"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -right-4 px-6 py-3 bg-white rounded-2xl shadow-card border border-border"
              >
                <span className="text-2xl font-bold text-gradient">BATSHARK</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
