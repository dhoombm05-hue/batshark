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
];

const PartnersSection = () => {
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
          <p className="text-muted-foreground text-lg mb-4">موثوق من قبل</p>
          <h2 className="heading-lg">شركاء النجاح</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-center p-6 rounded-2xl bg-card-gradient border border-border hover:border-accent/50 transition-colors group"
            >
              <span className="text-2xl font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                {partner.logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;