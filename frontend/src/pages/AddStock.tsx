import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useMutation } from '@tanstack/react-query';
import { createAddStockQuery } from '../queryOptions/addStockQuery';
import toast from 'react-hot-toast';
import SelectElement from '../components/SelectElement';
import { productType } from '../data/productType';
import type { DatePickerProps } from 'antd';
import DatePickerElement from '../components/DatePicker';





const measureOptions = {
    dilution: [
        { value: '30ml', label: '30 ml' },
        { value: '100ml', label: '100 ml' },
    ],
    motherTincture: [
        { value: '30ml', label: '30 ml' },
        { value: '100ml', label: '100 ml' },
    ],
    bioChemic: [
        { value: '25g', label: '25 g' },
        { value: '100g', label: '100 g' },
        { value: '200g', label: '200 g' },
    ],
    patent: [
        { value: 'none', label: 'No options' },
        { value: '100ml', label: '100 ml' },
        { value: '450ml', label: '450 ml' },
    ],
};

type ProductTypes = "dilution" | "motherTincture" | "bioChemic" | "patent" | ""

type Product = {
    productName: string,
    productType: ProductTypes,
    productMeasure: string,
    productPotency: string,
    productBrand: string,
    productQuantity: number,
    productPrice: string,
    productExpiry: string
};

function AddStock() {
    const [productDetail, setProductDetail] = useState<Product>({
        productName: "",
        productType: "dilution",
        productMeasure: "",
        productPotency: "",
        productBrand: "",
        productQuantity: 0,
        productPrice: "",
        productExpiry: ""
    });



    const { mutateAsync, isPending } = useMutation({
        ...createAddStockQuery,
        onError: (Error) => {
            console.log("Something went wrong", Error.message)
        },
        onSuccess: (data) => {
            console.log("Successfully submitted", data)
        }
    })

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date)
        setProductDetail(prev => ({...prev, productExpiry : dateString as string}))
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setProductDetail(prev => ({ ...prev, [name]: value }));
    }

    const handleSelectChange = (fieldName: keyof Product) => (value: string) => {
        setProductDetail(prev => {
            const newObj = {...prev, [fieldName] : value}

            if(fieldName === 'productType')
            {
                newObj.productExpiry = ""
                newObj.productMeasure = ""
                newObj.productPotency = ""
            }

            return newObj
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const addStockPromise = mutateAsync(productDetail)

        toast.promise(addStockPromise, {
            loading: "Adding stock item...",
            success: (response) => {
                handleClear()
                return response.message
            },
            error: (err) => err.message
        })
    };

    function handleClear() {
        setProductDetail({
            productName: "",
            productType: "dilution",
            productMeasure: "",
            productPotency: "",
            productBrand: "",
            productQuantity: 0,
            productPrice: "",
            productExpiry: ""
        })
    }

    return (
        <div className="bg-zinc-850 min-h-screen">
            <Navbar title='Add New Stock' />

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">

                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-white">Stock Item Details</h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            Fill in the form to add a new medicine batch to your inventory. All fields are required.
                        </p>
                    </div>

                  

                    <div className="lg:col-span-2">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

                            <SelectElement title="productType"
                                productDetail={productDetail}
                                onSelectChange={handleSelectChange}
                                selectItems={productType}
                                headerText="Product Type"
                                placeHolderText="Select a type"
                            />


                            <div>
                                <label htmlFor="productName" className="block text-sm font-medium text-zinc-300 mb-2">Product Name</label>
                                <input id="productName" type="text" name="productName" placeholder='e.g., Arnica Montana' value={productDetail.productName} onChange={handleChange}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 autofill:bg-zinc-800 autofill:text-white" />
                            </div>

                            {/* Product Measure Based on Product type*/}

                            {productDetail.productType &&

                                <SelectElement
                                    title='productMeasure'
                                    productDetail={productDetail}
                                    onSelectChange={handleSelectChange}
                                    selectItems={measureOptions[productDetail.productType]}
                                    headerText='Product Measure'
                                    placeHolderText='Select a measure'
                                />
                            }

                            {/* Potency */}
                            <div>
                                <label htmlFor="productPotency" className="block text-sm font-medium text-zinc-300 mb-2">Potency</label>
                                <input id="productPotency" type="text" name="productPotency" placeholder='e.g., 30C, 200CK, Q' value={productDetail.productPotency} onChange={handleChange}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 autofill:bg-zinc-800 autofill:text-white" />
                            </div>

                            {/* Product Brand */}
                            <div>
                                <label htmlFor="productBrand" className="block text-sm font-medium text-zinc-300 mb-2">Product Brand</label>
                                <input id="productBrand" type="text" name="productBrand" placeholder='e.g., SBL, Dr. Reckeweg' value={productDetail.productBrand} onChange={handleChange}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 autofill:bg-zinc-800 autofill:text-white" />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label htmlFor="productQuantity" className="block text-sm font-medium text-zinc-300 mb-2">Quantity</label>
                                <input id="productQuantity" type="number" name="productQuantity" placeholder='0' value={productDetail.productQuantity} onChange={handleChange}
                                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 autofill:bg-zinc-800 autofill:text-white" />
                            </div>


                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label htmlFor="productPrice" className="block text-sm font-medium text-zinc-300 mb-2">
                                            Sale Price (MRP)
                                        </label>
                                        <input
                                            id="productPrice"
                                            type="number"
                                            name="productPrice"
                                            placeholder='0.00'
                                            value={productDetail.productPrice}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Expiry Date Field */}
                                    <div>
                                        {(productDetail.productType === "bioChemic" || productDetail.productType === "patent") && (
                                            <>
                                                <label htmlFor="productExpiry" className="block text-sm font-medium text-zinc-300 mb-2">
                                                    Expiry Date
                                                </label>
                                                <DatePickerElement onChange={onChange} size="large" />
                                            </>
                                        )}
                                    </div>   
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="md:col-span-2 text-right">
                                <button type="submit" disabled={isPending} className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#347433] hover:bg-[#5C8374] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-blue-500">
                                    Add Stock
                                </button>

                                <button type='button' onClick={handleClear} disabled={isPending} className="inline-flex justify-center ml-5 py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#632626] hover:bg-[#9D5353] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-blue-500">
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default AddStock;
