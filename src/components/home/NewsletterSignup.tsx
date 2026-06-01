'use client';

import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement newsletter subscription API call
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Stay Updated
        </h2>
        <p className="text-primary/90 mb-6 text-sm sm:text-base">
          Get the latest products and exclusive deals delivered to your inbox
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 rounded border-0 text-primary"
            disabled={isSubmitted}
          />
          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold rounded transition-colors whitespace-nowrap"
          >
            {isSubmitted ? 'Thank you!' : isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {isSubmitted && (
          <p className="text-white text-sm mt-3">
            ✓ Check your email for a confirmation link
          </p>
        )}
      </div>
    </div>
  );
}
