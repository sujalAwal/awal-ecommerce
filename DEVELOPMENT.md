# Development Guide

## Project Overview

This is a modern, high-performance Next.js ecommerce platform for B2B industrial product sellers. It emphasizes:
- **Performance**: SSR, image optimization, Core Web Vitals
- **Technical UX**: MPN/SKU display, bulk ordering, advanced filtering
- **Responsiveness**: Mobile-first design across all devices
- **Extensibility**: Well-organized component structure and API integration

## Architecture

### Component Organization
```
components/
├── layout/          - Navbar, Footer, Layout wrappers
├── home/            - Home page sections (banners, products, categories)
├── products/        - Product listing, cards, filters
└── common/          - Reusable components (search, cart icon)
```

### State Management
- **useCartStore**: Shopping cart state with localStorage persistence
- **useThemeStore**: Theme colors and branding from API
- **useFilterStore**: Product filtering state

### API Layer
All API calls go through `src/services/api.ts`:
```typescript
// Example
const { products, total, hasMore } = await apiService.getProducts(skip, limit, filters);
```

## Adding New Features

### Add a new page
1. Create directory: `src/app/new-page/`
2. Add `page.tsx` with metadata
3. Use API service for data
4. Add navigation link in Navbar

### Add a new component
1. Create: `src/components/category/Component.tsx`
2. Mark with `'use client'` if interactive
3. Use Tailwind for styling
4. Export types in `src/types/api.ts`

### Add a new API endpoint
1. Update `src/services/api.ts` with new method
2. Add response type to `src/types/api.ts`
3. Use in components with proper error handling

## Code Style

### TypeScript
- Always define prop interfaces
- Use strict mode (already enabled)
- Avoid `any` types

### Component Structure
```typescript
'use client';

import React from 'react';
import type { SomeType } from '@/types/api';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export default function MyComponent({ prop1, prop2 }: ComponentProps) {
  return <div>{prop1}</div>;
}
```

### Styling
- Use Tailwind utility classes
- Mobile-first approach: `sm:`, `md:`, `lg:`, `xl:`
- Avoid inline styles except for dynamic values

## Common Patterns

### Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
  {/* Items */}
</div>
```

### Conditional Rendering
```tsx
{isLoading ? (
  <LoadingSpinner />
) : items.length > 0 ? (
  <ItemList items={items} />
) : (
  <EmptyState />
)}
```

### Server-side Data Fetching
```tsx
// In page.tsx
export default async function Page() {
  const data = await apiService.getData();
  return <Component data={data} />;
}
```

### Client-side State
```tsx
'use client';

export default function Component() {
  const store = useCartStore();
  // Use store.items, store.addItem(), etc.
}
```

## Performance Tips

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src={url}
  alt="description"
  width={400}
  height={400}
  priority // For above-the-fold images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Lazy Loading
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <Skeleton />,
});
```

### API Caching
The axios client is configured with timeout and interceptors. For more aggressive caching:
```typescript
const response = await apiClient.get(url, {
  params: { ...params },
  headers: { 'Cache-Control': 'max-age=300' },
});
```

## Testing

### Manual Testing Checklist
- [ ] Mobile responsiveness (375px, 768px, 1440px)
- [ ] Search functionality works
- [ ] Cart add/remove operations
- [ ] Checkout flow without errors
- [ ] API errors handled gracefully
- [ ] Images load properly

### Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli@latest
lhci autorun
```

## Common Issues & Solutions

### Issue: Images not loading
- Check image URL in API response
- Verify CORS if using external images
- Check `next.config.ts` remotePatterns

### Issue: Styles not applied
- Check Tailwind config includes your file
- Verify class names are spelled correctly
- Clear `.next` folder and rebuild

### Issue: API calls failing
- Check `.env.local` has correct API URL
- Verify backend is running
- Check network tab in dev tools
- Add console logs in `src/services/api.ts`

### Issue: Cart state lost on refresh
- Confirm localStorage is enabled
- Check browser storage quota
- Verify Zustand persist middleware is loaded

## Database Schema Expectations

### Products Table
```
id, title, name, price, thumbnail_url, brand_id, category_id, 
mpn, sku, availability, country_of_origin, in_stock, description, specifications
```

### Brands Table
```
id, name, title, logo, description
```

### Categories Table
```
id, name, title, icon, description
```

### Settings Table
```
logo, favicon, primary_color, secondary_color, accent_color, neutral_color,
font_family, company_name, footer_text
```

## Environment Variables

### Required
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Optional
```env
NEXT_PUBLIC_APP_NAME=Awal Ecommerce
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Debugging

### Enable verbose logging
```typescript
// In src/services/api.ts
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

### Browser DevTools
- Network tab: Check API requests/responses
- Console: Look for errors
- Application > Local Storage: Check cart state
- Performance: Check Core Web Vitals

## Next Steps for Enhancement

1. **Payment Integration**: Stripe, Razorpay
2. **Authentication**: NextAuth.js for user accounts
3. **Admin Dashboard**: Order management, inventory
4. **Search Enhancement**: Elasticsearch, Algolia
5. **Analytics**: Google Analytics, custom event tracking
6. **Email**: Order confirmation, newsletters
7. **Wishlist**: Save favorite products
8. **Reviews**: User ratings and reviews

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/)
- [React Patterns](https://react.dev/learn)
- [Web Vitals](https://web.dev/vitals/)

## Support

For questions or issues:
1. Check existing component examples
2. Review TypeScript types
3. Check API documentation
4. Review deployment guide
