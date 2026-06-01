'use client';

import Link from 'next/link';
import React from 'react';

interface MobileMenuProps {
  navLinks: Array<{ href: string; label: string }>;
  activePath: string;
  onClose: () => void;
}

export default function MobileMenu({ navLinks, activePath, onClose }: MobileMenuProps) {
  const isActive = (href: string) => {
    if (href === '/') return activePath === '/';
    return activePath.startsWith(href);
  };

  return (
    <div className="fixed inset-0 top-[calc(4rem+1px)] bg-black/40 lg:hidden z-30 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white max-h-[calc(100vh-5rem)] overflow-y-auto shadow-lg rounded-b-2xl mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'bg-accent/10 text-accent'
                  : 'text-primary hover:bg-secondary'
              }`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
