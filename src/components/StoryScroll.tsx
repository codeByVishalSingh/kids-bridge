'use client';

import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function StoryScroll() {
  return (
    <FlowArt aria-label="KidsBridge Story">

      {/* Section 1 — Who We Are */}
      <FlowSection
        aria-label="Who we are"
        style={{ backgroundColor: '#0C1C40', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EFB742]">
          01 — Who We Are
        </p>
        <hr className="my-[2vw] border-none border-t border-white/15" style={{ borderTopWidth: 1 }} />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Built
            <br />
            For
            <br />
            <span style={{ color: '#EFB742' }}>Buyers.</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/15" style={{ borderTopWidth: 1 }} />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-70">
          KidsBridge is India's first dedicated B2B platform connecting verified kidswear
          manufacturers with wholesale buyers — no middlemen, no guesswork, just business.
        </p>
      </FlowSection>

      {/* Section 2 — The Platform */}
      <FlowSection
        aria-label="The platform"
        style={{ backgroundColor: '#0F887D', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — The Platform</p>
        <hr className="my-[2vw] border-none border-t border-white/30" style={{ borderTopWidth: 1 }} />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Source
            <br />
            Smarter.
            <br />
            Ship
            <br />
            Faster.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/30" style={{ borderTopWidth: 1 }} />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Browse 12,000+ SKUs from 500+ verified manufacturers. Filter by MOQ, category, age group,
          and region — then negotiate and order, all in one place.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/30" style={{ borderTopWidth: 1 }} />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Catalogue</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              12,000+ live SKUs spanning newborn to pre-teen, across every category and season.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Negotiation</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Direct chat with manufacturers. Agree MOQs, pricing tiers, and delivery timelines.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Logistics</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              End-to-end shipment tracking. 98% on-time delivery across 30+ Indian cities.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/30" style={{ borderTopWidth: 1 }} />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Verification</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Every manufacturer is GST-verified and quality-audited before listing.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Escrow</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Payments held securely until delivery is confirmed. Zero risk on both sides.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">Analytics</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Track best-sellers, seasonal trends, and reorder patterns from your dashboard.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/30" style={{ borderTopWidth: 1 }} />
        <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-80">
          Every feature we build starts with one question — does this help the buyer and the maker?
        </p>
      </FlowSection>

      {/* Section 3 — How It Works */}
      <FlowSection
        aria-label="How it works"
        style={{ backgroundColor: '#F5F2ED', color: '#0C1C40' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#0F887D' }}>
          03 — How It Works
        </p>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
            List.
            <br />
            Browse.
            <br />
            Deliver.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-70">
          Three steps. No complexity. Whether you're a manufacturer or a wholesaler — KidsBridge
          makes the transaction effortless.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0F887D' }}>
              01 — Manufacturers List
            </p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-65">
              Upload your full catalogue with MOQs, pricing tiers, fabric specs, and season lookbooks.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0F887D' }}>
              02 — Wholesalers Browse
            </p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-65">
              Filter 12,000+ SKUs by age group, category, MOQ, or region. Request samples in one click.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0F887D' }}>
              03 — KidsBridge Delivers
            </p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-65">
              We verify quality, manage escrow, coordinate logistics, and guarantee on-time delivery.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0F887D' }}>
              04 — Track Orders
            </p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-65">
              Real-time shipment tracking from factory dispatch to warehouse receipt.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0F887D' }}>
              05 — Reorder Easily
            </p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-65">
              One-click reorder from previous suppliers. Never start from scratch each season.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: '#0F887D' }}>
              06 — Grow Together
            </p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-65">
              Build long-term supplier relationships. Access exclusive pricing as you grow.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* Section 4 — The Numbers */}
      <FlowSection
        aria-label="The numbers"
        style={{ backgroundColor: '#EFB742', color: '#0C1C40' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">04 — The Numbers</p>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Scale
            <br />
            At
            <br />
            Speed.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-70">
          KidsBridge is already powering India's kidswear trade at scale — and growing faster
          every season.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">500+</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Verified manufacturers from Surat, Tiruppur, Ludhiana, and 30+ cities across India.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">₹50 Cr+</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              GMV facilitated. Real transactions between real businesses. Transparent, fast, secure.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">98%</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              On-time delivery rate. Because late shipments cost more than the margin you saved.
            </p>
          </div>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-70">
          The kidswear trade has always been fragmented — brokers, phone calls, and cash advances.
          KidsBridge changes that permanently.
        </p>
        <hr className="my-[2vw] border-none border-t border-black/20" style={{ borderTopWidth: 1 }} />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">1,200+ Wholesalers</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Active buyers sourcing every season through the KidsBridge platform.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">12,000+ SKUs</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Live and searchable. Updated every season with new drops from every partner.
            </p>
          </div>
          <div className="min-w-[180px] flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">4.9★ Rated</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
              Average seller and buyer satisfaction rating. Built on trust, not just transactions.
            </p>
          </div>
        </div>
      </FlowSection>

      {/* Section 5 — Join */}
      <FlowSection
        aria-label="Join KidsBridge"
        style={{ backgroundColor: '#0C1C40', color: '#fff' }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EFB742]">05 — Join Us</p>
        <hr className="my-[2vw] border-none border-t border-white/15" style={{ borderTopWidth: 1 }} />
        <div>
          <h2 className="text-[clamp(3.5rem,12vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
            Ready
            <br />
            To
            <br />
            <span style={{ color: '#EFB742' }}>Bridge?</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/15" style={{ borderTopWidth: 1 }} />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed opacity-70">
          Join 1,200+ wholesalers and 500+ manufacturers already transforming how kidswear moves
          across India. 14-day free trial. No credit card needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
            style={{ backgroundColor: '#EFB742', color: '#0C1C40' }}
          >
            Register as Wholesaler →
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border transition-all hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
          >
            List Your Products
          </a>
        </div>
      </FlowSection>

    </FlowArt>
  );
}
