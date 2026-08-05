# Skein & Stitch — Crochet Store

## Setup

```bash
cd crochet-store
npm install
npm run dev
```

Runs at http://localhost:3000

## What's built so far

- `app/layout.js` — root layout, wires Header + Footer + fonts globally
- `app/page.js` — placeholder Home page (to be replaced)
- `components/layout/` — Header, Footer, Container, NavDropdown (desktop mega-menu),
  MobileNav (mobile slide-out), ChainStitchDivider (signature visual element)

## Still empty (structure only, no code yet)

- `app/shop/[category]/[subcategory]` — category/subcategory listing pages
- `app/product/[slug]` — single product page
- `app/customize` — customization request form page
- `app/cart`, `app/checkout`, `app/wishlist` — cart/checkout/wishlist pages
- `app/api/*` — your backend routes (products, cart, orders, customize) — these are
  yours to build per our agreement (you're handling backend + DB)
- `components/product/`, `components/cart/`, `components/customize/`,
  `components/wishlist/`, `components/ui/` — corresponding UI components, built page by page
- `context/` — CartContext (and any WishlistContext) — you're wiring real state here;
  Header currently accepts `cartCount` / `wishlistCount` as props with default 0

## Data contract

UI components are built to expect data as **props** — no mock data files. Confirmed shapes:

**Product**
```
{ id, name, slug, price, salePrice, category, subcategory, images: [], colors: [], sizes: [], stock, description, rating, reviewCount }
```

**Cart item**: Product fields + `quantity`, `selectedColor`, `selectedSize`

**Customization request**: name, contact, product type, color(s), size, notes, image upload

**Review**: `{ userName, rating, comment, date }`

## Design tokens (Tailwind, see `tailwind.config.js`)

- `oat-50` #F3ECE0 — background
- `ink-900` #24222B — text
- `juniper-700` #3F5A45 — primary accent
- `clay-600` #B5583A — secondary accent (used sparingly)
- `stone-200` #D9CFBF — borders
- `cream-0` #FFFDFA — surfaces/cards
- Display font: Fraunces (`font-display`) — headings only
- Body font: Work Sans (`font-body`)
