# Skein & Stitch

A handmade crochet e-commerce storefront — built with Next.js and Supabase. Customers can browse products, filter/sort by category, add to cart or wishlist, check out, and submit custom order requests. Admins manage the product catalog through a protected dashboard.

**Live site:** https://skeinand-stitch-app.vercel.app/

---

## Project Overview

Skein & Stitch is a full-stack e-commerce platform that I designed and developed from the ground up during my internship.

The project provides a complete shopping experience for a handmade crochet business, along with a protected admin dashboard for managing the product catalog.

---

## My Contribution

I designed and developed this project from the ground up during my internship.

My work included:

- Designing and implementing the customer-facing storefront
- Building the product catalog, filtering, sorting, and product detail pages
- Implementing cart and wishlist functionality
- Developing the checkout and order placement flow
- Implementing inventory management with atomic stock updates
- Building the customer review and custom order request functionality
- Designing and implementing the admin dashboard
- Integrating Supabase PostgreSQL, authentication, and Row Level Security
- Developing the backend API routes using Next.js Route Handlers
- Implementing responsive UI and animations using Tailwind CSS and Framer Motion
- Connecting the frontend, backend, and database into a complete full-stack application
- Deploying the application to Vercel

---

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Backend / Database:** Supabase (Postgres, Auth, Row Level Security)
- **API layer:** Next.js Route Handlers (`app/api/*`), using a server-only Supabase `service_role` client for admin writes, order placement, and customize request submissions
- **Icons:** Heroicons
- **Fonts:** Fraunces (display) + Work Sans (body), via `next/font`
- **Deployment:** Vercel

---

## Features

### Storefront
- Home page — hero, shop-by-category tiles, featured products, customer testimonials, customize CTA
- Shop listing (all products, and per category/subcategory) with color, size, price-range, and sort filters
- Product detail pages with image gallery, options, and customer reviews
- Cart and Wishlist — persisted per-browser via `localStorage`, no login required
- Checkout — shipping form, card or cash-on-delivery, order placed via `/api/orders` with atomic inventory decrement, order confirmation with a shareable order detail page (`/orders/[id]`)
- Customize request page — color picker (swatches + gradient slider), size, notes, multi-image upload; submitted via `/api/customize`, which uploads reference images to Supabase Storage and saves the request

### Admin
- `/admin/login` — Supabase Auth email/password login
- `/admin/products` — product list with edit/delete
- `/admin/products/new` and `/admin/products/[id]/edit` — add/edit product form
- Admin-only writes are authorized via a Supabase session token verified server-side in the API routes, not client-side alone
- **Admin demo credentials are available upon request for reviewing the admin dashboard**
---

## Project structure

```
app/
  page.js                     Home
  shop/                       All products, category, and subcategory listings
  product/[slug]/             Product detail
  cart/, wishlist/, checkout/ Cart, wishlist, and checkout pages
  customize/                  Custom order request form
  admin/
    login/                    Admin login (public)
    (protected)/              Session-gated admin routes
  orders/[id]/                Order confirmation / detail page (link shared after checkout)
  api/
    products/                 Public GET, admin POST/PATCH/DELETE
    reviews/                  Testimonials data
    orders/                   POST — places an order (stock decrement + order + order_items)
                               GET /[id] — fetches a single order for the confirmation page
    customize/                POST — uploads reference images to Storage, saves the request

components/                   UI components, grouped by feature (layout, product, cart, wishlist, checkout, customize, admin, home)
context/                      CartContext, WishlistContext (localStorage-backed)
lib/
  supabaseClient.js           Browser Supabase client (publishable key)
  supabaseAdmin.js            Server-only Supabase client (service_role key) — used only in app/api routes
```

---

## Environment variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only, never exposed to the browser
NEXT_PUBLIC_APP_URL=http://localhost:3000          # set to your deployed URL in production
```

The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security — it must only ever be read in server-side code (`app/api/*`, `lib/supabaseAdmin.js`), never in a `'use client'` file.

---

## Database

Tables: `products`, `product_images`, `reviews`, `customize_requests`, `orders`, `order_items`.

Row Level Security is enabled on every table. Products/reviews are publicly readable; inserts/updates/deletes on `products` require an `authenticated` Supabase Auth session (i.e. the logged-in admin). Orders and customize requests are insert-only for the public and are not publicly readable.

Stock is decremented via a Postgres function (`decrement_stock`), called during checkout, which checks and subtracts stock atomically to prevent overselling when two customers buy the last unit at the same time.

**Storage:** a public bucket named `customize-images` must exist (Supabase → Storage) for the customize request form's image uploads to work.

---

## Local development

```bash
npm install
npm run dev
```

Runs at `http://localhost:3000`.

> Note: this project runs the dev server on **Webpack** rather than Turbopack (`"dev": "next dev --webpack"` in `package.json`), due to a Turbopack crash encountered with nested dynamic routes under a route group during development. Production builds (`next build` / Vercel deploys) are unaffected.

---
