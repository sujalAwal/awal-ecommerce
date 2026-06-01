'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: 'Industrial Excellence',
    subtitle: 'Premium switchgears and machinery components',
    image: 'https://afbesiqwuxmtykgenkca.supabase.co/storage/v1/object/sign/cineq/emst/banner/pr-banner.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jY2NkYWRkZi1iNDM1LTQ3ZDItYWE2Yy1kZmY5MGE0NDUzZTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaW5lcS9lbXN0L2Jhbm5lci9wci1iYW5uZXIucG5nIiwiaWF0IjoxNzgwMjkyOTU1LCJleHAiOjIwOTU2NTI5NTV9.bfvMJxMyy7xWqD_-OSR1iwvh1o-IkhN_XILm69CHKEo',
    cta: 'Shop Now',
    link: '/products',
  },
  {
    id: 2,
    title: 'Fast Delivery',
    subtitle: 'Same-day shipping on stock items',
    image: 'https://afbesiqwuxmtykgenkca.supabase.co/storage/v1/object/sign/cineq/emst/delivering_products.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jY2NkYWRkZi1iNDM1LTQ3ZDItYWE2Yy1kZmY5MGE0NDUzZTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaW5lcS9lbXN0L2RlbGl2ZXJpbmdfcHJvZHVjdHMucG5nIiwiaWF0IjoxNzgwMjk0MDA1LCJleHAiOjIxNTg3MjYwMDV9.gKtpkSNOPpm-Nn0EsOmYDU9bpEc1avsfjhutKa2uyU8',
    cta: 'Explore',
    link: '/products?fast-delivery=true',
  },
  {
    id: 3,
    title: 'Bulk Orders Welcome',
    subtitle: 'Competitive pricing for large quantities',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70db4c22?w=1200&h=600&fit=crop',
    cta: 'Get Quote',
    link: '/contact',
  },
  {
    id: 4,
    title: 'Expert Support',
    subtitle: '24/7 technical assistance available',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    cta: 'Contact Us',
    link: '/contact',
  },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000); // 6 second interval as specified

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlay(false);
  };

  return (
    <div
      className="relative w-full h-80 sm:h-[420px] lg:h-[520px] overflow-hidden rounded-2xl shadow-card"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center px-6 sm:px-12 lg:px-16">
              <div className="text-left text-white max-w-xl animate-slide-up">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                  {banner.title}
                </h1>
                <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-gray-100">
                  {banner.subtitle}
                </p>
                <Link
                  href={banner.link}
                  className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {banner.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
        aria-label="Previous banner"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
        aria-label="Next banner"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
