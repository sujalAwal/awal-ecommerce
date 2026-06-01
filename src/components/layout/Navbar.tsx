'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useThemeStore } from '@/stores';
import SearchBar from '../common/SearchBar';
import CartIcon from '../common/CartIcon';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { logo, companyName } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral/10 shadow-nav">
        <div className="container-page py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              {logo ? (
                <Image
                  src={logo}
                  alt={companyName}
                  width={140}
                  height={100}
                  priority
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:bg-accent transition-colors">
                  {companyName.charAt(0)}
                </div>
              )}
              <span className="hidden sm:inline font-bold text-lg text-primary truncate max-w-[180px] lg:max-w-none">
                {companyName}
              </span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <Suspense fallback={<div className="h-10 bg-secondary rounded-lg animate-pulse" />}>
                <SearchBar />
              </Suspense>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-accent bg-accent/10'
                      : 'text-primary/80 hover:text-accent hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <CartIcon />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="md:hidden mt-3">
            <Suspense fallback={<div className="h-10 bg-secondary rounded-lg animate-pulse" />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <MobileMenu
          navLinks={navLinks}
          activePath={pathname}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
