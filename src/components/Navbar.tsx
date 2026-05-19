"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "About Us",    href: "#about" },
  { name: "What We Do", href: "#services" },
  { name: "Our Network",href: "#network" },
  { name: "How It Works",href: "#process" },
  { name: "Contact",    href: "#contact" },
];

/* Logo mark — geometric A in red circle + yellow flash */
function AshokaMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#DD2326" />
      {/* White A mountain */}
      <polygon points="50,15 22,75 38,75 50,45 62,75 78,75" fill="white" />
      {/* Yellow flash / second peak */}
      <polygon points="62,20 78,75 90,75 72,20" fill="#F6DE22" />
    </svg>
  );
}

export function AshokaLogo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <AshokaMark size={40} />
      <div className="leading-none">
        <div className="font-serif font-black text-lg tracking-[0.12em] uppercase" style={{ color: dark ? '#2E4432' : '#fff', letterSpacing: '0.12em' }}>Ashoka</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#F6DE22' }}>Agencies LLP</div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <>
      <motion.nav
        initial={{ y: -80 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(26,42,29,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <AshokaLogo />

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l, i) => (
              <motion.a key={l.name} href={l.href}
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                onMouseEnter={() => setActive(l.name)} onMouseLeave={() => setActive("")}
                className="relative text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors uppercase"
              >
                {l.name}
                {active === l.name && (
                  <motion.div layoutId="nav-under"
                    className="absolute left-0 right-0 -bottom-1 h-[2px]"
                    style={{ background: '#DD2326' }} />
                )}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide"
              style={{ background: '#DD2326', color: '#fff' }}>
              Partner With Us
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white p-2 z-50 relative" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col px-8 pt-28 pb-10"
            style={{ background: '#1A2A1D' }}>
            {links.map((l, i) => (
              <motion.a key={l.name} href={l.href}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07 }}
                className="text-3xl font-black uppercase tracking-tight text-white/90 py-4 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.08)', fontFamily: 'var(--font-montserrat)' }}
                onClick={() => setOpen(false)}>{l.name}</motion.a>
            ))}
            <motion.a href="#contact" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }} onClick={() => setOpen(false)}
              className="mt-10 px-8 py-4 rounded-full font-bold text-lg text-center"
              style={{ background: '#DD2326', color: '#fff' }}>Partner With Us</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
