'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';

const CATEGORIES = [
  { label: 'Women', href: '/shop/women' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Kids', href: '/shop/kids' },
  { label: 'Bags', href: '/shop/bags' },
];

export default function CategoryTiles() {
  return (
    <section
  className="relative border-t border-[#E7DDCE]"
  style={{ background: '#EEE7DA' }}
>
      <Container className="py-28">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
              Browse
            </p>

            <h2 className="font-display text-4xl sm:text-5xl text-ink-900">
              Shop by Category
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="group block"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300">

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff40,transparent_60%)]" />

                    <div className="flex h-full flex-col items-center justify-center">
                      <div className="mb-5 h-16 w-16 rounded-full border border-white/60 bg-white/30 backdrop-blur-md" />

                      <span className="font-display text-base xs:text-lg sm:text-2xl text-ink-900/75">
                        {category.label}
                      </span>

                      <span className="mt-2 text-[11px] uppercase tracking-[0.35em] text-ink-900/40">
                        Collection
                      </span>
                    </div>
                  </motion.div>

                  <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}