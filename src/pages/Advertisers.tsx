import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const advertisers = [
  { name: "معلن 1", description: "وصف الإعلان", link: "#" },
  { name: "معلن 2", description: "وصف الإعلان", link: "#" },
  { name: "معلن 3", description: "وصف الإعلان", link: "#" },
  { name: "معلن 4", description: "وصف الإعلان", link: "#" },
  { name: "معلن 5", description: "وصف الإعلان", link: "#" },
  { name: "معلن 6", description: "وصف الإعلان", link: "#" },
];

const Advertisers = () => {
  return (
    <>
      <section className="pt-32 pb-20 px-6 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="heading-xl text-foreground mb-4">المعلنين</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              الإعلانات المعروضة حالياً على شاشاتنا
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advertisers.map((ad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all group"
              >
                <div className="w-full h-40 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <span className="text-muted-foreground text-sm">صورة الإعلان</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{ad.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{ad.description}</p>
                {ad.link !== "#" && (
                  <a
                    href={ad.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:gap-2 transition-all"
                  >
                    زيارة الموقع
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-4">تريد أن يظهر إعلانك هنا؟</p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105"
            >
              تواصل معنا
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Advertisers;
