import Link from 'next/link';
import { classNames } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  centered?: boolean;
  variant?: 'default' | 'accent' | 'minimal';
  inverted?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  eyebrow,
  viewAllHref,
  viewAllLabel = 'View all',
  centered = false,
  variant = 'default',
  inverted = false,
}: SectionHeadingProps) {
  const titleColor = inverted ? 'text-white' : 'text-primary/90';
  const subtitleColor = inverted ? 'text-white/75' : 'text-neutral';
  const linkColor = inverted ? 'text-white hover:text-accent' : 'text-accent';

  if (variant === 'minimal') {
    return (
      <div className={classNames('mb-6 sm:mb-8', centered && 'text-center')}>
        {eyebrow && (
          <p className={classNames('text-xs font-semibold uppercase tracking-widest mb-2', inverted ? 'text-accent' : 'text-accent')}>
            {eyebrow}
          </p>
        )}
        <div className={classNames(centered ? 'mx-auto' : 'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3')}>
          <h2 className={classNames('text-xl sm:text-2xl font-bold', titleColor)}>{title}</h2>
          {viewAllHref && !centered && (
            <Link href={viewAllHref} className={classNames('text-sm font-semibold inline-flex items-center gap-1', linkColor)}>
              {viewAllLabel} <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'mb-8 sm:mb-10',
        centered ? 'text-center' : 'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4',
        variant === 'accent' && !centered && 'border-l-4 border-accent pl-5 sm:pl-6'
      )}
    >
      <div className={classNames(centered ? 'mx-auto max-w-2xl' : '', variant === 'accent' && centered && 'border-l-0 pl-0')}>
        {eyebrow && (
          <p className={classNames('text-xs font-semibold uppercase tracking-widest mb-2', inverted ? 'text-accent' : 'text-accent')}>
            {eyebrow}
          </p>
        )}
        <h2 className={classNames('text-2xl sm:text-3xl font-bold', titleColor)}>{title}</h2>
        {subtitle && (
          <p className={classNames('mt-2 text-sm sm:text-base', subtitleColor)}>{subtitle}</p>
        )}
        {viewAllHref && centered && (
          <Link
            href={viewAllHref}
            className={classNames('inline-flex items-center gap-1 mt-4 font-semibold hover:gap-2 transition-all', linkColor)}
          >
            {viewAllLabel}
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      {viewAllHref && !centered && (
        <Link
          href={viewAllHref}
          className={classNames('hidden sm:inline-flex items-center gap-1 font-semibold hover:gap-2 transition-all', linkColor)}
        >
          {viewAllLabel}
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
