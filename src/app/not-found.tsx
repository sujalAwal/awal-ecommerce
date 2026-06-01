import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page py-24 sm:py-32 text-center">
      <p className="text-6xl sm:text-8xl font-bold text-accent/20">404</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mt-4 mb-2">Page not found</h1>
      <p className="text-neutral mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="btn-primary px-8 py-3">
          Go Home
        </Link>
        <Link href="/products" className="btn-outline px-8 py-3">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
