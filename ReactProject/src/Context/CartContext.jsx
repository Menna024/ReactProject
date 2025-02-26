import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [reload, setReload] = useState(false);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartID, setCartID] = useState(null);

    function addProductToCart(productID) {
        setReload(false);
        console.log('AddProdToCartContext api context');

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                productId: productID
            },
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).
            then(response => {
                setReload(true);
                console.log(response.data);
                return response.data
            })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    function clearCart() {
        setReload(false);
        console.log('ClearCart api context');

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
            then(response => {
                setReload(true);
                console.log(response.data);
                return response.data
            })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    function getLoggedUserCart() {

        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
        then(response => { setNumOfCartItems(response.numOfCartItems);
            setCartID(response.cartId) ;    return response.data })
        .catch(error => { console.log(error.response.data); return error.response.data });
    }

    function removeProdCart(productItem) {
        setReload(false);
        console.log('RemoveProdCart api context', productItem, 'token', localStorage.getItem('token'));

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
            then(response => {
                setReload(true);

                    console.log('delete prod from cart', response.data);
                return response.data
            })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    function onlinePayment( CheckoutSessionData,CartID) {
        console.log('CheckoutSession api context');
        console.log('CheckoutSession data cartID', CartID);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=http://localhost:5173`,
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


    function cashOnDelivery( CreateOrderData) {
        
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
            then(response => { console.log('create order ', response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    async function getData() {
        let resp = await getLoggedUserCart();
        console.log('response from get data in useeffect', resp);
        setNumOfCartItems(resp?.numOfCartItems);
        setCartID(resp?.cartId);
        
        console.log('num of cart items', resp?.numOfCartItems,'-', numOfCartItems);
        console.log('CARTCONTcartID', resp?.cartId ,'-', cartID);
    }

    useEffect(() => {
        console.log('cart context useeffect');  
        getData();
    }, [reload]);

    return (
        <CartContext.Provider
            value={{
                addProductToCart,
                clearCart,
                getLoggedUserCart,
                removeProdCart,
                numOfCartItems,
                cartID,
                onlinePayment,
                cashOnDelivery
            }}>
            {children}
        </CartContext.Provider>
    );

}

export { CartContextProvider };