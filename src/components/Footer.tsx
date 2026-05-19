"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Camera, MessageCircle } from "lucide-react";

const footerLinks = [
  {
    heading: "For Wholesalers",
    links: ["Browse Catalogue", "Register", "How It Works", "Pricing", "Download App"],
  },
  {
    heading: "For Manufacturers",
    links: ["List Products", "Manufacturer Dashboard", "Verification Process", "Partner Program", "API Docs"],
  },
  {
    heading: "Company",
    links: ["About KidsBridge", "Blog", "Press Kit", "Careers", "Contact"],
  },
];

function FooterLink({ label }: { label: string }) {
  return (
    <div className="relative group w-fit">
      <a href="#" className="text-sm text-white/45 hover:text-white transition-colors block pb-0.5">
        {label}
      </a>
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="absolute bottom-0 left-0 h-px w-full bg-teal origin-left block"
      />
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: "#060E20" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-teal flex items-center justify-center">
                <span className="text-white font-bold text-lg font-serif">KB</span>
              </div>
              <span className="font-bold text-xl text-white">KidsBridge</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
              Connecting India's kidswear ecosystem — from factory floor to wholesaler shelf.
            </p>
            <div className="flex gap-3">
              {[Globe, Camera, MessageCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15 }}
                  className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white/60 hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-bold text-white text-sm mb-6 uppercase tracking-wider">{col.heading}</h4>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => <FooterLink key={link} label={link} />)}
              </div>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white text-sm mb-2 uppercase tracking-wider">Get Season Alerts</h4>
            <p className="text-white/40 text-xs mb-6 leading-relaxed">New collections, MOQ deals & market insights</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="px-4 py-3 rounded-lg text-sm text-white bg-white/6 border border-white/12 focus:outline-none focus:border-teal transition-colors placeholder:text-white/25"
              />
              <button className="px-4 py-3 bg-gold text-navy font-bold rounded-lg text-sm hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[12px] text-white/35">© 2025 KidsBridge Technologies Pvt. Ltd.</span>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <a key={item} href="#" className="text-[12px] text-white/35 hover:text-white/60 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
