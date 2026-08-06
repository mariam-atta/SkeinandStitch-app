'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';

const CATEGORIES = [
  { label: 'Women', href: '/shop/women', image: '/images/Banner/Crochet-Women-Banner.jpg' },
  { label: 'Men', href: '/shop/men', image: '/images/Banner/Crochet-Men-Banner.webp' },
  { label: 'Kids', href: '/shop/kids', image: '/images/Banner/Crochet-Kids-Banner.jpg' },
  { label: 'Bags', href: '/shop/bags', image: '/images/Banner/Crochet-Bags-Banner.png' },
];

export default function CategoryTiles() {
  return (
    <section className="relative border-t border-[#E7DDCE]" style={{ background: '#EEE7DA' }}>
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
            <Link key={category.label} href={category.href} className="group block">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-200">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={category.image}
                      alt={category.label}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </motion.div>

                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                    <span className="font-display text-base xs:text-lg sm:text-2xl text-white">
                      {category.label}
                    </span>
                    <span className="mt-2 text-[11px] uppercase tracking-[0.35em] text-white/70">
                      Collection
                    </span>
                  </div>

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