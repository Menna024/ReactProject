import { createContext } from "react";
import axios from 'axios';

export const AddProdToWishListContext = createContext();

const AddProdToWishListContextProvider = ({ children }) => {

    function addProductToWishList(productID) {
        console.log('AddProdToWishListContext api context');

        const token = localStorage.getItem('token');
        console.log('token:', token);
        console.log('productID:', productID);

        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
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
        <AddProdToWishListContext.Provider value={{ addProductToWishList }}>
            {children}
        </AddProdToWishListContext.Provider>
    );

}

export { AddProdToWishListContextProvider };