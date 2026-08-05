import Container from '@/components/layout/Container';
import PageHero from '@/components/ui/PageHero';
import CTASection from '@/components/ui/CTASection';
import FAQAccordion from '@/components/faq/FAQAccordion';
import FAQS from '@/components/faq/faqData';

export const metadata = {
  title: 'FAQ | Skein & Stitch',
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="HELP CENTER"
        title="Frequently Asked Questions"
        description="Everything you need to know about our handmade crochet pieces, custom orders, shipping and care."
      />

      <Container className="py-24">

        <div className="mx-auto max-w-4xl">

          <FAQAccordion faqs={FAQS} />

        </div>

      </Container>

      <CTASection
        eyebrow="STILL HAVE QUESTIONS?"
        title="We're Always Happy To Help"
        description="Can't find the answer you're looking for? Send us a message and we'll get back to you as soon as possible."
        buttonText="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}