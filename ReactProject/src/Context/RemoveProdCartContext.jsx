import { createContext } from "react";
import axios from 'axios';

export const RemoveProdCartContext = createContext();

const RemoveProdCartContextProvider = ({ children }) => {
    console.log('RemoveProdCartContextProvider ');

function removeProdCart(productItem) {
        console.log('RemoveProdCart api context');
        
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
            then(response => { console.log('delete prod from cart',response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <RemoveProdCartContext.Provider value={{ removeProdCart }}>
            {children}
        </RemoveProdCartContext.Provider>
    );

}

export { RemoveProdCartContextProvider };  