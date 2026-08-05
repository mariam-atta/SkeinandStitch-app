'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import Container from '@/components/layout/Container';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Contact form:', formData);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <PageHero
          eyebrow="MESSAGE SENT"
          title="Thank You!"
          description="We've received your message and will get back to you as soon as possible."
        />

        <Container className="py-24">
          <div className="mx-auto max-w-xl rounded-[36px] border border-stone-200 bg-white p-14 text-center shadow-[0_15px_45px_rgba(0,0,0,.06)]">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-juniper-700 text-4xl text-white">
              ✓
            </div>

            <h2 className="font-display text-4xl text-ink-900">
              Message Received
            </h2>

            <p className="mt-6 text-lg leading-8 text-ink-900/60">
              Thank you for reaching out. We'll respond as soon as possible.
            </p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Let's Start A Conversation."
        description="Questions, custom requests or just want to say hello? We'd love to hear from you."
      />

      <Container className="py-24">

        <div className="grid gap-12 lg:grid-cols-[380px_1fr]">

          <div className="space-y-8">

            <div className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-clay-600">
                EMAIL
              </p>

              <h3 className="mt-3 font-display text-2xl text-ink-900">
                hello@skeinandstitch.com
              </h3>

              <p className="mt-5 leading-8 text-ink-900/60">
                Send us an email anytime and we'll get back to you within
                one business day.
              </p>
            </div>

            <div className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-clay-600">
                CUSTOM ORDERS
              </p>

              <h3 className="mt-3 font-display text-2xl text-ink-900">
                Made Just For You
              </h3>

              <p className="mt-5 leading-8 text-ink-900/60">
                Looking for something unique? Tell us your vision and we'll
                create a handcrafted crochet piece made especially for you.
              </p>
            </div>

            <div className="rounded-[32px] border border-stone-200 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,.05)]">
              <p className="text-xs uppercase tracking-[0.3em] text-clay-600">
                RESPONSE TIME
              </p>

              <h3 className="mt-3 font-display text-2xl text-ink-900">
                Within 24 Hours
              </h3>

              <p className="mt-5 leading-8 text-ink-900/60">
                We answer every message personally because every customer
                matters to us.
              </p>
            </div>

          </div>

          <div className="rounded-[36px] border border-stone-200 bg-white p-8 shadow-[0_15px_50px_rgba(0,0,0,.06)] sm:p-12">

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-clay-600">
              SEND A MESSAGE
            </p>

            <h2 className="font-display text-4xl text-ink-900">
              We'd Love To Hear From You
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-7"
            >

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-900/50">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none transition-all duration-300 focus:border-juniper-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-900/50">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-stone-200 px-5 py-4 outline-none transition-all duration-300 focus:border-juniper-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-ink-900/50">
                  Your Message
                </label>

                <textarea
                  rows={7}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full rounded-3xl border border-stone-200 px-5 py-5 outline-none transition-all duration-300 focus:border-juniper-700"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="rounded-full bg-juniper-700 px-9 py-4 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-juniper-800 hover:shadow-2xl"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>

      </Container>
    </>
  );
}