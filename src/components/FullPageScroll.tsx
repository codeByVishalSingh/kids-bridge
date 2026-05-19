'use client';

import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import Hero3D from '@/components/Hero3D';

/* ── Palette ── */
const C = {
  green:  '#2E4432',
  dark:   '#1A2A1D',
  red:    '#DD2326',
  yellow: '#F6DE22',
  white:  '#FFFFFF',
  cream:  '#F5F2ED',
};

/* ── Divider ── */
const D = ({ c = 'rgba(255,255,255,0.15)' }: { c?: string }) => (
  <div style={{ borderTop: `1px solid ${c}`, margin: '2vw 0' }} />
);

/* ── Stat card ── */
const Stat = ({ v, l, light }: { v: string; l: string; light?: boolean }) => (
  <div className="min-w-[140px] flex-1">
    <div className="font-serif font-black text-3xl mb-1" style={{ color: light ? C.yellow : C.red }}>{v}</div>
    <div className="text-xs font-bold uppercase tracking-wider opacity-65">{l}</div>
  </div>
);

/* ── Feature card ── */
const Feat = ({ icon, title, body, light }: { icon: string; title: string; body: string; light?: boolean }) => (
  <div className="min-w-[180px] flex-1 p-5 rounded-2xl" style={{ background: light ? 'rgba(255,255,255,0.06)' : 'rgba(46,68,50,0.5)', border: `1px solid ${light ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)'}` }}>
    <div className="text-3xl mb-3">{icon}</div>
    <div className="font-serif font-bold text-sm uppercase tracking-wide mb-2" style={{ color: light ? C.yellow : C.red }}>{title}</div>
    <div className="text-sm leading-relaxed opacity-70">{body}</div>
  </div>
);

/* ── Testimony card ── */
const T = ({ q, n, c, bg }: { q: string; n: string; c: string; bg: string }) => (
  <div className="min-w-[240px] flex-1 bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
    <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <span key={i} style={{ color: C.red }}>★</span>)}</div>
    <p className="italic text-sm leading-relaxed mb-4" style={{ color: 'rgba(0,0,0,0.6)' }}>"{q}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
        style={{ background: bg, color: bg === C.yellow ? C.green : C.white }}>
        {n.split(' ').map((w: string) => w[0]).join('')}
      </div>
      <div><div className="font-bold text-sm" style={{ color: C.green }}>{n}</div><div className="text-xs opacity-45">{c}</div></div>
    </div>
  </div>
);

