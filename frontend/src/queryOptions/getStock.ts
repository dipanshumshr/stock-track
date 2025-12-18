import { getStock } from "@/api/getStockApi";
import { queryOptions } from "@tanstack/react-query";
import type { sortOptions } from "../Types/sortTypes"


export const createStockOptions = (params : sortOptions) =>  queryOptions({
    queryKey : ["stock" , params.limit , params.order, params.page, params.sort, params.search],
    queryFn : () => getStock(params)
})