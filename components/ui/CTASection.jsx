import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="mt-24 rounded-[40px] bg-juniper-700 px-10 py-20 text-center text-white">
      <p className="text-xs uppercase tracking-[0.35em] text-white/70">
        Handmade Just For You
      </p>

      <h2 className="mt-5 font-display text-5xl">
        Ready to Create Something Unique?
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
        Every Skein & Stitch piece is crafted one stitch at a time. Let's
        create something that's completely yours.
      </p>

      <Link
        href="/customize"
        className="mt-10 inline-flex rounded-full bg-white px-8 py-4 font-medium text-ink-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        Start Custom Order
      </Link>
    </section>
  );
}