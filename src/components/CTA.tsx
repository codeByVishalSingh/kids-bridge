"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ShaderBackground from "./ShaderBackground";

function MagneticButton({ children, className }: { children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function CTASection() {
  return (
    <ShaderBackground variant="plasma" height="auto" className="relative">
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "rgba(12,28,64,0.88)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 py-32 px-6 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 mb-8">
          <span className="text-gold text-sm font-bold uppercase tracking-wider">🚀 Join 1,200+ Wholesalers</span>
        </div>

        <h2 className="font-serif text-white mb-6" style={{ fontSize: "clamp(40px,6vw,72px)", maxWidth: "700px" }}>
          Ready to Transform Your{" "}
          <em className="text-gold not-italic">Kidswear Sourcing?</em>
        </h2>

        <p className="text-white/65 text-lg max-w-lg mb-12 leading-relaxed">
          Join KidsBridge today and access India's largest verified kidswear B2B network. Free 14-day trial, no credit card.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 mb-10">
          <MagneticButton
            className="px-12 py-5 bg-gold text-navy font-bold rounded-full text-lg hover:shadow-[0_0_60px_rgba(239,183,66,0.5)] transition-shadow"
          >
            Register as Wholesaler →
          </MagneticButton>

          <button className="relative px-12 py-5 bg-transparent border border-white/30 text-white font-bold rounded-full text-lg overflow-hidden group">
            <span className="relative z-10">List Your Products</span>
            <span className="absolute inset-0 -translate-x-full bg-white/10 group-hover:animate-[shimmer-sweep_0.8s_ease] rounded-full" />
          </button>
        </div>

        <div className="flex items-center gap-6 text-[13px] text-white/50 flex-wrap justify-center">
          <span>✓ No setup fee</span>
          <span className="opacity-30">·</span>
          <span>✓ 14-day free trial</span>
          <span className="opacity-30">·</span>
          <span>✓ Cancel anytime</span>
        </div>
      </motion.div>
    </ShaderBackground>
  );
}
