'use client';

import Image from 'next/image';
import { CheckIcon } from '@heroicons/react/24/solid';

const PRODUCTS = [
  {
  name: "Cardigan",
  image: "/images/Customize/Button-Front-Cardigan.jpg",
},

{
  name: "Sweater",
  image: "/images/Customize/Cable-Sweater.jpg",
},

{
  name: "Beanie",
  image: "/images/Customize/Cable-Beanie.jpg",
},

{
  name: "Muffler",
  image: "/images/Customize/Crochet-Muffler.jpg",
},

{
  name: "Bag",
  image: "/images/Customize/Tote-Bag.jpg",
},

{
  name: "Other",
  image: "/images/Customize/Others.jpg",
},
];

export default function ProductSelector({
  selected,
  onChange,
}) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
      {PRODUCTS.map((product) => {
        const active = selected === product.name;

        return (
          <button
            key={product.name}
            type="button"
            onClick={() => onChange(product.name)}
            className={`group overflow-hidden rounded-[24px] border transition-all duration-500 ${
              active
                ? 'border-juniper-700 shadow-xl'
                : 'border-stone-200 hover:-translate-y-2 hover:border-juniper-700 hover:shadow-xl'
            }`}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {active && (
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg">
                  <CheckIcon className="h-5 w-5 text-juniper-700" />
                </div>
              )}

              <div className="absolute bottom-5 left-5">
                <h3 className="font-display text-2xl text-white">
                  {product.name}
                </h3>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}