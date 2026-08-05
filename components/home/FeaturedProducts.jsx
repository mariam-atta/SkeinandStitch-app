'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';
import ProductCard from '@/components/product/ProductCard';

export default function FeaturedProducts({ products = [] }) {
  if (products.length === 0) {
    return (
      <section className="bg-oat-50">
        <Container className="py-20">
          <h2 className="font-display text-2xl sm:text-3xl text-ink-900 mb-8">
            Featured pieces
          </h2>
          <p className="text-sm text-ink-900/50">No products to show yet.</p>
        </Container>
      </section>
    );
  }

  return (
    <section
  className="relative"
  style={{ background: '#F6F2EB' }}
>
      <Container className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay-600 mb-4">
              Handpicked
            </p>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl text-ink-900">
              Featured pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:block text-sm font-medium text-ink-900 hover:text-juniper-700 transition-colors whitespace-nowrap"
          >
            View all →
          </Link>
        </motion.div>

        {/* 3 columns, tight gap, tall frames — image-dominant, not card-dominant */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link
          href="/shop"
          className="sm:hidden mt-10 block text-center text-sm font-medium text-ink-900 hover:text-juniper-700 transition-colors"
        >
          View all →
        </Link>
      </Container>
    </section>
  );
}