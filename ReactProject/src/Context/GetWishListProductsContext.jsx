import { createContext } from "react";
import axios from 'axios';

export const GetWishListProductsContext = createContext();

const GetWishListProductsContextProvider = ({ children }) => {

    function getWishListProducts(token) {

        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                headers: {
                    token: token
                }
            }
        ).
            then(response => { return response.data })
            .catch(error => { return error.response.data });
    }

    return (
        <GetWishListProductsContext.Provider value={{ getWishListProducts }}>
            {children}
        </GetWishListProductsContext.Provider>
    );

}

export { GetWishListProductsContextProvider };