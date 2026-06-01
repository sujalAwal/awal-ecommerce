import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { apiService } from '@/services/api';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Categories | Awal Ecommerce',
  description: 'Browse industrial products by category',
};

export default async function CategoriesPage() {
  const { categories } = await apiService.getCategories(0, 50);

  return (
    <>
      <PageHeader
        title="Categories"
        description="Explore our product catalog organized by category"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]}
      />

      <div className="container-page py-10 sm:py-12">
        {categories.length === 0 ? (
          <div className="card text-center py-16">
            <p className="text-neutral">No categories available yet.</p>
            <Link href="/products" className="btn-primary inline-block mt-4 px-6 py-2.5">
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="card-hover flex items-center gap-4 p-5 group"
              >
                <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden relative flex-shrink-0">
                  {category.icon ? (
                    <Image src={category.icon} alt="" fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-accent/10 text-accent font-bold text-xl">
                      {category.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-primary group-hover:text-accent transition-colors">
                    {category.title}
                  </h2>
                  <p className="text-sm text-neutral mt-0.5">View products →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
