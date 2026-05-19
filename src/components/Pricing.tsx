"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthly: 2999,
    annual: 1999,
    moq: "Up to ₹5L orders/month",
    highlight: false,
    features: [
      { text: "Access to 2,000 SKUs", included: true },
      { text: "5 manufacturer connections/month", included: true },
      { text: "Basic catalogue filters", included: true },
      { text: "Email support", included: true },
      { text: "Dedicated account manager", included: false },
      { text: "Priority sample requests", included: false },
    ],
    cta: "Start Free Trial",
    style: "border border-black/10 bg-cream text-navy",
    ctaStyle: "border border-navy text-navy hover:bg-navy hover:text-white",
  },
  {
    name: "Growth",
    monthly: 7999,
    annual: 5499,
    moq: "Up to ₹25L orders/month",
    highlight: true,
    features: [
      { text: "Full 12,000+ SKU access", included: true },
      { text: "25 manufacturer connections/month", included: true },
      { text: "Advanced filters + analytics", included: true },
      { text: "Priority sample requests", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom procurement desk", included: false },
    ],
    cta: "Get Started",
    style: "bg-navy text-white border border-navy",
    ctaStyle: "bg-gold text-navy font-bold hover:scale-105 transition-transform",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    moq: "Unlimited",
    highlight: false,
    features: [
      { text: "All Growth features", included: true },
      { text: "Custom procurement desk", included: true },
      { text: "API access", included: true },
      { text: "White-label options", included: true },
      { text: "SLA guarantee", included: true },
      { text: "Priority onboarding", included: true },
    ],
    cta: "Contact Sales",
    style: "border-2 border-teal bg-white text-navy",
    ctaStyle: "border-2 border-teal text-teal hover:bg-teal hover:text-white",
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl text-navy mb-4"
          >
            Choose Your Tier
          </motion.h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${billing === "monthly" ? "text-navy" : "text-navy/40"}`}>Monthly</span>
            <div
              onClick={() => setBilling(b => b === "monthly" ? "annual" : "monthly")}
              className="relative w-14 h-7 bg-navy rounded-full cursor-pointer flex items-center px-1"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 40 }}
                className={`w-5 h-5 rounded-full bg-gold ${billing === "annual" ? "ml-auto" : ""}`}
              />
            </div>
            <span className={`text-sm font-medium flex items-center gap-2 ${billing === "annual" ? "text-navy" : "text-navy/40"}`}>
              Annual
              {billing === "annual" && (
                <span className="bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">2 months free</span>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: plan.highlight ? 1.03 : 1.01 }}
              className={`rounded-2xl p-8 relative ${plan.style}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-2 font-bold text-sm uppercase tracking-wider opacity-60">{plan.name}</div>

              <div className="mb-1" style={{ minHeight: "80px" }}>
                <AnimatePresence mode="wait">
                  {plan.monthly !== null ? (
                    <motion.div
                      key={billing}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="font-mono text-4xl font-bold">
                        ₹{(billing === "monthly" ? plan.monthly : plan.annual!).toLocaleString()}
                      </span>
                      <span className="text-sm opacity-60">/mo</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="custom"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="font-mono text-4xl font-bold">Custom</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-xs opacity-50 mb-8 font-mono">{plan.moq}</div>

              <ul className="space-y-3 mb-10">
                {plan.features.map((f, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    {f.included ? (
                      <Check size={16} className="text-teal shrink-0" />
                    ) : (
                      <X size={16} className="opacity-30 shrink-0" />
                    )}
                    <span className={f.included ? "" : "opacity-40"}>{f.text}</span>
                  </motion.li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full text-sm font-bold transition-all ${plan.ctaStyle}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
