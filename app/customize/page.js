import Container from '@/components/layout/Container';
import CustomizeForm from '@/components/customize/CustomizeForm';
import HeroCustomize from '@/components/customize/HeroCustomize';

export const metadata = {
  title: 'Customize | Skein & Stitch',
  description:
    'Design your own handmade crochet piece. Choose the style, yarn colour and details, and we will craft it just for you.',
};

export default function CustomizePage() {
  return (
    <>
      <HeroCustomize />

      <Container className="relative -mt-24 z-20 pb-24">
        <div
          id="custom-form"
          className="rounded-[36px] border border-stone-200/70 bg-white/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10 lg:p-14"
        >
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
              CREATE YOUR PIECE
            </p>

            <h1 className="font-display text-4xl leading-tight text-ink-900 sm:text-5xl">
              Let's Create Something
              <br />
              Beautiful Together
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-900/60">
              Every order is handmade from scratch. Tell us what you'd like,
              choose your preferred yarn colours, upload inspiration, and we'll
              work with you to create something that's uniquely yours.
            </p>
          </div>

          <CustomizeForm />
        </div>
      </Container>
    </>
  );
}