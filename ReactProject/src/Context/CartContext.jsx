import { createContext, useEffect , useState} from "react";
import axios from 'axios';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartID, setCartID] = useState(null);

    function addProductToCart(productID) {
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
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

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

    function getLoggedUserCart() {
        console.log('GetCartProducts api context. token');

        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    function removeProdCart(productItem) {
        console.log('RemoveProdCart api context');

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productItem}`,
            {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
        ).
            then(response => { console.log('delete prod from cart', response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    async function getData() {
        let resp = await getLoggedUserCart();
        console.log('response from get data in useeffect', resp);
        setNumOfCartItems(resp.numOfCartItems);
        setCartID(resp.cartID);
        console.log('num of cart items', resp.numOfCartItems);
        console.log('cartID', cartID);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <CartContext.Provider
            value={{
                addProductToCart,
                clearCart,
                getLoggedUserCart,
                removeProdCart,
                numOfCartItems,
                cartID
            }}>
            {children}
        </CartContext.Provider>
    );

}

export { CartContextProvider };