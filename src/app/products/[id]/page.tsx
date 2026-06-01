import { notFound } from 'next/navigation';
import { apiService } from '@/services/api';
import { normalizeProduct } from '@/lib/product';
import PageHeader from '@/components/ui/PageHeader';
import ProductDetailView from '@/components/products/ProductDetailView';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const { product } = await apiService.getProductDetail(params.id);
    if (!product) {
      return { title: 'Product Not Found' };
    }
    const normalized = normalizeProduct(product);
    const title = product.meta_title || product.title;
    const description =
      product.meta_description ||
      product.short_description ||
      normalized.description ||
      `Buy ${product.title} online`;

    return {
      title: `${title} | Awal Ecommerce`,
      description,
      openGraph: {
        title,
        description,
        images: product.thumbnail_url ? [product.thumbnail_url] : [],
      },
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let detail: Awaited<ReturnType<typeof apiService.getProductDetail>> | null = null;

  try {
    detail = await apiService.getProductDetail(params.id);
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }

  if (!detail?.product) {
    notFound();
  }

  const { product, brand, category } = detail;

  return (
    <>
      <PageHeader
        title={product.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.title },
        ]}
      />

      <div className="container-page py-6 sm:py-8 lg:py-10">
        <ProductDetailView product={product} brand={brand} category={category} />
      </div>
    </>
  );
}
