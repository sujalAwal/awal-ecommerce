'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Questions about products, bulk orders, or technical specs? We're here to help."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <div className="container-page py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="card p-8 text-center animate-slide-up">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600">✓</span>
                </div>
                <h2 className="text-xl font-bold text-primary mb-2">Message sent</h2>
                <p className="text-neutral">We&apos;ll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Your name *" required className="input-field" />
                  <input type="email" name="email" placeholder="Email *" required className="input-field" />
                </div>
                <input type="text" name="company" placeholder="Company (optional)" className="input-field" />
                <input type="text" name="subject" placeholder="Subject *" required className="input-field" />
                <textarea
                  name="message"
                  placeholder="How can we help? *"
                  required
                  rows={5}
                  className="input-field resize-y min-h-[120px]"
                />
                <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto px-8 py-3 disabled:opacity-50">
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="card p-5">
              <h3 className="font-bold text-primary mb-2">Sales & quotes</h3>
              <p className="text-sm text-neutral">Bulk orders and custom procurement requests.</p>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-primary mb-2">Technical support</h3>
              <p className="text-sm text-neutral">Product specs, compatibility, and application guidance.</p>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-primary mb-2">Response time</h3>
              <p className="text-sm text-neutral">Typically within 24 hours on business days.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
