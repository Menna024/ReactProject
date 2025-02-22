import { createContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export const CheckoutSessionContext = createContext();

const CheckoutSessionContextProvider = ({ children }) => {
    const { cartID } = useParams();
    console.log('CheckoutSessionContextProvider cartID:', cartID);

    function createCheckoutSession(cartID, CheckoutSessionData) {
        console.log('CheckoutSession api context');
        console.log('CheckoutSession data cartID', cartID);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:3000`,
            {
                shippingAddress: {
                    details: CheckoutSessionData.details,
                    phone: CheckoutSessionData.phone,
                    city: CheckoutSessionData.city
                }
            },
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
        <CheckoutSessionContext.Provider value={{ createCheckoutSession }}>
            {children}
        </CheckoutSessionContext.Provider>
    );

}

export { CheckoutSessionContextProvider };