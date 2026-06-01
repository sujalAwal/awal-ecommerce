import Image from 'next/image';
import Link from 'next/link';
import { Brand, Category, Product } from '@/types/api';
import { formatPrice } from '@/lib/utils';
import { getDiscountPercent, normalizeProduct, parsePrice } from '@/lib/product';
import AddToCartButton from '@/components/products/AddToCartButton';

interface ProductDetailViewProps {
  product: Product;
  brand?: Brand | null;
  category?: Category | null;
}

function formatDimension(value: string | number | undefined, unit: string): string | null {
  if (value === undefined || value === null || value === '') return null;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(num)) return null;
  return `${num} ${unit}`;
}

export default function ProductDetailView({ product: raw, brand, category }: ProductDetailViewProps) {
  const product = normalizeProduct(raw);
  const price = parsePrice(product.price);
  const compareAt = parsePrice(product.compare_at_price);
  const discountPercent = getDiscountPercent(price, compareAt);
  const showComparePrice = compareAt > price;
  const stockQty = product.stock_quantity ?? 0;
  const inStock = product.in_stock !== false && stockQty > 0;
  const canOrder = product.can_order !== false;

  const dimensions = [
    { label: 'Weight', value: formatDimension(product.weight_kg, 'kg') },
    { label: 'Length', value: formatDimension(product.length_cm, 'cm') },
    { label: 'Width', value: formatDimension(product.width_cm, 'cm') },
    { label: 'Height', value: formatDimension(product.height_cm, 'cm') },
  ].filter((d) => d.value);

  const metaRows = [
    { label: 'SKU', value: product.sku },
    { label: 'MPN', value: product.mpn },
    { label: 'Country of origin', value: product.country_of_origin },
    {
      label: 'Warranty',
      value: product.warranty != null ? `${product.warranty} months` : undefined,
    },
  ].filter((row) => row.value);

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
      {/* self-start + aspect-square: image must not stretch to match the details column height */}
      <div className="mx-auto w-full max-w-xs self-start sm:max-w-sm lg:mx-0 lg:max-w-md">
        <div className="card relative aspect-square w-full overflow-hidden bg-secondary">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 400px"
            className="object-contain p-3 sm:p-4"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-16 w-16 text-neutral/25 sm:h-24 sm:w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {product.is_featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
            Featured
          </span>
        )}
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          {brand && (
            <Link
              href={`/products?brand=${brand.id}`}
              className="font-semibold text-accent hover:underline"
            >
              {brand.title}
            </Link>
          )}
          {brand && category && <span className="text-neutral/40">·</span>}
          {category && (
            <Link
              href={`/products?category=${category.id}`}
              className="text-neutral hover:text-primary hover:underline"
            >
              {category.title}
            </Link>
          )}
        </div>

        <h1 className="mb-2 text-xl font-bold text-primary sm:text-2xl lg:hidden">{product.title}</h1>

        {product.short_description && (
          <p className="mb-4 text-sm leading-relaxed text-neutral sm:mb-5 sm:text-base">{product.short_description}</p>
        )}

        <div className="mb-4 flex flex-wrap items-end gap-2 sm:mb-5 sm:gap-3">
          <p className="text-2xl font-bold text-accent sm:text-3xl lg:text-4xl">{formatPrice(price)}</p>
          {showComparePrice && (
            <p className="pb-1 text-lg text-neutral line-through">{formatPrice(compareAt)}</p>
          )}
          {(discountPercent !== null || product.is_discount) && discountPercent !== null && (
            <span className="mb-1 rounded-full bg-red-100 px-2.5 py-1 text-sm font-semibold text-red-700">
              {discountPercent}% off
            </span>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {inStock ? (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-800">
              ✓ In stock
              {stockQty > 0 && (
                <span className="font-normal text-green-700">({stockQty} available)</span>
              )}
            </span>
          ) : (
            <span className="inline-flex w-fit items-center rounded-full bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-800">
              Out of stock
            </span>
          )}
          {!inStock && product.allow_backorders && (
            <span className="text-sm text-neutral">Backorders accepted</span>
          )}
        </div>

        {metaRows.length > 0 && (
          <dl className="card mb-6 space-y-2.5 p-3 text-sm sm:space-y-2 sm:p-4">
            {metaRows.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                <dt className="shrink-0 font-semibold text-neutral sm:min-w-[7.5rem]">{label}</dt>
                <dd
                  className={
                    label === 'SKU' || label === 'MPN'
                      ? 'break-all font-mono text-primary'
                      : 'text-primary'
                  }
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <AddToCartButton product={product} disabled={!canOrder} />

        {product.long_description && (
          <div className="mt-8 border-t border-neutral/10 pt-6 sm:mt-10 sm:pt-8">
            <h2 className="mb-2 text-base font-bold text-primary sm:mb-3 sm:text-lg">Description</h2>
            <p className="text-sm leading-relaxed text-neutral sm:text-base">{product.long_description}</p>
          </div>
        )}

        {dimensions.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h2 className="mb-3 text-base font-bold text-primary sm:mb-4 sm:text-lg">Dimensions & weight</h2>
            <div className="card divide-y divide-neutral/10 overflow-hidden">
              {dimensions.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-3 py-2.5 text-sm even:bg-secondary/30 sm:gap-4 sm:px-4 sm:py-3"
                >
                  <span className="font-medium text-neutral">{label}</span>
                  <span className="text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h2 className="mb-3 text-base font-bold text-primary sm:mb-4 sm:text-lg">Specifications</h2>
            <div className="card divide-y divide-neutral/10 overflow-hidden">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-3 py-2.5 text-sm even:bg-secondary/30 sm:gap-4 sm:px-4 sm:py-3"
                >
                  <span className="font-medium capitalize text-neutral">{key.replace(/_/g, ' ')}</span>
                  <span className="text-primary">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
