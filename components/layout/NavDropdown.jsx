'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_MENU = {
  Women: {
    Clothing: ['Cardigans', 'Sweaters', 'Ponchos'],
    Accessories: ['Beanies', 'Mufflers', 'Gloves'],
  },
  Men: {
    Clothing: ['Cardigans', 'Sweaters'],
    Accessories: ['Beanies', 'Mufflers'],
  },
  Kids: {
    Clothing: ['Cardigans', 'Sweaters'],
    Accessories: ['Beanies', 'Mufflers'],
  },
};

const CATEGORY_IMAGES = {
  women: '/images/Banner/Crochet-Women-Banner.jpg',
  men: '/images/Banner/Crochet-Men-Banner.webp',
  kids: '/images/Banner/Crochet-Kids-Banner.jpg',
};

const ACCESSORY_IMAGE = '/images/Banner/Crochet-Accessory-Banner.png';

export default function NavDropdown({ label, slug, scrolled }) {
  const [open, setOpen] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const groups = CATEGORY_MENU[label];

  const activeImage =
    hoveredGroup === 'Accessories' ? ACCESSORY_IMAGE : CATEGORY_IMAGES[slug];

  const activeCaption =
    hoveredGroup === 'Accessories' ? 'Accessories' : `${label} Collection`;

  const linkClass = `relative text-[13px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 after:absolute after:left-0 after:-bottom-2 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full ${
    scrolled ? 'text-ink-900' : 'text-white'
  }`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setHoveredGroup(null);
      }}
    >
      <button className={linkClass}>
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 top-full mt-6 w-[700px] -translate-x-1/2 overflow-hidden rounded-3xl border border-stone-200 bg-white/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-3">

              {/* Left */}
              <div className="col-span-2 p-10">
                <h3 className="mb-8 font-display text-3xl text-ink-900">
                  {label}
                </h3>

                <div className="grid grid-cols-2 gap-10">
                  {Object.entries(groups).map(([groupName, items]) => (
                    <div
                      key={groupName}
                      onMouseEnter={() => setHoveredGroup(groupName)}
                    >
                      <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-clay-600">
                        {groupName}
                      </p>

                      <div className="space-y-3">
                        {items.map((item) => (
                          <Link
                            key={item}
                            href={`/shop/${slug}/${item.toLowerCase()}`}
                            className="block text-[15px] text-ink-900 transition-all duration-300 hover:translate-x-2 hover:text-clay-600"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/shop/${slug}`}
                  className="mt-10 inline-flex items-center text-sm font-medium text-clay-600 transition-transform duration-300 hover:translate-x-2"
                >
                  View Collection →
                </Link>
              </div>

              {/* Right */}
              <div className="relative overflow-hidden bg-stone-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={activeImage}
                    alt={activeCaption}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-xs uppercase tracking-[0.25em] opacity-80">
                    Handmade
                  </p>

                  <h4 className="mt-2 font-display text-2xl">
                    {activeCaption}
                  </h4>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}