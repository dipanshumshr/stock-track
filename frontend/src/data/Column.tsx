// src/pages/SearchStock/columns.ts

import { type ColumnDef } from "@tanstack/react-table"
import { Button, ConfigProvider, Flex } from 'antd';

// This should be the type for a single item returned from your API
// Note that the product details are nested in a 'productId' object
export type StockItemAPIResponse = {
  _id: string;
  brand: string;
  quantity: number;
  salePrice: number;
  expiryDate?: string;
  productId: {
    name: string;
    type: string;
    measure: string;
    potency: string;
  };
};

export const columns: ColumnDef<StockItemAPIResponse>[] = [
  {
    header: "Product Name",
    // 1. For nested data, use `accessorFn`
    accessorFn: row => row.productId.name,
  },
  {
    header: "Brand",
    // 2. For simple, top-level data, `accessorKey` is perfect
    accessorKey: "brand",
  },
  {
    header: "Details",
    // You can also use `accessorFn` to combine fields
    accessorFn: row => `${row.productId.type}, ${row.productId.measure}, ${row.productId.potency}`,
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "MRP",
    accessorKey: "salePrice",
  },
  {
    header: "Expiry Date",
    accessorKey: "expiryDate",
  },
  {
    // 3. For custom columns like buttons, use `id` and `cell`
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // `row.original` contains the full data object for this row
      const stockItem = row.original;

      return (
        <div className="flex space-x-2">
         <Button color="default" variant="solid" onClick={() => console.log("edit pressed")}>
            Edit
          </Button>

          <Button color="default" variant="outlined" className="mr-5">
            Outlined
          </Button>
        </div>
      );
    },
  },
];