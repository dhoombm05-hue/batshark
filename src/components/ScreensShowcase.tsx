import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import screenMall from "@/assets/screen-mall.jpg";
import screenOutdoor from "@/assets/screen-outdoor.jpg";
import screenCorporate from "@/assets/screen-corporate.jpg";

const screens = [
  {
    title: "شاشات المولات",
    description: "شاشات عالية الدقة في أفضل المراكز التجارية",
    image: screenMall,
  },
  {
    title: "شاشات خارجية",
    description: "لافتات LED ضخمة على واجهات المباني الرئيسية",
    image: screenOutdoor,
  },
  {
    title: "شاشات الشركات",
    description: "حلول العرض الداخلي للمؤسسات والشركات",
    image: screenCorporate,
  },
];

const ScreensShowcase = () => {
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
          <h2 className="heading-lg mb-6">أنواع الشاشات</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            نوفر مجموعة متنوعة من الشاشات الإعلانية لتناسب جميع احتياجاتك
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {screens.map((screen, index) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-card-gradient border border-border hover:border-accent/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={screen.image}
                  alt={screen.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">{screen.title}</h3>
                <p className="text-muted-foreground">{screen.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreensShowcase;