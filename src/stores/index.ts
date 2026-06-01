import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CheckoutForm } from '@/types/api';

// Theme Store
interface ThemeState {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  fontFamily: string;
  logo: string;
  favicon: string;
  companyName: string;
  setTheme: (theme: Partial<ThemeState>) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  colors: {
    primary: '#fff41e',
    secondary: '#F3F3F3',
    accent: '#FF6B35',
    neutral: '#808080',
  },
  fontFamily: 'sans-serif',
  logo: '',
  favicon: '',
  companyName: 'Awal Ecommerce',
  setTheme: (theme) => set((state) => ({ ...state, ...theme })),
}));

// Cart Store with persistence
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const price = typeof item.price === 'string' 
            ? parseFloat(item.price) 
            : item.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
);

// Checkout Form Store
interface CheckoutState {
  form: Partial<CheckoutForm>;
  isGuest: boolean;
  setForm: (form: Partial<CheckoutForm>) => void;
  setIsGuest: (isGuest: boolean) => void;
  resetForm: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  form: {},
  isGuest: true,
  setForm: (form) => set((state) => ({ form: { ...state.form, ...form } })),
  setIsGuest: (isGuest) => set({ isGuest }),
  resetForm: () => set({ form: {}, isGuest: true }),
}));

// Filter Store (for product listing)
interface FilterState {
  categoryId: string | null;
  brandId: string | null;
  search: string;
  inStockOnly: boolean;
  setCategoryId: (id: string | null) => void;
  setBrandId: (id: string | null) => void;
  setSearch: (search: string) => void;
  setInStockOnly: (inStockOnly: boolean) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  categoryId: null,
  brandId: null,
  search: '',
  inStockOnly: false,
  setCategoryId: (categoryId) => set({ categoryId }),
  setBrandId: (brandId) => set({ brandId }),
  setSearch: (search) => set({ search }),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  resetFilters: () =>
    set({
      categoryId: null,
      brandId: null,
      search: '',
      inStockOnly: false,
    }),
}));
