// Custom hook for API data fetching with caching
import { useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(
  url: string,
  options?: RequestInit
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return state;
}

// Hook for cart operations
export function useCart() {
  const { items, addItem, removeItem, updateQuantity, getTotalPrice, clearCart } =
    require('@/stores').useCartStore();

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    getTotalPrice: getTotalPrice(),
    clearCart,
  };
}
