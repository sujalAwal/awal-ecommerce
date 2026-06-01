'use client';

import React, { useState } from 'react';
import { Product } from '@/types/api';
import { useCartStore } from '@/stores';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled = false }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-neutral text-sm">Quantity</span>
        <div className="flex items-center rounded-lg border border-neutral/20 overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 hover:bg-secondary transition-colors font-medium"
            aria-label="Decrease"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-14 text-center border-x border-neutral/20 py-2.5 focus:outline-none"
            aria-label="Quantity"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2.5 hover:bg-secondary transition-colors font-medium"
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={disabled}
        className={` py-3.5 px-6 rounded-xl font-semibold text-base transition-all ${
          isAdded
            ? 'bg-green-600 text-white'
            : disabled
            ? 'bg-neutral/15 text-neutral cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isAdded ? '✓ Added to Cart' : disabled ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
