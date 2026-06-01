import React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <div className="page-hero section-padding !py-10 sm:!py-14">
      <div className="container-page animate-fade-in">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.label}>
                {i > 0 && <span aria-hidden>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-balance">{title}</h1>
            {description && (
              <p className="mt-2 text-base sm:text-lg text-white/80 max-w-2xl">{description}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
