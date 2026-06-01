'use client';

import Link from 'next/link';
import { SettingsResponse } from '@/types/api';
import NewsletterSignup from '../home/NewsletterSignup';

interface FooterProps {
  settings: SettingsResponse | null;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const companyName = settings?.company_name || settings?.store_name || 'Awal Ecommerce';

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="bg-white">
        <NewsletterSignup />
      </div>

      <div className="container-page py-12 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-3">{companyName}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Your trusted B2B marketplace for industrial switchgears, machinery components, and technical products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/60">
          <p>© {currentYear} {companyName}. All rights reserved.</p>
          <p>{settings?.footer_text || 'Crafted by Awal Technologies'}</p>
        </div>
      </div>
    </footer>
  );
}
