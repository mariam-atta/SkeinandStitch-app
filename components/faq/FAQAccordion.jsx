'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-5">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
        >
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between px-8 py-7 text-left"
          >
            <h3 className="font-display text-2xl text-ink-900">
              {faq.question}
            </h3>

            <div className="rounded-full bg-oat-50 p-2">
              {open === index ? (
                <MinusIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </div>
          </button>

          <div
            className={`grid transition-all duration-500 ${
              open === index
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-8 pb-8 leading-8 text-ink-900/65">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}