// src/api/getStockApi.ts

import type { StockApiResponse } from "@/Types/MedicineType";

import type { sortOptions } from "../Types/sortTypes"

export const getStock = async ({page = 1 , limit = 10 , sort , order , search} : sortOptions) : Promise<StockApiResponse> => {

    const requestURL = `/api/stock?sort=${sort}&limit=${limit}&order=${order}&page=${page}&search=${search}`

    const response = await fetch(requestURL);
    
    if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || "Something went Wrong");
    }

    const respData = await response.json();

    return respData || []; 
}