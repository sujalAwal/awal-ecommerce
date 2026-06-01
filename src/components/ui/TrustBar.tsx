const trustItems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: 'Fast Shipping',
    description: 'Same-day dispatch on in-stock items',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Genuine Products',
    description: 'Authorized industrial components',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Expert Support',
    description: 'Technical help when you need it',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Bulk Pricing',
    description: 'Competitive rates for B2B orders',
  },
];

export default function TrustBar() {
  return (
    <section className="relative bg-primary text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,107,53,0.12)_100%)]"
      />
      <div className="container-page relative py-5 sm:py-6">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-4">
          {trustItems.map((item, index) => (
            <li
              key={item.title}
              className="min-w-[78%] shrink-0 snap-center sm:min-w-0"
            >
              <div className="flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm transition-colors hover:bg-white/10 sm:px-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                    0{index + 1}
                  </p>
                  <h3 className="text-sm font-semibold sm:text-base">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-white/65 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
