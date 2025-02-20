import { createContext } from "react";
import axios from 'axios';

export const GetAllProductsContext=createContext();

const GetAllProductsContextProvider  =({children })=>{  

    function getAllProducts() {
        console.log('GetAllProducts api context');
    
        return axios.get('https://ecommerce.routemisr.com/api/v1/products').
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <GetAllProductsContext.Provider value={{ getAllProducts }}>
            {children}
        </GetAllProductsContext.Provider>
    );

}

export {GetAllProductsContextProvider};