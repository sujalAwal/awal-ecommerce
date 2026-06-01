import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import TrustBar from '@/components/ui/TrustBar';

export const metadata: Metadata = {
  title: 'About Us | Awal Ecommerce',
  description: 'Learn about our B2B industrial marketplace and mission',
};

const values = [
  {
    title: 'Quality First',
    description: 'Every product is sourced from authorized distributors and verified for industrial use.',
  },
  {
    title: 'B2B Focused',
    description: 'Bulk pricing, MPN/SKU search, and fulfillment built for procurement teams.',
  },
  {
    title: 'Reliable Delivery',
    description: 'Fast shipping on in-stock items with transparent order tracking.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Your trusted partner for industrial components and switchgear solutions"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <div className="container-page py-12 sm:py-16 max-w-3xl">
        <p className="text-lg text-neutral leading-relaxed mb-8">
          Awal Ecommerce connects B2B buyers with premium industrial switchgears, machinery components,
          and technical products. We combine a modern shopping experience with the reliability procurement
          teams expect—from accurate catalog data to responsive support.
        </p>

        <div className="grid gap-6 sm:grid-cols-3 mb-12">
          {values.map((v) => (
            <div key={v.title} className="card p-5">
              <h3 className="font-bold text-primary mb-2">{v.title}</h3>
              <p className="text-sm text-neutral leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

        <Link href="/contact" className="btn-primary px-8 py-3">
          Get in Touch
        </Link>
      </div>

      <TrustBar />
    </>
  );
}
