import { createContext } from "react";
import axios from 'axios';

export const GetCartProductsContext = createContext();

const GetCartProductsContextProvider = ({ children }) => {
    

    function getCartProducts(token) {
        console.log('GetCartProducts api context. token',token);

        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
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
        <GetCartProductsContext.Provider value={{ getCartProducts }}>
            {children}
        </GetCartProductsContext.Provider>
    );

}

export { GetCartProductsContextProvider };