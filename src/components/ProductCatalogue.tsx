"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Newborn (0-12M)", sku: "2,400 SKUs", gradient: "from-[#FFE0E6] to-[#FFB3C1]" },
  { name: "Toddler (1-3Y)", sku: "3,100 SKUs", gradient: "from-[#FFF0CC] to-[#FFD980]" },
  { name: "Boys (4-10Y)", sku: "4,200 SKUs", gradient: "from-[#CCE5FF] to-[#80BFFF]" },
  { name: "Girls (4-10Y)", sku: "4,500 SKUs", gradient: "from-[#F0CCF0] to-[#D48FD4]" },
  { name: "Activewear", sku: "1,200 SKUs", gradient: "from-[#CCFFE5] to-[#66FFAA]" },
  { name: "Festive Wear", sku: "1,800 SKUs", gradient: "from-[#FFE8CC] to-[#FFB366]" },
];

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  name: `Cotton Romper Set — 0-6M`,
  manufacturer: "Sunrise Knitwear",
  moq: "50 pcs",
  price: "₹180 – ₹240 / pc",
  color1: ["#FFE0E6", "#FFF0CC", "#CCE5FF", "#F0CCF0"][i % 4],
  color2: ["#FFB3C1", "#FFD980", "#80BFFF", "#D48FD4"][i % 4],
}));

export default function ProductCatalogue() {
  return (
    <section className="py-24 bg-white overflow-hidden text-navy">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <h2 className="font-serif text-5xl mb-4">Browse by Category</h2>
        <p className="text-navy/60 font-medium">Explore over 12,000 SKUs from verified manufacturers.</p>
      </div>

      {/* Part A: Category Carousel */}
      <div className="pl-6 md:pl-12 mb-24 cursor-grab active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
          dragElastic={0.1}
          dragMomentum={true}
          className="flex gap-6 w-fit"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className={`w-[260px] h-[320px] rounded-[20px] bg-gradient-to-br ${cat.gradient} p-6 relative flex flex-col justify-end shrink-0 shadow-sm`}
            >
              <div className="absolute top-4 right-4 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {cat.sku}
              </div>
              <h3 className="font-serif text-[22px] text-navy leading-tight">{cat.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Part B: Featured Products Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-serif text-4xl">Featured Samples</h2>
          <a href="#" className="text-teal font-bold hover:underline">View All →</a>
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((prod) => (
            <motion.div
              key={prod.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all"
            >
              {/* Product Image Placeholder */}
              <div
                className="w-full h-48 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${prod.color1}, ${prod.color2})` }}
              >
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-navy text-xs font-bold px-2 py-1 rounded">
                  MOQ: {prod.moq}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="text-[11px] text-navy/50 uppercase font-bold tracking-wider mb-1">
                  {prod.manufacturer}
                </div>
                <h4 className="font-bold text-navy mb-3 leading-tight">{prod.name}</h4>
                <div className="text-teal font-bold mb-4">{prod.price}</div>
                <button className="w-full bg-navy/5 text-teal hover:bg-teal hover:text-white font-bold py-2.5 rounded-full transition-colors text-sm">
                  Request Sample
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
