type Product = {
    productName: string,
    productType: string,
    productMeasure: string,
    productPotency: string,
    productBrand: string,
    productQuantity: number,
    productPrice: string,
    productExpiry : string
};

export const addStock = async(productDetail : Product) => {
    const response = await fetch('/api/stock' , {
        method : "POST",
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(productDetail)
    })

    if(!response.ok)
    {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || 'Something went wrong, Try again please')
    }

    const resp = response.json()

    return resp
}