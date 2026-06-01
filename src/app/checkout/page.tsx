'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, useCheckoutStore } from '@/stores';
import { formatPrice } from '@/lib/utils';
import PageHeader from '@/components/ui/PageHeader';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const { form, isGuest, setForm, setIsGuest } = useCheckoutStore();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <>
        <PageHeader title="Checkout" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Checkout' }]} />
        <div className="container-page py-16 text-center">
          <p className="text-neutral mb-4">Your cart is empty.</p>
          <Link href="/products" className="btn-primary px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearCart();
      setCurrentStep('confirmation');
    } catch {
      alert('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === 'confirmation') {
    return (
      <div className="container-page py-20 sm:py-28 text-center animate-slide-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">Order confirmed</h1>
        <p className="text-neutral mb-8 max-w-md mx-auto">
          Thank you for your order. You&apos;ll receive a confirmation email at {form.email || 'your email'} shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <button type="button" onClick={() => router.push('/')} className="btn-primary py-3">
            Continue Shopping
          </button>
          <button type="button" onClick={() => router.push('/products')} className="btn-outline py-3">
            Browse More
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'shipping', label: 'Shipping', num: 1 },
    { id: 'payment', label: 'Payment', num: 2 },
  ] as const;

  return (
    <>
      <PageHeader
        title="Checkout"
        description="Complete your order in a few simple steps"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
      />

      <div className="container-page py-8 sm:py-10">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 max-w-md mx-auto">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentStep === step.id || (step.id === 'shipping' && currentStep === 'payment')
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-neutral'
                  }`}
                >
                  {currentStep === 'payment' && step.id === 'shipping' ? '✓' : step.num}
                </div>
                <span className="text-xs font-medium text-neutral">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 max-w-[80px] ${currentStep === 'payment' ? 'bg-accent' : 'bg-neutral/20'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-primary mb-6">Shipping information</h2>

                <label className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 mb-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGuest}
                    onChange={(e) => setIsGuest(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-neutral"
                  />
                  <span>
                    <span className="font-semibold block">Guest checkout</span>
                    <span className="text-sm text-neutral">No account required</span>
                  </span>
                </label>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name *"
                      value={form.firstName || ''}
                      onChange={(e) => setForm({ firstName: e.target.value })}
                      required
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="Last name *"
                      value={form.lastName || ''}
                      onChange={(e) => setForm({ lastName: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={form.email || ''}
                    onChange={(e) => setForm({ email: e.target.value })}
                    required
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Street address *"
                    value={form.address || ''}
                    onChange={(e) => setForm({ address: e.target.value })}
                    required
                    className="input-field"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City *"
                      value={form.city || ''}
                      onChange={(e) => setForm({ city: e.target.value })}
                      required
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="State *"
                      value={form.state || ''}
                      onChange={(e) => setForm({ state: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="ZIP code *"
                      value={form.zipCode || ''}
                      onChange={(e) => setForm({ zipCode: e.target.value })}
                      required
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="Country *"
                      value={form.country || ''}
                      onChange={(e) => setForm({ country: e.target.value })}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-8 py-3">
                  Continue to payment
                </button>
              </form>
            )}

            {currentStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="card p-6 sm:p-8">
                <h2 className="text-xl font-bold text-primary mb-6">Payment method</h2>

                <div className="space-y-3">
                  {[
                    { value: 'card', label: 'Credit / Debit Card' },
                    { value: 'upi', label: 'UPI' },
                    { value: 'bank', label: 'Bank Transfer' },
                  ].map((method, i) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        i === 0 ? 'border-accent bg-accent/5' : 'border-neutral/15 hover:border-neutral/30'
                      }`}
                    >
                      <input type="radio" name="payment" value={method.value} defaultChecked={i === 0} className="w-4 h-4" />
                      <span className="font-semibold">{method.label}</span>
                    </label>
                  ))}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-8 py-3 disabled:opacity-50">
                  {isSubmitting ? 'Processing…' : `Pay ${formatPrice(getTotalPrice)}`}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep('shipping')}
                  className="btn-ghost w-full mt-3 py-3"
                >
                  Back to shipping
                </button>
              </form>
            )}
          </div>

          <div className="h-fit lg:sticky lg:top-24">
            <div className="card p-6">
              <h2 className="text-lg font-bold text-primary mb-4">Order summary</h2>
              <ul className="space-y-3 mb-5 pb-5 border-b border-neutral/10 max-h-48 overflow-y-auto">
                {items.map((item) => {
                  const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                  return (
                    <li key={item.id} className="flex justify-between gap-2 text-sm">
                      <span className="text-neutral line-clamp-1 flex-1">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="font-medium shrink-0">{formatPrice(price * item.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">{formatPrice(getTotalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
