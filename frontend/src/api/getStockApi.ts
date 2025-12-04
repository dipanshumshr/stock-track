// src/api/getStockApi.ts

// 1. Import the correct type from your columns file
import type { StockItemAPIResponse } from '../data/Column'; // Adjust path if needed

// 2. Update the function's return type
export const getStock = async (): Promise<StockItemAPIResponse[]> => {
    const response = await fetch("/api/stock");
    
    if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || "Something went Wrong");
    }

    const respData = await response.json();

    // 3. My backend will return an object like { items: [...] }, so return the array
    return respData.items || []; 
}