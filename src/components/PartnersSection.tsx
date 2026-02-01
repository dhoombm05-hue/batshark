import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const partnerLogos = [
  { name: "Partner 1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Partner 2", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Partner 3", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Partner 4", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Partner 5", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Partner 6", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-muted/30 overflow-hidden" ref={ref}>
      <div className="container mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">شركاؤنا</h2>
          <p className="text-muted-foreground">نفخر بشراكتنا مع أبرز العلامات التجارية</p>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-16 items-center"
        >
          {[...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 h-12 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