/* ── Pricing card ── */
const Price = ({ name, price, sub, features, cta, highlight }: { name: string; price: string; sub: string; features: string[]; cta: string; highlight?: boolean }) => (
  <div className="min-w-[200px] flex-1 rounded-2xl p-7 relative" style={{
    background: highlight ? C.red : 'rgba(255,255,255,0.05)',
    border: highlight ? 'none' : '1px solid rgba(255,255,255,0.1)',
  }}>
    {highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full" style={{ background: C.yellow, color: C.green }}>Most Popular</div>}
    <div className="text-xs font-bold uppercase tracking-wider mb-4 opacity-60">{name}</div>
    <div className="font-serif font-black text-4xl mb-1">{price}</div>
    <div className="text-xs opacity-50 mb-6">{sub}</div>
    <ul className="space-y-2 mb-8">{features.map(f => <li key={f} className="text-sm flex items-start gap-2"><span style={{ color: C.yellow }}>✓</span>{f}</li>)}</ul>
    <button className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-wide"
      style={highlight ? { background: C.white, color: C.red } : { border: `1px solid rgba(255,255,255,0.3)`, color: C.white, background: 'transparent' }}>{cta}</button>
  </div>
);

export default function FullPageScroll() {
  return (
    <FlowArt aria-label="Ashoka Agencies LLP">

      {/* ① HERO — 3D Three.js mediator scene */}
      <FlowSection aria-label="Hero" style={{ backgroundColor: C.dark, padding: 0 }}>
        <Hero3D />
      </FlowSection>

      {/* ② ABOUT */}
      <FlowSection id="about" aria-label="About" style={{ backgroundColor: C.green, color: C.white }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.yellow }}>01 — Who We Are</p>
        <D />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)', color: C.white }}>
          India's<br />Kidswear<br /><span style={{ color: C.yellow }}>Mediator.</span>
        </h2>
        <D />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-[260px] flex-[2]">
            <p className="text-[clamp(1rem,2vw,1.4rem)] leading-relaxed opacity-70">
              Ashoka Agencies LLP is a registered trade intermediary specializing exclusively in the Indian kidswear sector. Founded on the principles of transparency, reliability, and long-term partnerships, we serve as the trusted link between manufacturing units and wholesale distribution networks across India.
            </p>
            <p className="text-[clamp(1rem,2vw,1.4rem)] leading-relaxed opacity-70 mt-4">
              We are not an ecommerce platform. We are a relationship-first agency — personally facilitating every introduction, negotiation, and deal between our verified manufacturer and wholesaler partners.
            </p>
          </div>
          <div className="min-w-[220px] flex-1 flex flex-col gap-4">
            {[['🏢','Registered LLP','Government-registered Limited Liability Partnership operating across India.'],['🤝','Relationship-First','Every deal is personally facilitated — no algorithms, no automation.'],['✅','Verified Network','All manufacturers and wholesalers undergo our strict verification process.']].map(([icon, title, body]) => (
              <div key={title} className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-2xl">{icon}</div>
                <div><div className="font-bold text-sm mb-1" style={{ color: C.yellow }}>{title}</div><div className="text-xs opacity-60 leading-relaxed">{body}</div></div>
              </div>
            ))}
          </div>
        </div>
      </FlowSection>

      {/* ③ WHAT WE DO */}
      <FlowSection id="services" aria-label="Services" style={{ backgroundColor: C.red, color: C.white }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">02 — What We Do</p>
        <D c="rgba(255,255,255,0.25)" />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)' }}>
          We Build<br />Trade<br />Bridges.
        </h2>
        <D c="rgba(255,255,255,0.25)" />
        <p className="max-w-[55ch] text-[clamp(1rem,2vw,1.4rem)] leading-relaxed opacity-80">
          Our core service is simple: we identify the right manufacturer for every wholesaler — and the right buyer for every manufacturer. We handle every step of the introduction and facilitation process.
        </p>
        <D c="rgba(255,255,255,0.25)" />
        <div className="flex flex-wrap gap-[2vw]">
          <Feat light icon="🔗" title="Manufacturer–Buyer Matching" body="We analyse your product range, MOQ requirements, and geographic targets to introduce you to the most compatible trade partners from our verified network." />
          <Feat light icon="📋" title="Contract & MOQ Facilitation" body="We assist in structuring supply agreements, minimum order quantities, payment terms, and seasonal commitments — ensuring both parties are protected." />
          <Feat light icon="🔍" title="Partner Verification" body="Every manufacturer and wholesaler in our network undergoes GST verification, trade reference checks, and quality audits before any introduction." />
          <Feat light icon="🤝" title="Ongoing Relationship Management" body="Our role doesn't end at the introduction. We remain available to both parties for any trade disputes, renegotiations, or seasonal order reviews." />
        </div>
      </FlowSection>

      {/* ④ OUR NETWORK — stats */}
      <FlowSection id="network" aria-label="Network" style={{ backgroundColor: C.cream, color: C.green }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.red }}>03 — Our Network</p>
        <D c="rgba(46,68,50,0.2)" />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)', color: C.green }}>
          Built On<br />Trust &<br /><span style={{ color: C.red }}>Scale.</span>
        </h2>
        <D c="rgba(46,68,50,0.2)" />
        <div className="flex flex-wrap gap-[4vw]">
          <Stat v="200+" l="Verified Manufacturers" />
          <Stat v="500+" l="Wholesale Partners" />
          <Stat v="18+" l="States Covered" />
          <Stat v="10 Yr" l="Industry Experience" />
        </div>
        <D c="rgba(46,68,50,0.2)" />
        <div className="flex flex-wrap gap-[2vw]">
          {[['Infants & Newborn (0–24M)','Bodysuits, rompers, sleepwear, basics — from leading Ludhiana and Tiruppur mills.'],['Toddler & Kids (2–10Y)','Casual, schoolwear, ethnic, activewear — sourced from Surat and Delhi NCR clusters.'],['Festive & Occasion Wear','Premium embroidered and designer children\'s wear for wholesale festive buyers.'],['School Uniform Ranges','Bulk supply of standard and custom school uniforms — coordinated with institutional buyers.']].map(([title, body]) => (
            <div key={title} className="min-w-[200px] flex-1 p-5 rounded-2xl" style={{ background: C.white, border: '1px solid rgba(46,68,50,0.12)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
              <div className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: C.red }}>{title}</div>
              <div className="text-sm leading-relaxed opacity-65" style={{ color: C.green }}>{body}</div>
            </div>
          ))}
        </div>
      </FlowSection>

      {/* ⑤ HOW WE WORK */}
      <FlowSection id="process" aria-label="Process" style={{ backgroundColor: C.dark, color: C.white }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.yellow }}>04 — How We Work</p>
        <D />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)' }}>
          Simple.<br />Personal.<br /><span style={{ color: C.red }}>Effective.</span>
        </h2>
        <D />
        <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.4rem)] leading-relaxed opacity-70">
          We keep our process lean and human. No complex portals or self-serve dashboards — just direct communication, expert guidance, and accountable relationships.
        </p>
        <D />
        <div className="flex flex-wrap gap-[2vw]">
          {[['01','You Register','Share your profile — whether you are a manufacturer looking for buyers or a wholesaler sourcing product lines. We review every application personally.'],['02','We Assess & Match','Our team analyses your product category, geographic reach, pricing, and capacity to identify the most suitable partners from our verified network.'],['03','Introduction Meeting','We facilitate a direct introduction — phone call, video meeting, or in-person visit. We remain present to ensure clear communication of expectations.'],['04','Deal & Partnership','Once both parties agree on terms, we assist in formalising the arrangement. We continue as a neutral point of contact for the relationship going forward.']].map(([num, title, body]) => (
            <div key={num} className="min-w-[180px] flex-1">
              <div className="font-black text-5xl mb-3 leading-none" style={{ color: C.red, fontFamily: 'var(--font-montserrat)' }}>{num}</div>
              <div className="font-bold uppercase tracking-wide text-sm mb-2" style={{ color: C.yellow }}>{title}</div>
              <div className="text-sm leading-relaxed opacity-65">{body}</div>
            </div>
          ))}
        </div>
      </FlowSection>

      {/* ⑥ WHY ASHOKA */}
      <FlowSection aria-label="Why Us" style={{ backgroundColor: C.yellow, color: C.green }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">05 — Why Ashoka Agencies</p>
        <D c="rgba(46,68,50,0.2)" />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)' }}>
          Trusted.<br />Proven.<br /><span style={{ color: C.red }}>Accountable.</span>
        </h2>
        <D c="rgba(46,68,50,0.2)" />
        <div className="flex flex-wrap gap-[2vw]">
          {[['🛡️','Zero Compromise on Verification','Every partner in our network is physically verified. We never list a manufacturer or buyer without direct due diligence — protecting both sides of every deal.'],['📞','Direct Human Access','No ticketing systems or bots. Every partner has a direct line to their Ashoka Agencies relationship manager.'],['⚖️','Neutral Mediation','We represent neither side — our role is to ensure every deal is fair, transparent, and beneficial for both the manufacturer and the wholesaler.'],['🔄','Long-Term Orientation','We build partnerships, not transactions. Our network is designed for recurring seasonal orders and multi-year trade relationships.'],['📍','Pan-India Reach','Our network spans 18+ states, covering major kidswear production hubs — Ludhiana, Tiruppur, Surat, Delhi NCR, Kolkata, and beyond.'],['🏆','Category Expertise','A decade of exclusive focus on kidswear means we understand MOQs, seasonal demand cycles, fabric requirements, and pricing benchmarks better than generalist agencies.']].map(([icon, title, body]) => (
            <div key={title} className="min-w-[200px] flex-1 p-5 rounded-2xl" style={{ background: 'rgba(46,68,50,0.08)', border: '1px solid rgba(46,68,50,0.15)' }}>
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: C.red }}>{title}</div>
              <div className="text-sm leading-relaxed opacity-70">{body}</div>
            </div>
          ))}
        </div>
      </FlowSection>

      {/* ⑦ TESTIMONIALS */}
      <FlowSection aria-label="Testimonials" style={{ backgroundColor: C.cream, color: C.green }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.red }}>06 — Partner Stories</p>
        <D c="rgba(46,68,50,0.18)" />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)', color: C.green }}>
          Real<br />Voices.<br /><span style={{ color: C.red }}>Real Deals.</span>
        </h2>
        <D c="rgba(46,68,50,0.18)" />
        <div className="flex flex-wrap gap-5">
          <T q="Ashoka Agencies introduced us to three new wholesale partners in Gujarat within our first month. The vetting process gave us full confidence." n="Ramesh Patel" c="Sunrise Knitwear, Tiruppur" bg={C.red} />
          <T q="As a new wholesaler, I struggled to find reliable manufacturers. Ashoka's team personally walked me through every introduction. Now I have two long-term suppliers." n="Priya Nair" c="Kids Corner Wholesale, Kochi" bg={C.green} />
          <T q="They understand the kidswear trade deeply — seasonal timings, MOQ realities, and fabric quality. Not a generic agency. Genuinely specialist." n="Harpreet Singh" c="Singh Garments, Ludhiana" bg={C.yellow} />
          <T q="Our festive season orders are now coordinated three months in advance thanks to Ashoka's introduction to the right manufacturer. Zero delays." n="Meena Shah" c="Baby World, Ahmedabad" bg={C.red} />
          <T q="What sets them apart is accountability. When a delivery issue arose, Ashoka Agencies stepped in immediately as neutral mediators and resolved it." n="Vikram Iyer" c="TinyTrends Wholesale, Bangalore" bg={C.green} />
          <T q="Pan-India reach is real. They connected our Kolkata factory with buyers in Rajasthan and Punjab that we never would have reached on our own." n="Suman Das" c="LittleWeave Mills, Kolkata" bg={C.yellow} />
        </div>
      </FlowSection>

      {/* ⑧ CONTACT — last section (no pin) */}
      <FlowSection id="contact" aria-label="Contact" style={{ backgroundColor: C.green, color: C.white }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.yellow }}>07 — Partner With Us</p>
        <D />
        <h2 className="font-serif font-black uppercase leading-[0.85]" style={{ fontSize: 'clamp(3rem,10vw,12rem)' }}>
          Start<br />Your<br /><span style={{ color: C.red }}>Journey.</span>
        </h2>
        <D />
        <p className="max-w-[50ch] text-[clamp(1rem,2vw,1.4rem)] leading-relaxed opacity-70">
          Whether you are a kidswear manufacturer seeking reliable wholesale buyers, or a wholesaler looking for quality-assured manufacturing partners — Ashoka Agencies LLP is your first call.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <a href="mailto:info@ashokaagencies.in" className="px-8 py-4 rounded-full font-bold text-base uppercase tracking-wide hover:scale-105 transition-transform"
            style={{ background: C.red, color: C.white }}>Email Us →</a>
          <a href="tel:+919876543210" className="px-8 py-4 rounded-full font-bold text-base uppercase tracking-wide border hover:bg-white/8 transition-all"
            style={{ border: '1.5px solid rgba(255,255,255,0.3)', color: C.white }}>Call Us</a>
        </div>
        <D />
        {/* Contact details grid */}
        <div className="flex flex-wrap gap-[3vw]">
          {[['📍','Registered Office','Ashoka Agencies LLP\nIndia — Pan-India Operations'],['📧','Email','info@ashokaagencies.in\npartnerships@ashokaagencies.in'],['📞','Phone','+91 98765 43210\nMon–Sat, 9 AM – 6 PM IST'],['🌐','Presence','18+ States · Ludhiana · Tiruppur\nSurat · Delhi NCR · Kolkata']].map(([icon, label, value]) => (
            <div key={label} className="min-w-[180px] flex-1">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-bold text-xs uppercase tracking-wider mb-1" style={{ color: C.yellow }}>{label}</div>
              <div className="text-sm opacity-65 whitespace-pre-line leading-relaxed">{value}</div>
            </div>
          ))}
        </div>
        <D />
        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-auto">
          <div>
            <div className="font-serif font-black text-2xl uppercase mb-2" style={{ color: C.yellow }}>Ashoka Agencies LLP</div>
            <div className="text-sm opacity-45">India's Trusted Kidswear Trade Intermediary</div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {['About Us','What We Do','Our Network','How It Works','Contact'].map(l => (
              <a key={l} href="#" className="opacity-40 hover:opacity-90 transition-opacity font-medium">{l}</a>
            ))}
          </div>
        </div>
        <div className="text-xs opacity-25 mt-6">© 2025 Ashoka Agencies LLP. All rights reserved. · LLPIN: AAA-0000 · GST: 00AAAAA0000A0Z0</div>
      </FlowSection>

    </FlowArt>
  );
}
