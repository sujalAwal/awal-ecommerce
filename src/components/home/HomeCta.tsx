import Link from 'next/link';

const stats = [
  { value: '10K+', label: 'SKUs in catalog' },
  { value: '24/7', label: 'Technical support' },
  { value: '48h', label: 'Avg. B2B dispatch' },
];

export default function HomeCta() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white lg:grid lg:grid-cols-2">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/30 to-transparent lg:hidden"
          />

          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <p className="text-s font-semibold uppercase tracking-widest text-accent text-black">Get started</p>
            <h2 className="mt-3 text-2xl font-bold text-balance sm:text-3xl lg:text-4xl">
              Find the right component for your project
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
              Search by MPN, SKU, or category. Millions of industrial parts in stock with fast B2B fulfillment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary px-8 py-3 text-center text-base">
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="btn border-2 border-white/80 px-8 py-3 text-center text-base text-white hover:bg-white hover:text-primary"
              >
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10 bg-white/5 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Why teams choose us</p>
            <ul className="mt-6 space-y-5">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-2xl font-bold text-accent sm:text-3xl text-white">{stat.value}</span>
                  <span className="text-sm text-white/80">{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
