import { toast, ToastContainer } from "react-toastify";
import CartCard from "../../Components/CartCard/CartCard";
// import { GetCartProductsContext } from "../../Context/GetCartProductsContext";
import { CartIDContext } from "../../Context/CartIDContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css';
import { CartContext } from "../../Context/CartContext";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState();
    const useCart = useContext(CartContext);
    const useCartID = useContext(CartIDContext);
    const token = localStorage.getItem('token');
    const [cartID, setCartID] = useState();
    const navigate = useNavigate();

    async function getCartProductsFromAPI() {
        const resp = await useCart.getLoggedUserCart();

        console.log('response from get all products api', resp.data);
        console.log('CARTID from get all products api', resp.data._id);
        setCartProducts(resp.data);
        setCartID(resp.data._id);
        useCartID.setCartID(resp.data._id);
        // console.log('cartid:', cartID);

        if (resp.status == 'success') {
            useCartID.setCartID(resp.CartID);
            setCartProducts(resp.data.products);
            toast.success(resp.message);
        }
        else
            toast.error(resp);
    }

    async function clearCartFromAPI() {
        const resp = await useCart.clearCart();
        if (resp.message == 'success') {
            toast.success('Cart cleared successfully');
            setCartProducts();

            setTimeout(() => {
                navigate('/home');
            }, 3000);
        }
    }

    useEffect(() => {
        console.log('hi cart useeffect', token);
        getCartProductsFromAPI();
    }, [token]);

    const handleProductRemove = () => {
        console.log('handleProductRemove cart');
        getCartProductsFromAPI();
        console.log('cartid:', cartID);
    };


    if (cartProducts) {
        return (    
            <div>
                <p className="cart-heading bg-red-800">My cart</p>
                {/* <p>Total Price: {} </p> */}
                <button className='cart-clear-cart-btn outline-green-600 bg-transparent'
                    onClick={() => {
                        {
                            cartID &&
                                console.log('checkout clicked cartid : ', cartID);
                            navigate(`/check-out/${cartID}`);
                        }
                    }}
                >Checkout</button>
                <div className="cart-products ">
                    {cartProducts &&
                        cartProducts.map((cartProduct) => (
                            <div key={cartProduct._id} className="cart-product">
                                <CartCard product={cartProduct}  />
                            </div>
                        ))}

                </div>
                <button className='cart-clear-cart-btn outline-green-600 bg-transparent'
                    onClick={() => {
                        console.log('clear cart clicked');
                        clearCartFromAPI();
                    }}
                >Clear Cart</button>
                <ToastContainer />
            </div>
        );
    }
};

export default Cart;