import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Monitor, MapPin, Eye, Users } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "شاشة إعلانية", icon: Monitor, color: "from-cyan-400 to-blue-500" },
  { value: 50, suffix: "+", label: "مدينة", icon: MapPin, color: "from-emerald-400 to-teal-500" },
  { value: 10, suffix: "M+", label: "مشاهدة يومية", icon: Eye, color: "from-violet-400 to-purple-500" },
  { value: 200, suffix: "+", label: "عميل راضٍ", icon: Users, color: "from-amber-400 to-orange-500" },
];

const AnimatedCounter = ({ end, suffix, inView }: { end: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2500;
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

const CircularProgress = ({ value, maxValue, inView }: { value: number; maxValue: number; inView: boolean }) => {
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 40;

  useEffect(() => {
    if (!inView) return;
    
    const targetProgress = (value / maxValue) * 100;
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, maxValue, inView]);

  return (
    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-muted/30"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (progress / 100) * circumference}
        className="transition-all duration-[2500ms] ease-out"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(180, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(200, 100%, 60%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            <span className="text-gradient">KPIs</span> تتحدث عن نجاحنا
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            نفخر بالنمو المستمر والثقة التي يمنحنا إياها عملاؤنا
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" 
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
              
              <div className="relative p-6 md:p-8 rounded-3xl bg-card border border-border group-hover:border-primary/30 transition-all duration-500">
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-7 h-7 text-background" />
                </div>

                {/* Animated number */}
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <p className="text-muted-foreground text-base md:text-lg">{stat.label}</p>

                {/* Mini progress bar */}
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 2.5, delay: index * 0.15, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
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
