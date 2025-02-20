import { createContext } from "react";
import axios from 'axios';

export const AddProdToCartContext = createContext();

const AddProdToCartContextProvider = ({ children }) => {

    function addProductToCart(productID) {
        console.log('AddProdToCartContext api context');

        const token = localStorage.getItem('token');
        console.log('token:', token);
        console.log('productID:', productID);

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                productId: productID
            },
            {
                headers: {
                    token: token
                }
            }).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <AddProdToCartContext.Provider value={{ addProductToCart }}>
            {children}
        </AddProdToCartContext.Provider>
    );

}

export { AddProdToCartContextProvider };