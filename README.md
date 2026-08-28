# Elegant Living

A frontend-only furniture e-commerce demo built with React and Tailwind CSS — browse a catalog, manage a stock-aware cart, and complete a simulated checkout with form validation.

## Live Demo

**[elegant-living.vercel.app](https://elegant-living.vercel.app/)**

## Overview

Elegant Living is a single-page React application that presents a curated catalog of **6 furniture products**. It demonstrates a complete storefront flow — **browse → product detail → add to cart → quantity management → checkout validation → order confirmation** — entirely in the browser.

There is no backend: the catalog is static seed data, cart and inventory state live in the React Context API, and everything persists to `localStorage`. The checkout and order flow are simulated client-side.

## Key Features

- **Product catalog** — responsive grid of furniture items with pricing and stock status.
- **Product detail pages** — dynamic routes with an image gallery and stock-aware "Add to Cart".
- **Stock-aware cart** — a slide-over cart where quantity controls respect available stock and disable when items run out.
- **Persistent state** — cart and product state survive page reloads via `localStorage`.
- **Validated checkout** — a form with inline validation that gates order submission until all fields are valid.
- **Order confirmation** — a simulated order flow that generates a unique order ID and shows a confirmation screen.

## Engineering Highlights

- **Centralized state model** — the React **Context API** provides a single source of truth for products and cart, with all mutations (add, increase, decrease, remove, clear) defined in one provider.
- **Stock-aware cart mutations** — adding or adjusting quantities decrements/restores inventory and blocks actions on out-of-stock items.
- **`localStorage` persistence** — cart and product state are synced to storage with `useEffect`.
- **Lazy state initialization** — state is hydrated from `localStorage` using a `useState` initializer function, avoiding redundant reads.
- **Derived state** — cart count and cart total are computed from the cart at render rather than stored redundantly.
- **Form validation** — `react-hook-form` in `onChange` mode with regex rules, inline error messages, and a submit button disabled until the form is valid.
- **Unique order IDs** — generated with `uuid` on order confirmation.
- **Dynamic routing** — React Router serves a catalog route and a slug-based product detail route.
- **Reusable components** — shared product card, modals, an inline SVG icon set, and a number-formatting utility.
- **Responsive UI** — built with Tailwind CSS utility classes across breakpoints.

## Tech Stack

- **React 19** (JavaScript / JSX)
- **Vite** — build tooling and dev server
- **Tailwind CSS v4** — styling
- **React Router** — client-side routing
- **React Context API** — state management
- **localStorage** — persistence
- **react-hook-form** — form validation
- **uuid** — order ID generation

## Project Structure

```
src/
├── main.jsx                 # Entry point; wraps App in the Context provider
├── App.jsx                  # Layout and routes
├── index.css                # Tailwind import and fonts
├── context/ShopContext.jsx  # Global state: products, cart, stock
├── data/data.js             # Static catalog of 6 products
├── hooks/                   # Reusable React hooks (useFocusTrap)
├── utils/                   # Number-formatting utility (formatNumber)
├── pages/                   # Home (catalog) and Product (detail)
└── components/              # Navbar, Footer, Cart, cards, modals, SVG icons
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173/`).

Additional scripts:

```bash
npm run build     # Production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Scope / Known Limitations

This is a **front-end demonstration project**, not a production store:

- **No backend, API, or database** — the catalog is static and state is held in the browser.
- **No authentication or payment processing** — checkout is simulated; no order is submitted anywhere.
- **Inventory is client-side** — stock is React state persisted to `localStorage`, not server-backed.
- **No automated tests** are included.
