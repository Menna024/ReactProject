import { createContext } from "react";
import axios from 'axios';

export const GetWishListProductsContext = createContext();

const GetWishListProductsContextProvider = ({ children }) => {

    function getWishListProducts(token) {
        console.log('GetWishListProducts api context');

        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                headers: {
                    token: token
                }
            }
        ).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <GetWishListProductsContext.Provider value={{ getWishListProducts }}>
            {children}
        </GetWishListProductsContext.Provider>
    );

}

export { GetWishListProductsContextProvider };