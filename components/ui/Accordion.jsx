'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Accordion({
  question,
  answer,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-[24px] border border-stone-200 bg-white p-6 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-medium text-ink-900">
          {question}
        </h3>

        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-500 ${
          open ? 'grid-rows-[1fr] mt-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="leading-8 text-ink-900/60">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}