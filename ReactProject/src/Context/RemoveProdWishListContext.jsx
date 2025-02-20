import { createContext } from "react";
import axios from 'axios';

export const RemoveProdWishListContext = createContext();

const RemoveProdWishListContextProvider = ({ children }) => {
    console.log('RemoveProdWishListContextProvider ');

    function removeProdWishList(productItem) {
        console.log('RemoveProdWishList api context');
        
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productItem}`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <RemoveProdWishListContext.Provider value={{ removeProdWishList }}>
            {children}
        </RemoveProdWishListContext.Provider>
    );

}

export { RemoveProdWishListContextProvider };  