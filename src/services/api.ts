import axios, { AxiosInstance } from 'axios';
import {
  ApiResponse,
  SettingsResponse,
  Brand,
  Category,
  Product,
} from '@/types/api';

// Create Axios instance with base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const apiService = {
  // Settings - called on server-side
  async getSettings(): Promise<SettingsResponse> {
    try {
      const response = await apiClient.get<any>(
        '/public/settings/'
      );
      const settingsArray = response?.data?.data?.data ?? [];
      
      // Convert array of settings into key-value object
      const settingsMap: SettingsResponse = {};
      settingsArray.forEach((setting: any) => {
        if (setting.name && setting.value !== undefined) {
          settingsMap[setting.name] = setting.value;
        }
      });
      
      return settingsMap;
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      return {};
    }
  },

  // Brands
  async getBrands(skip: number = 0, limit: number = 12): Promise<{
    brands: Brand[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      const response = await apiClient.get<ApiResponse<Brand>>(
        '/public/brands/',
        {
          params: { skip, limit },
        }
      );
      const data = response?.data?.data?.data ?? [];
      const total = response?.data?.paginations?.total ?? 0;
      const hasMore = response?.data?.paginations?.has_more ?? false;
      
      return {
        brands: Array.isArray(data) ? data : [],
        total: typeof total === 'number' ? total : 0,
        hasMore: typeof hasMore === 'boolean' ? hasMore : false,
      };
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      return { brands: [], total: 0, hasMore: false };
    }
  },

  // Categories
  async getCategories(skip: number = 0, limit: number = 20): Promise<{
    categories: Category[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      const response = await apiClient.get<ApiResponse<Category>>(
        '/public/categories/',
        {
          params: { skip, limit },
        }
      );
      const data = response?.data?.data?.data ?? [];
      const total = response?.data?.paginations?.total ?? 0;
      const hasMore = response?.data?.paginations?.has_more ?? false;
      
      return {
        categories: Array.isArray(data) ? data : [],
        total: typeof total === 'number' ? total : 0,
        hasMore: typeof hasMore === 'boolean' ? hasMore : false,
      };
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return { categories: [], total: 0, hasMore: false };
    }
  },

  // Products
  async getProducts(
    skip: number = 0,
    limit: number = 20,
    filters?: {
      categoryId?: string;
      brandId?: string;
      inStockOnly?: boolean;
      search?: string;
    }
  ): Promise<{
    products: Product[];
    total: number;
    hasMore: boolean;
  }> {
    try {
      const params: Record<string, any> = { skip, limit };
      if (filters?.inStockOnly) params.in_stock_only = true;
      if (filters?.categoryId) params.category_id = filters.categoryId;
      if (filters?.brandId) params.brand_id = filters.brandId;
      if (filters?.search) params.search = filters.search;

      const response = await apiClient.get<ApiResponse<Product>>(
        '/public/products/',
        { params }
      );
      const data = response?.data?.data?.data ?? [];
      const total = response?.data?.paginations?.total ?? 0;
      const hasMore = response?.data?.paginations?.has_more ?? false;
      
      return {
        products: Array.isArray(data) ? data : [],
        total: typeof total === 'number' ? total : 0,
        hasMore: typeof hasMore === 'boolean' ? hasMore : false,
      };
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return { products: [], total: 0, hasMore: false };
    }
  },

  // Get single product by ID
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const response = await apiClient.get<{ data: Product }>(
        `/public/products/${productId}`
      );
      return response?.data?.data ?? null;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  },

  async getProductDetail(productId: string): Promise<{
    product: Product | null;
    brand: Brand | null;
    category: Category | null;
  }> {
    const [productResult, brandsResult, categoriesResult] = await Promise.all([
      this.getProductById(productId),
      this.getBrands(0, 100),
      this.getCategories(0, 100),
    ]);

    const product = productResult;
    if (!product) {
      return { product: null, brand: null, category: null };
    }

    const brand =
      brandsResult.brands.find(
        (b) => b.id.toLowerCase() === product.brand_id.toLowerCase()
      ) ?? null;
    const category =
      categoriesResult.categories.find(
        (c) => c.id.toLowerCase() === product.category_id.toLowerCase()
      ) ?? null;

    return { product, brand, category };
  },
};

export default apiService;
