import Image from 'next/image';
import Link from 'next/link';

export default function HeroCustomize() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] min-h-[560px] w-full">
        <Image
          src="/images/Hero/hero.png"
          alt="Custom handmade crochet"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-[8000ms] hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-oat-50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl px-6 text-center text-white">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/80">
              Handmade • Made Just For You
            </p>

            <h1 className="font-display text-5xl leading-tight md:text-7xl">
              Design Something
              <br />
              Truly Yours.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
              Every Skein &amp; Stitch piece is handcrafted from scratch.
              Choose the style, colour and details, and we'll create something
              that's uniquely yours.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="#custom-form"
                className="rounded-full bg-white px-8 py-3 text-sm font-medium text-ink-900 transition-all duration-300 hover:-translate-y-1 hover:bg-oat-50"
              >
                Start Designing
              </Link>

              <Link
                href="/shop"
                className="rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
              Scroll
            </span>

            <div className="flex h-10 w-6 justify-center rounded-full border border-white/40">
              <div className="mt-2 h-2 w-2 animate-bounce rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}