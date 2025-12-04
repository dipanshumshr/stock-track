import { getStock } from "@/api/getStockApi";
import { queryOptions } from "@tanstack/react-query";

export const createStockOptions = queryOptions({
    queryKey : ["stock"],
    queryFn : getStock
})