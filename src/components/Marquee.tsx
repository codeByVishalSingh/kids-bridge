"use client";

import { motion } from "framer-motion";

const row1 = [
  "Sunrise Knitwear", "TinyThreads", "BabyBolt", "ColorKids",
  "IndiaTots", "KraftKidz", "LittleLoom", "SoftSprout"
];

const row2 = [
  "MiniMade", "FirstStitch", "PlayWeave", "BrightBabes",
  "KidCraft", "TenderTex", "GrowWear", "PureKid"
];

export default function ManufacturerMarquee() {
  return (
    <section className="bg-cream py-24 w-full overflow-hidden flex flex-col items-center">
      <div className="mb-12 text-center">
        <span className="font-sans text-[12px] uppercase tracking-[0.12em] text-teal font-bold">
          Trusted by 500+ Manufacturers
        </span>
      </div>

      <div className="relative w-full flex flex-col gap-8 max-w-[100vw]">
        {/* Fade edges */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: "linear-gradient(to right, #F5F2ED 0%, transparent 10%, transparent 90%, #F5F2ED 100%)"
        }} />

        {/* Row 1: Scrolls Left */}
        <div className="flex w-fit animate-[scroll-left_35s_linear_infinite] hover:[animation-play-state:paused]">
          {[...row1, ...row1, ...row1].map((logo, i) => (
            <motion.div
              key={`row1-${i}`}
              whileHover={{ scale: 1.04 }}
              className="mx-4 flex-shrink-0 bg-white border border-black/5 rounded-xl px-7 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              <span className="font-sans text-[14px] font-bold text-navy">{logo}</span>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="flex w-fit animate-[scroll-right_35s_linear_infinite] hover:[animation-play-state:paused] -ml-24">
          {[...row2, ...row2, ...row2].map((logo, i) => (
            <motion.div
              key={`row2-${i}`}
              whileHover={{ scale: 1.04 }}
              className="mx-4 flex-shrink-0 bg-white border border-black/5 rounded-xl px-7 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              <span className="font-sans text-[14px] font-bold text-navy">{logo}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
