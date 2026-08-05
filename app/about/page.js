import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import PageHero from '@/components/ui/PageHero';
import InfoCard from '@/components/ui/InfoCard';
import CTASection from '@/components/ui/CTASection';

export const metadata = {
  title: 'About | Skein & Stitch',
  description:
    'Learn the story behind Skein & Stitch and our passion for handmade crochet.',
};

const VALUES = [
  {
    title: 'Handmade',
    text: 'Every piece is crocheted by hand with patience and attention to every stitch. No mass production—only craftsmanship.',
  },
  {
    title: 'Made Just For You',
    text: 'Many of our products are created only after you order, allowing every piece to be uniquely yours.',
  },
  {
    title: 'Premium Materials',
    text: 'We carefully choose soft, durable yarns that feel beautiful and last through years of wear.',
  },
  {
    title: 'Designed With Love',
    text: 'Every design begins with creativity and finishes with countless hours of careful handmade work.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="Handmade With Heart."
        description="Skein & Stitch was created from a love for handmade crochet, timeless craftsmanship, and designing pieces that feel personal."
      />

      <Container className="py-24 space-y-24">

        <section className="grid items-center gap-16 lg:grid-cols-2">

          <div className="relative overflow-hidden rounded-[36px]">
            <Image
              src="/images/Hero/hero.png"
              alt="Skein and Stitch"
              width={900}
              height={1100}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
              OUR PHILOSOPHY
            </p>

            <h2 className="font-display text-5xl leading-tight text-ink-900">
              Every Stitch
              <br />
              Tells A Story.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-9 text-ink-900/65">

              <p>
                We believe handmade products carry something that factory-made
                pieces never can—a story. Every cardigan, beanie, bag and
                sweater is carefully crocheted stitch by stitch with patience,
                skill and creativity.
              </p>

              <p>
                Instead of producing hundreds of identical pieces, we focus on
                creating meaningful items that feel personal. Many of our
                products are made only after you place an order, allowing us to
                give every creation the attention it deserves.
              </p>

              <p>
                Whether you're shopping from our collection or designing a
                custom piece, our goal is always the same: to create something
                beautiful that you'll love wearing for years.
              </p>

            </div>

          </div>

        </section>

        <section>

          <div className="mb-14 text-center">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
              WHY CHOOSE US
            </p>

            <h2 className="font-display text-5xl text-ink-900">
              Crafted With Care
            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

            {VALUES.map((item) => (
              <InfoCard key={item.title} title={item.title}>
                <p>{item.text}</p>
              </InfoCard>
            ))}

          </div>

        </section>

        <section className="rounded-[40px] border border-stone-200 bg-gradient-to-r from-oat-50 to-white p-12 lg:p-16">

          <div className="grid gap-12 lg:grid-cols-3">

            <div>
              <p className="text-5xl font-display text-juniper-700">100%</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-ink-900/50">
                Handmade
              </p>
            </div>

            <div>
              <p className="text-5xl font-display text-juniper-700">Made</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-ink-900/50">
                To Order
              </p>
            </div>

            <div>
              <p className="text-5xl font-display text-juniper-700">∞</p>
              <p className="mt-3 text-sm uppercase tracking-[0.25em] text-ink-900/50">
                Endless Customisation
              </p>
            </div>

          </div>

        </section>

        <section className="overflow-hidden rounded-[40px] bg-juniper-700 px-10 py-20 text-center text-white">

          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            LET'S CREATE SOMETHING BEAUTIFUL
          </p>

          <h2 className="mt-6 font-display text-5xl">
            Design Your Own Piece
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Looking for something unique? Work with us to create a handmade
            crochet piece designed especially for you.
          </p>

          <Link
            href="/customize"
            className="mt-10 inline-flex rounded-full bg-white px-8 py-4 font-medium text-ink-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Start Customising
          </Link>

        </section>

      </Container>
    </>
  );
}