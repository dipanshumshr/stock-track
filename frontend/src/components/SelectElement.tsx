import React from 'react';
import { Select, ConfigProvider, theme } from 'antd';

type ProductType = { value: string, label: string }

type Product = {
    productName: string,
    productType: string,
    productMeasure: string,
    productPotency : string,
    productBrand: string,
    productQuantity: number,
    productPrice: string,
    productExpiry : string
};

type SelectElementProp = {
    title : keyof Product,
    productDetail : Product,
    onSelectChange : (title : keyof Product) => (value : string) => void,
    selectItems : ProductType[],
    headerText : string,
    placeHolderText : string
}



function SelectElement({ title , productDetail , onSelectChange , selectItems , headerText , placeHolderText} : SelectElementProp) {
    return (
        <>
            <div>
                <label htmlFor={title} className="block text-sm font-medium text-zinc-300 mb-2">{headerText}</label>
                <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                    <Select
                        id={title}
                        placeholder= {placeHolderText}
                        onChange={onSelectChange(title)}
                        value={productDetail[title] ? String(productDetail[title]) : null}
                        style={{ width: '100%' }}
                        options={selectItems}
                    />
                </ConfigProvider>
            </div>
        </>
    )
}

export default SelectElement
