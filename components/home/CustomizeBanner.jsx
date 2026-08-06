'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/layout/Container';

export default function CustomizeBanner() {
  return (
    <section className="bg-oat-50 py-28">

      <Container>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="relative overflow-hidden rounded-[40px] bg-[#1F3A33]"
        >

          {/* Decorative background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff15,transparent_55%)]" />

          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full border border-white/5" />

          <div className="relative grid lg:grid-cols-2 items-center">

            {/* Left */}

            <div className="px-5 sm:px-10 py-12 sm:py-16 lg:px-20 lg:py-24">

              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-clay-500">
                Made exclusively for you
              </p>

              <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-6xl leading-tight text-white">
                Design your own
                <br />
                handmade piece.
              </h2>

              <p className="mt-8 max-w-md text-lg leading-8 text-white/70">
                Choose your preferred colors, sizing, yarn, and style.
                Every piece is handcrafted from scratch to create something
                uniquely yours.
              </p>

              <Link
                href="/customize"
                className="mt-10 inline-flex items-center rounded-full bg-[#E8D7B9] px-8 py-4 text-sm font-semibold text-[#1F3A33] transition-all duration-300 hover:bg-white hover:scale-105"
              >
                Start Customizing
              </Link>

            </div>

            {/* Right */}

            <div className="relative hidden lg:flex items-center justify-center h-full">

              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6
                }}
                className="relative h-[420px] w-[320px] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image
                  src="/images/Banner/Crochet-Customize-Banner.jpg"
                  alt="Customize your crochet piece"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </motion.div>

            </div>

          </div>

        </motion.div>

      </Container>

    </section>
  );
}