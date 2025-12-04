import { mutationOptions } from "@tanstack/react-query";
import { addStock } from "../api/addStockApi";

export const createAddStockQuery = mutationOptions({
    mutationKey : ["Medicines"],
    mutationFn : addStock
})