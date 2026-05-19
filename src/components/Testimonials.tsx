"use client";

import { motion } from "framer-motion";

const testimonials = [
  { name: "Rajesh Mehta", company: "Mehta Wholesale, Surat", quote: "KidsBridge helped us source 3 new exclusive brands in a single season. MOQ negotiation was seamless.", stars: 5, initials: "RM", bg: "#0F887D" },
  { name: "Priya Sharma", company: "Kids Corner, Mumbai", quote: "The catalogue is massive. We found niche newborn ranges we couldn't get from local markets.", stars: 5, initials: "PS", bg: "#0C1C40" },
  { name: "Arjun Patel", company: "Patel Garments, Ahmedabad", quote: "Escrow payment system gave us confidence to work with new manufacturers risk-free.", stars: 4, initials: "AP", bg: "#EFB742" },
  { name: "Sunita Rao", company: "BabyBliss, Bangalore", quote: "12,000 SKUs and everything filtered by age group. Saved us 10 hours per buying cycle.", stars: 5, initials: "SR", bg: "#0F887D" },
  { name: "Vikram Singh", company: "Singh Traders, Delhi", quote: "Verified manufacturers only. Zero fake listings. Quality exactly as described.", stars: 5, initials: "VS", bg: "#0C1C40" },
  { name: "Meena Joshi", company: "Tiny Steps, Pune", quote: "Festival collection sourcing is now 3x faster. The seasonal catalogue is a game changer.", stars: 5, initials: "MJ", bg: "#EFB742" },
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="w-[320px] mx-4 bg-white rounded-2xl p-6 border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] flex-shrink-0">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <span key={i} className="text-gold text-lg">★</span>
        ))}
        {t.stars < 5 && <span className="text-black/20 text-lg">★</span>}
      </div>
      <p className="text-[15px] italic text-navy/70 leading-relaxed mb-6">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: t.bg, color: t.bg === "#EFB742" ? "#0C1C40" : "#FFFFFF" }}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-bold text-[14px] text-navy">{t.name}</div>
          <div className="text-[12px] text-black/40">{t.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="bg-cream py-24 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl text-navy"
        >
          What Our Partners Say
        </motion.h2>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Fade edges */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #F5F2ED 0%, transparent 8%, transparent 92%, #F5F2ED 100%)" }} />

        {/* Row 1: scrolls left at 30s */}
        <div className="flex w-fit animate-[scroll-left_30s_linear_infinite] hover:[animation-play-state:paused]">
          {doubled.map((t, i) => <TestimonialCard key={`r1-${i}`} t={t} />)}
        </div>

        {/* Row 2: scrolls right at 35s */}
        <div className="flex w-fit animate-[scroll-right_35s_linear_infinite] hover:[animation-play-state:paused] -ml-40">
          {[...doubled].reverse().map((t, i) => <TestimonialCard key={`r2-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  );
}
