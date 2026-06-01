// Utility functions for formatting and common operations

export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(numPrice);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const generateProductSchema = (product: any): object => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.thumbnail_url,
    brand: {
      '@type': 'Brand',
      name: product.brand_name,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.in_stock ? 'InStock' : 'OutOfStock',
    },
    mpn: product.mpn,
    sku: product.sku,
  };
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const classNames = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
