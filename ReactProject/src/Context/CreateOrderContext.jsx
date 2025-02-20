import { createContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export const CreateOrderContext = createContext();

const CreateOrderContextProvider = ({ children }) => {
    const { cartID } = useParams();
    console.log('CreateOrderContextProvider cartID:', cartID);

    function createOrder(cartID, CreateOrderData) {
        console.log('CreateOrder api context');
        console.log('CreateOrder data cartID', cartID);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
            {
                shippingAddress: {
                    details: CreateOrderData.details,
                    phone: CreateOrderData.phone,
                    city: CreateOrderData.city
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
        <CreateOrderContext.Provider value={{ createOrder }}>
            {children}
        </CreateOrderContext.Provider>
    );

}

export { CreateOrderContextProvider };