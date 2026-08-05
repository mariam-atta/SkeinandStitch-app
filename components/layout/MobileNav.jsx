'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const CATEGORY_MENU = {
  Women: {
    Clothing: ['Cardigans', 'Sweaters', 'Ponchos'],
    Accessories: ['Beanies', 'Mufflers', 'Gloves'],
  },
  Men: {
    Clothing: ['Cardigans', 'Sweaters'],
    Accessories: ['Beanies', 'Mufflers'],
  },
  Kids: {
    Clothing: ['Cardigans', 'Sweaters'],
    Accessories: ['Beanies', 'Mufflers'],
  },
};

export default function MobileNav({ onClose, isAdmin }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-cream-0">
      <div className="flex items-center justify-between border-b border-stone-200 p-4">
        <span className="font-display text-lg">Menu</span>

        <button
          onClick={onClose}
          className="text-sm font-medium text-ink-900 hover:text-juniper-700 transition-colors"
        >
          Close
        </button>
      </div>

      <nav className="space-y-1 p-4">
        {Object.entries(CATEGORY_MENU).map(([label, groups]) => (
          <Fragment key={label}>
            <button
              onClick={() =>
                setExpanded(expanded === label ? null : label)
              }
              className="flex w-full items-center justify-between py-3 text-left font-medium"
            >
              {label}

              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  expanded === label ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expanded === label && (
              <div className="space-y-3 pl-4 pb-2">
                {Object.entries(groups).map(([groupName, items]) => (
                  <div key={groupName}>
                    <p className="mb-1 text-xs font-semibold uppercase text-clay-600">
                      {groupName}
                    </p>

                    {items.map((item) => (
                      <Link
                        key={item}
                        href={`/shop/${label.toLowerCase()}/${item.toLowerCase()}`}
                        onClick={onClose}
                        className="block py-1 text-sm text-ink-900 hover:text-juniper-700 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        ))}

        <div className="mt-3 border-t border-stone-200 pt-3">
          <Link
            href="/shop/bags"
            onClick={onClose}
            className="block py-3 font-medium hover:text-juniper-700 transition-colors"
          >
            Bags
          </Link>

          <Link
            href="/customize"
            onClick={onClose}
            className="block py-3 font-medium hover:text-juniper-700 transition-colors"
          >
            Customize
          </Link>
        </div>

        {isAdmin && (
          <div className="mt-3 border-t border-stone-200 pt-3">
            <Link
              href="/admin/products"
              onClick={onClose}
              className="block py-3 font-medium text-clay-600 hover:text-clay-500 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}