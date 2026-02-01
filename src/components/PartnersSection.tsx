import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "STC", logo: "STC" },
  { name: "Mobily", logo: "Mobily" },
  { name: "Zain", logo: "Zain" },
  { name: "Aramco", logo: "Aramco" },
  { name: "SABIC", logo: "SABIC" },
  { name: "Almarai", logo: "Almarai" },
  { name: "NEOM", logo: "NEOM" },
  { name: "Red Sea", logo: "Red Sea" },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-card overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-muted-foreground text-lg">موثوق من قبل أكبر الشركات</p>
        </motion.div>
      </div>

      {/* Infinite scrolling partners */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
        
        <div className="flex animate-scroll">
          {/* First set */}
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center px-10 py-6 rounded-2xl bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl font-bold text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                {partner.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
