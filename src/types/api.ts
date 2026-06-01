// API response wrapper types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    data: T[];
  };
  paginations: {
    skip: number;
    limit: number;
    total: number;
    page: number;
    has_more: boolean;
    total_pages: number;
  };
  errors: string | null;
  timestamp: string;
}


export interface ApiSingleResponse<T> {
  data: T;
}

// Single Setting object from API
export interface SettingItem {
  id: string;
  name: string;
  title: string;
  description: string;
  value: string | boolean | number;
  type: 'text' | 'email' | 'tel' | 'color' | 'file' | 'checkbox';
  setting_group_id: string;
}

// Settings API response - converted to key-value map
export interface SettingsResponse {
  [key: string]: string | boolean | number | null;
}

// Brand type
export interface Brand {
  id: string;
  name: string;
  title: string;
  logo: string;
  description: string;
}

// Category type
export interface Category {
  id: string;
  name: string;
  title: string;
  icon: string;
  description: string;
}

// Product type (list + detail fields from API)
export interface Product {
  id: string;
  title: string;
  name: string;
  price: string | number;
  thumbnail_url: string;
  brand_id: string;
  category_id: string;
  mpn?: string;
  sku?: string;
  short_description?: string;
  long_description?: string;
  compare_at_price?: string | number;
  stock_quantity?: number;
  allow_backorders?: boolean;
  weight_kg?: string | number;
  length_cm?: string | number;
  width_cm?: string | number;
  height_cm?: string | number;
  is_featured?: boolean;
  is_discount?: boolean;
  warranty?: number;
  country_of_origin?: string;
  meta_title?: string;
  meta_description?: string;
  availability?: string;
  in_stock?: boolean;
  can_order?: boolean;
  description?: string;
  specifications?: Record<string, unknown>;
}

// Cart item type
export interface CartItem extends Product {
  quantity: number;
}

// Checkout form type
export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
