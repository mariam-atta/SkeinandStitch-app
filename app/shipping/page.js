import Container from '@/components/layout/Container';
import {
  TruckIcon,
  GiftTopIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function ShippingPage() {
  return (
    <Container className="max-w-5xl py-24">
      {/* Hero */}
      <div className="mb-20 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-juniper-700">
          Delivery
        </p>

        <h1 className="font-display text-5xl text-ink-900">
          Shipping Information
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink-900/60">
          Every Skein &amp; Stitch piece is handcrafted with patience and care.
          From the first stitch to the final ribbon, we make sure your order
          arrives beautifully made and beautifully packaged.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="group rounded-[30px] border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-juniper-50">
            <SparklesIcon className="h-7 w-7 text-juniper-700" />
          </div>

          <h2 className="mb-4 font-display text-2xl text-ink-900">
            Handmade to Order
          </h2>

          <p className="text-sm leading-7 text-ink-900/70">
            Every item is individually crocheted after your order is placed.
            Please allow approximately <strong>1–3 weeks</strong> for production
            before dispatch.
          </p>
        </div>

        <div className="group rounded-[30px] border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-juniper-50">
            <TruckIcon className="h-7 w-7 text-juniper-700" />
          </div>

          <h2 className="mb-4 font-display text-2xl text-ink-900">
            Shipping Time
          </h2>

          <p className="text-sm leading-7 text-ink-900/70">
            Once your order leaves our studio, standard delivery typically takes
            <strong> 3–7 business days</strong>, depending on your location.
          </p>
        </div>

        <div className="group rounded-[30px] border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-juniper-50">
            <GiftTopIcon className="h-7 w-7 text-juniper-700" />
          </div>

          <h2 className="mb-4 font-display text-2xl text-ink-900">
            Complimentary Shipping
          </h2>

          <p className="text-sm leading-7 text-ink-900/70">
            Enjoy complimentary shipping on all orders over{' '}
            <span className="font-semibold text-juniper-700">$75</span>.
            Every package is carefully wrapped to make unboxing just as special
            as what's inside.
          </p>
        </div>
      </div>

      {/* Luxury Banner */}
      <div className="mt-20 overflow-hidden bg-green-50 rounded-[36px] bg-gradient-to-r from-juniper-800 via-juniper-700 to-juniper-800 px-10 py-16 text-center text-white shadow-xl">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
          Thoughtfully Packed
        </p>

        <h2 className="mb-6 font-display text-4xl">
          Wrapped with the Same Care as Every Stitch
        </h2>

        <p className="mx-auto max-w-3xl text-lg leading-8 text-white/80">
          Every order is folded by hand, wrapped in premium tissue, and prepared
          with the same attention to detail that goes into creating each piece.
          From our hands to yours, every package is designed to feel like a
          thoughtful gift.
        </p>
      </div>
    </Container>
  );
}