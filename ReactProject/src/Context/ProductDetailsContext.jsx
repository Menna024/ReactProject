import { createContext } from "react";
import axios from 'axios';

export const ProductDetailsContext=createContext();

const ProductDetailsContextProvider  =({children })=>{  

    function getProductDetails(productID) {
        console.log('ProductDetailsContext api ');
    
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productID}`).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <ProductDetailsContext.Provider value={{ getProductDetails }}>
            {children}
        </ProductDetailsContext.Provider>
    );

}

export {ProductDetailsContextProvider};