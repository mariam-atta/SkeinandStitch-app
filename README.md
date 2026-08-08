# Skein & Stitch

A handmade crochet e-commerce storefront built with Next.js and Supabase. Customers can browse products, filter by category, subcategory, color, size, and price, sort products, add items to their cart or wishlist, check out, and submit custom order requests. Admins can manage the product catalog through a protected dashboard.

**Live Demo:** https://skeinand-stitch-app.vercel.app/

---

## Project Overview

Skein & Stitch is a full-stack e-commerce platform that I designed and developed from the ground up during my internship.

The project provides a complete shopping experience for a handmade crochet business, along with a protected admin dashboard for managing the product catalog.

### What I Built

- Full customer-facing e-commerce storefront
- Product catalog with categories and subcategories
- Product filtering by category, subcategory, color, size, and price
- Product sorting by newest, oldest, and price
- Product detail pages with image galleries and product options
- Cart and wishlist functionality with browser persistence
- Checkout and order placement
- Inventory management with atomic stock updates
- Customer reviews
- Custom order request system
- Protected admin authentication using Supabase Auth
- Admin dashboard for adding, editing, and deleting products
- Supabase PostgreSQL database integration
- Next.js API routes for backend operations
- Responsive UI with Tailwind CSS
- Production deployment through Vercel

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Backend / Database:** Supabase (Postgres, Auth, Row Level Security)
- **API Layer:** Next.js Route Handlers (`app/api/*`)
- **Authentication:** Supabase Auth
- **Icons:** Heroicons
- **Fonts:** Fraunces (display) + Work Sans (body), via `next/font`
- **Deployment:** Vercel

---

## Features

### Storefront

- Home page with:
  - Hero section
  - Shop-by-category tiles
  - Featured products
  - Customer testimonials
  - Customization call-to-action

- Shop listing for all products and individual categories/subcategories

- Product filtering by:
  - Category
  - Subcategory
  - Color
  - Size
  - Price range

- Product sorting by:
  - Newest
  - Oldest
  - Price: Low to High
  - Price: High to Low

- Product detail pages with:
  - Product image gallery
  - Color selection
  - Size selection
  - Quantity selection
  - Customer reviews

- Cart and Wishlist functionality
  - Persisted per-browser using `localStorage`
  - No customer login required

- Checkout with:
  - Shipping information
  - Card payment option
  - Cash on delivery
  - Inventory validation
  - Order confirmation

- Inventory management with atomic stock decrementing to help prevent overselling

- Custom order request page with:
  - Color picker
  - Color swatches
  - Gradient color slider
  - Size selection
  - Notes
  - Image selection

- Customer reviews

### Admin

- `/admin/login` — Supabase Auth email/password login
- `/admin/products` — product management dashboard
- `/admin/products/new` — add new product
- `/admin/products/[id]/edit` — edit existing product
- Product deletion functionality
- Protected admin routes
- Server-side authorization for admin API operations
- Product and inventory management through the admin dashboard

> **Admin Demo:** Admin access is available for demonstration purposes. Credentials can be provided upon request.

---

## Project Structure

```text
app/
  page.js                     Home
  shop/                       All products, category, and subcategory listings
  product/[slug]/             Product detail
  cart/                       Shopping cart
  wishlist/                   Wishlist
  checkout/                   Checkout
  customize/                  Custom order request form

  admin/
    login/                    Admin login
    (protected)/              Session-gated admin routes

  api/
    products/                 Public GET, admin POST/PATCH/DELETE
    reviews/                  Reviews and testimonials
    ...

components/
  layout/
  product/
  cart/
  wishlist/
  checkout/
  customize/
  admin/
  home/

context/
  CartContext
  WishlistContext

lib/
  supabaseClient.js           Browser Supabase client
  supabaseAdmin.js            Server-only Supabase client
