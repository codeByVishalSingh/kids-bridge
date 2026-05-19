"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

type StatItem = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  duration?: number;
};

const stats: StatItem[] = [
  { value: 500, suffix: "+", label: "Verified Manufacturers", duration: 2.0 },
  { value: 12000, suffix: "+", label: "SKUs Listed", duration: 2.5 },
  { value: 98, suffix: "%", label: "On-Time Delivery Rate", duration: 1.8 },
  { value: 30, suffix: "+", label: "Cities Covered", duration: 1.5 },
  { value: 50, suffix: "Cr+", prefix: "₹", label: "GMV Facilitated", duration: 2.0 },
  { value: 4.9, suffix: "★", label: "Average Seller Rating", duration: 1.8 },
];

function CountUp({ target, suffix, prefix = "", duration = 2.0 }: { target: number; suffix: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isInView = useInView(ref, { once: true });
  const isDecimal = target % 1 !== 0;
  const rounded = useTransform(motionValue, (v) => (isDecimal ? v.toFixed(1) : Math.round(v).toLocaleString()));

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration, ease: "easeOut" });
    }
  }, [isInView, motionValue, target, duration]);

  return (
    <span ref={ref} className="font-mono text-gold" style={{ fontSize: "clamp(48px,7vw,80px)", fontWeight: 700 }}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-navy py-24 w-full overflow-hidden relative">
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: "radial-gradient(ellipse at 30% 50%, #0F887D33, transparent 60%), radial-gradient(ellipse at 70% 50%, #EFB74233, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.15em] text-teal font-bold mb-4"
          >
            KidsBridge By the Numbers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl text-white"
          >
            Trusted at Scale
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center px-6 relative"
            >
              {/* Vertical divider */}
              {i % 3 !== 2 && (
                <div className="absolute right-0 top-1/4 h-1/2 w-px bg-white/10 hidden md:block" />
              )}
              <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} duration={stat.duration} />
              <span className="text-[13px] text-white/55 uppercase tracking-[0.1em] mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
