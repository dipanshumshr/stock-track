export interface ProductDetails {
  _id: string;
  measure: string;
  name: string;
  potency: string;
  type: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface MedicineItem {
  _id: string;
  productId: ProductDetails;
  brand: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StockApiResponse {
    items: MedicineItem[];
    pagination: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
        itemsPerPage: number;
    }
}