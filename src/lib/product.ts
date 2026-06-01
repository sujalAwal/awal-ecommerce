import { Brand, Category, Product } from '@/types/api';

export function parsePrice(value: string | number | undefined | null): number {
  if (value === undefined || value === null) return 0;
  return typeof value === 'string' ? parseFloat(value) : value;
}

export function normalizeProduct(raw: Product): Product {
  const stockQuantity = raw.stock_quantity ?? 0;
  const inStock = stockQuantity > 0;
  const allowBackorders = raw.allow_backorders ?? false;

  return {
    ...raw,
    description: raw.long_description || raw.short_description || raw.description,
    in_stock: raw.in_stock ?? inStock,
    can_order: raw.can_order ?? (inStock || allowBackorders),
  };
}

export function getDiscountPercent(price: number, compareAt: number): number | null {
  if (compareAt <= price || compareAt <= 0) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function findById<T extends { id: string }>(items: T[], id: string | undefined): T | undefined {
  if (!id) return undefined;
  const normalized = id.toLowerCase();
  return items.find((item) => item.id.toLowerCase() === normalized);
}

export function resolveBrandAndCategory(
  product: Product,
  brands: Brand[],
  categories: Category[]
): { brand?: Brand; category?: Category } {
  return {
    brand: findById(brands, product.brand_id),
    category: findById(categories, product.category_id),
  };
}
