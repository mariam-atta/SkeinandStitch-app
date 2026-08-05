'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section className="bg-oat-50">
      {/* ---------------- Desktop / Tablet ---------------- */}
      <div className="relative hidden md:block h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, ease: 'linear' }}
          className="absolute inset-0"
        >
          <Image
            src="/images/Hero/hero.png"
            alt="Skein & Stitch Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10" />

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6">
            <motion.p
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="mb-6 text-sm uppercase tracking-[0.4em] text-white/80"
            >
              Handmade • Made To Order
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.15}
              variants={fadeUp}
              className="font-display text-6xl lg:text-8xl leading-none text-white"
            >
              Every Stitch
              <br />
              Tells a Story.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.3}
              variants={fadeUp}
              className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-white/90"
            >
              Handmade crochet clothing and accessories crafted slowly,
              beautifully and uniquely for you.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.45}
              variants={fadeUp}
              className="mt-12 flex justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/shop"
                  className="block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-cream-0"
                >
                  Shop Collection
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/customize"
                  className="block rounded-full border border-white/60 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                >
                  Customize Yours
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-[1px] bg-white/50"
          />
        </motion.div>
      </div>

      {/* ---------------- Mobile ---------------- */}
      <div className="block md:hidden">
        <div className="relative h-[55vh] xs:h-[60vh] overflow-hidden">
          <Image
            src="/images/Hero/hero.png"
            alt="Skein & Stitch Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_35%]"
          />
        </div>

        <div className="px-6 py-12">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-clay-600">
            Handmade • Made To Order
          </p>

          <h1 className="font-display text-4xl leading-tight text-ink-900">
            Every Stitch
            <br />
            Tells a Story.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-ink-900/70">
            Handmade crochet clothing and accessories crafted slowly,
            beautifully and uniquely for you.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/shop"
              className="flex items-center justify-center rounded-full bg-juniper-700 py-4 text-sm font-semibold text-white"
            >
              Shop Collection
            </Link>

            <Link
              href="/customize"
              className="flex items-center justify-center rounded-full border border-ink-900/15 py-4 text-sm font-semibold text-ink-900"
            >
              Customize Yours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}