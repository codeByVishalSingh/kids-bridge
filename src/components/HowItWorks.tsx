"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    icon: "🏭",
    heading: "Manufacturers Showcase Their Range",
    body: "Verified kidswear factories upload complete catalogues with MOQs, pricing tiers, fabric specs, and season collections.",
  },
  {
    icon: "🔍",
    heading: "Wholesalers Discover & Negotiate",
    body: "Browse 12,000+ SKUs filtered by category, age group, MOQ, and region. Send sample requests and negotiate terms directly.",
  },
  {
    icon: "🚚",
    heading: "We Handle the Bridge Work",
    body: "KidsBridge verifies quality, coordinates logistics, manages escrow payments, and ensures on-time delivery.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active step: 0, 1, or 2 based on scroll position.
  const activeIndex = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 2]);

  return (
    <section ref={containerRef} className="relative bg-navy w-full text-white" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex">
        {/* Left Panel (Sticky) */}
        <div className="w-[40%] h-full flex items-center justify-center border-r border-white/10 relative p-12">
          <div className="w-full max-w-sm">
            <h2 className="font-serif text-4xl mb-12">How KidsBridge Works</h2>
            <div className="relative h-[300px] w-full flex">
              <div className="w-1 h-full bg-white/10 rounded-full overflow-hidden absolute left-0">
                <motion.div
                  className="w-full bg-teal origin-top"
                  style={{ scaleY: scrollYProgress, height: "100%" }}
                />
              </div>
              <div className="ml-8 flex flex-col justify-between h-full py-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4 relative">
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 border-white/20 bg-navy flex items-center justify-center text-xs absolute -left-[45px] z-10"
                      style={{
                        borderColor: useTransform(activeIndex, (val) => Math.round(val) >= i ? "#0F887D" : "rgba(255,255,255,0.2)"),
                        backgroundColor: useTransform(activeIndex, (val) => Math.round(val) >= i ? "#0F887D" : "#0C1C40"),
                      }}
                    >
                      {i + 1}
                    </motion.div>
                    <motion.span
                      className="font-bold text-lg"
                      style={{
                        color: useTransform(activeIndex, (val) => Math.round(val) === i ? "#FFFFFF" : "rgba(255,255,255,0.3)"),
                      }}
                    >
                      Step {i + 1}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel (Scrollable content) */}
        <div className="w-[60%] h-full relative overflow-hidden bg-gradient-to-b from-navy to-navy/95">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 p-20 flex flex-col justify-center"
              style={{
                opacity: useTransform(activeIndex, (val) => {
                  const dist = Math.abs(val - i);
                  return 1 - dist * 1.5; // Fades out as distance from active index increases
                }),
                y: useTransform(activeIndex, (val) => (i - val) * 100),
                pointerEvents: useTransform(activeIndex, (val) => Math.round(val) === i ? "auto" : "none")
              }}
            >
              <div className="text-6xl mb-8 p-4 bg-white/5 inline-flex w-fit rounded-2xl border border-white/10">
                {step.icon}
              </div>
              <h3 className="font-serif text-4xl mb-6 text-white">{step.heading}</h3>
              <p className="font-sans text-xl text-white/60 max-w-lg leading-relaxed">
                {step.body}
              </p>
              
              {/* Fake UI Card Visualization */}
              <div className="mt-12 w-full max-w-lg h-64 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden backdrop-blur-sm">
                <div className="w-1/3 h-4 bg-white/20 rounded animate-pulse" />
                <div className="w-full h-24 bg-white/10 rounded mt-2" />
                <div className="flex gap-4 mt-auto">
                  <div className="w-16 h-8 bg-teal/40 rounded" />
                  <div className="w-16 h-8 bg-gold/40 rounded" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
