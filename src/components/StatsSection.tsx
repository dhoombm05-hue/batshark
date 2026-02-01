import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Monitor, MapPin, Eye, Users } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "شاشة إعلانية", icon: Monitor, gradient: "from-blue-500 to-cyan-500" },
  { value: 50, suffix: "+", label: "مدينة", icon: MapPin, gradient: "from-green-500 to-emerald-500" },
  { value: 10, suffix: "M+", label: "مشاهدة يومية", icon: Eye, gradient: "from-purple-500 to-pink-500" },
  { value: 200, suffix: "+", label: "عميل راضٍ", icon: Users, gradient: "from-amber-500 to-orange-500" },
];

const AnimatedCounter = ({ end, suffix, inView }: { end: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, inView]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent-soft text-sm font-medium text-foreground mb-4">
            📊 أرقامنا
          </span>
          <h2 className="heading-lg mb-4">إنجازات تتحدث عن نفسها</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            نفخر بالنمو المستمر والثقة التي يمنحنا إياها عملاؤنا
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 md:p-8 rounded-3xl bg-background border border-border hover:shadow-card transition-all duration-300 text-center">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <p className="text-muted-foreground">{stat.label}</p>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${stat.gradient}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
