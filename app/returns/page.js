import Container from '@/components/layout/Container';

export default function ReturnsPage() {
  return (
    <Container className="py-24 max-w-5xl">

      <div className="text-center mb-20">
        <p className="uppercase tracking-[0.35em] text-xs text-clay-600 mb-4">
          Returns & Care
        </p>

        <h1 className="font-display text-5xl text-ink-900">
          Returns Policy
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-ink-900/60">
          Every handmade piece carries hours of craftsmanship. While we hope
          you'll love your order, we also want every purchase to feel
          completely worry-free.
        </p>
      </div>

      <div className="space-y-8">

        <div className="rounded-3xl border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm">
          <h2 className="font-display text-2xl mb-4 text-ink-900">
            Ready-Made Pieces
          </h2>

          <p className="text-sm leading-7 text-ink-900/70">
            Ready-made items may be returned within <strong>14 days</strong> of
            delivery provided they remain unworn, unwashed and in their
            original condition.
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm">
          <h2 className="font-display text-2xl mb-4 text-ink-900">
            Custom Orders
          </h2>

          <p className="text-sm leading-7 text-ink-900/70">
            Custom and made-to-order creations are crafted exclusively for
            you. Because of their personalised nature, these pieces are final
            sale.
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-[#FCFAF6] p-8 shadow-sm">
          <h2 className="font-display text-2xl mb-4 text-ink-900">
            If Something Isn't Right
          </h2>

          <p className="text-sm leading-7 text-ink-900/70">
            If your order arrives damaged or you receive the wrong item,
            contact us within 48 hours. We'll make it right as quickly as
            possible.
          </p>
        </div>

      </div>

      <div className="mt-20 rounded-[32px] border border-juniper-700 bg-[#EEF4EF] px-10 py-12 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-juniper-700 mb-3">
          Our Promise
        </p>

        <h2 className="font-display text-3xl text-ink-900 mb-5">
          Handmade with Integrity
        </h2>

        <p className="max-w-2xl mx-auto leading-8 text-ink-900/70">
          We believe slow fashion deserves thoughtful service. If you ever
          have questions before or after placing your order, we're always
          happy to help.
        </p>
      </div>

    </Container>
  );
}