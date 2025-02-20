import { createContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export const ClearCartContext = createContext();

const ClearCartContextProvider = ({ children }) => {
    console.log('ClearCartContextProvider ');

    function clearCart() {
        console.log('ClearCart api context');
        
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
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
        <ClearCartContext.Provider value={{ clearCart }}>
            {children}
        </ClearCartContext.Provider>
    );

}

export { ClearCartContextProvider };  