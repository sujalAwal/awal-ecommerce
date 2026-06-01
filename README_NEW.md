# Awal Ecommerce - B2B Industrial Products Platform

A modern, high-performance Next.js ecommerce application built for B2B buyers looking for industrial products, switchgears, and technical components. Built with Server-Side Rendering, Core Web Vitals optimization, and responsive design.

## 🚀 Features

### Performance & SEO
- ✅ Server-Side Rendering (SSR) with Next.js 14
- ✅ Optimized images with next/image (WebP/AVIF support)
- ✅ Zero Layout Shift with CSS variables injected in HTML
- ✅ JSON-LD Structured Schema Markup for rich snippets
- ✅ Dynamic meta tags and SEO-friendly URLs
- ✅ Core Web Vitals optimized (LCP, FID, CLS)

### Technical UI/UX for B2B
- ✅ Advanced product filtering (Brand, Category, Stock Status)
- ✅ High-fidelity MPN, SKU, and Availability display
- ✅ Bulk ordering support with quantity controls
- ✅ Technical specification search capabilities
- ✅ Dense information architecture for engineering buyers

### Responsive Design
- ✅ Mobile-first design with full tablet/desktop support
- ✅ Adaptive navigation (hamburger menu on mobile)
- ✅ Touch-friendly controls and thumb-zone optimization
- ✅ Horizontal scrolling tables for technical specs
- ✅ Flexible grid layouts for all screen sizes

### E-commerce Features
- ✅ Product catalog with API integration
- ✅ Dynamic branding from backend (logo, colors, fonts)
- ✅ Shopping cart with persistent state (localStorage)
- ✅ Guest checkout flow
- ✅ Secure order processing ready
- ✅ Banner carousel (6-second auto-rotate)
- ✅ Brands and categories showcase

## 📋 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with SSR settings
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── products/
│   │   └── page.tsx            # Products listing with filters
│   ├── cart/
│   │   └── page.tsx            # Shopping cart
│   └── checkout/
│       └── page.tsx            # Checkout flow
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer with CTA
│   │   ├── RootLayoutClient.tsx # Client-side layout wrapper
│   │   └── MobileMenu.tsx      # Mobile navigation
│   ├── home/
│   │   ├── BannerCarousel.tsx  # 6-second rotating banner
│   │   ├── BrandsSection.tsx   # Featured brands
│   │   ├── PopularProducts.tsx # Best sellers
│   │   ├── CategoriesSection.tsx # Category showcase
│   │   └── NewsletterSignup.tsx # Email signup
│   ├── products/
│   │   ├── ProductCard.tsx     # Product display card
│   │   └── ProductFilter.tsx   # Sidebar filters
│   └── common/
│       ├── SearchBar.tsx       # Global search
│       └── CartIcon.tsx        # Cart indicator
├── services/
│   └── api.ts                  # API client with axios
├── stores/
│   └── index.ts                # Zustand stores (cart, theme, filters)
├── types/
│   └── api.ts                  # TypeScript types
├── hooks/                       # Custom React hooks (ready for expansion)
└── lib/                         # Utility functions (ready for expansion)

public/                          # Static assets

Configuration Files:
- next.config.ts                # Next.js config with image optimization
- tailwind.config.ts            # Tailwind CSS with theme variables
- tsconfig.json                 # TypeScript configuration
- postcss.config.js             # PostCSS setup
- .env.local                    # Environment variables
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, SSR)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand (cart, theme, filters)
- **HTTP Client**: Axios
- **Image Optimization**: next/image with Sharp
- **Responsive**: Mobile-first design pattern

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   ```bash
   # .env.local already created with:
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_APP_NAME=Awal Ecommerce
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔌 API Integration

The app fetches data from these backend endpoints:

### Settings (Server-side)
```
GET /api/v1/public/settings/
→ Returns: logo, favicon, primary_color, secondary_color, company_name, etc.
```

### Brands
```
GET /api/v1/public/brands/?skip=0&limit=12
→ Returns: id, name, title, logo, description
```

### Categories
```
GET /api/v1/public/categories/?skip=0&limit=20
→ Returns: id, name, title, icon, description
```

### Products
```
GET /api/v1/public/products/?skip=0&limit=20&in_stock_only=false&category_id=...&brand_id=...&search=...
→ Returns: id, title, name, price, thumbnail_url, brand_id, category_id, mpn, sku, availability, in_stock
```

## 🎨 Theming

Colors and branding are dynamically injected from the API:

1. **Server-side** (`layout.tsx`): Fetches settings and injects CSS variables
2. **Client-side** (`RootLayoutClient.tsx`): Syncs theme to Zustand store
3. **Tailwind**: Uses CSS variables for primary, secondary, accent, neutral colors

Example CSS variables:
```css
--color-primary: 0 0 0;
--color-secondary: 243 243 243;
--color-accent: 255 107 53;
--color-neutral: 128 128 128;
--font-family: -apple-system, BlinkMacSystemFont, ...;
```

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px` (sm)
- **Tablet**: `640px - 1024px` (md, lg)
- **Desktop**: `> 1024px` (xl)

Key responsive behaviors:
- Navbar: Logo → Search → Icons (desktop) vs Logo → Icons → Menu (mobile)
- Products Grid: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
- Sidebar Filters: Collapsible on mobile, sticky on desktop
- Banner: Adjusted heights for each screen size

## 🛒 Cart & Checkout

### Cart Management
- **Storage**: Persisted to localStorage via Zustand
- **State**: `useCartStore` hook for global access
- **Features**: Add, remove, quantity update, total calculation

### Checkout Flow
1. **Shipping** - Guest checkout by default
2. **Payment** - Multiple payment method options
3. **Confirmation** - Order success page

## 🔍 SEO Features

- ✅ Dynamic page titles and meta descriptions
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD Product Schema (ready to implement)
- ✅ Clean URL hierarchy: `/categories/switchgears/circuit-breakers`
- ✅ Sitemap support (ready for implementation)
- ✅ Canonical URLs

## ⚡ Performance Optimizations

- Next.js Image component with automatic WebP/AVIF conversion
- Server-side rendering for fast first paint
- CSS-in-HTML for theme variables (prevents layout shift)
- Code splitting and lazy loading
- Static asset caching headers
- API response caching strategies

## 📝 Development Guidelines

### Adding a New Page
1. Create file in `src/app/[page]/page.tsx`
2. Add metadata for SEO
3. Use `useCartStore`, `useThemeStore` for global state
4. Import and use `apiService` for data

### Creating a New Component
1. Decide if client (`'use client'`) or server component
2. Place in `src/components/[category]/`
3. Export types in `src/types/api.ts`
4. Use Tailwind for styling

### API Calls
```typescript
import { apiService } from '@/services/api';

const { products, total, hasMore } = await apiService.getProducts(0, 20, {
  categoryId: 'cat-123',
  inStockOnly: true,
});
```

## 🚀 Deployment

### Vercel (Recommended for Next.js)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance Metrics

Target Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

Monitor using:
- Lighthouse CI
- Web Vitals npm package
- Vercel Analytics

## 🔐 Security

- Environment variables for API keys
- CORS configuration for API
- Input validation on forms
- XSS protection (React built-in)
- CSRF protection (ready for implementation)

## 📞 Support & Contributing

For issues, feature requests, or contributions, please open an issue or pull request.

## 📄 License

This project is proprietary software developed for Awal Ecommerce.

---

**Built with ❤️ for B2B industrial buyers**
