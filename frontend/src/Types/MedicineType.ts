export interface ProductDetails {
  _id: string;
  name: string; 
  type: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface MedicineItem {
  _id: string;
  potency: string;
  measure: string;
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