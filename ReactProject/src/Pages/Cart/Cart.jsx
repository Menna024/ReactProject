import { toast, ToastContainer } from "react-toastify";
import CartCard from "../../Components/CartCard/CartCard";
import { CartIDContext } from "../../Context/CartIDContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css';
import { CartContext } from "../../Context/CartContext";

const Cart = () => {
    const [cartProducts, setCartProducts] = useState();
    const useCart = useContext(CartContext);
    const useCartID = useContext(CartIDContext);
    const [totalCartPrice, setTotalCartPrice] = useState();
    const [numOfCartItems, setNumOfCartItems] = useState(0);

    const token = localStorage.getItem('token');
    const [cartID, setCartID] = useState();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cash');

    async function getCartProductsFromAPI() {
        const resp = await useCart.getLoggedUserCart();

        setCartProducts(resp.data.products);
        setTotalCartPrice(resp.data.totalCartPrice);
        setNumOfCartItems(resp.numOfCartItems);
        setCartID(resp.data._id);
        useCartID.setCartID(resp.data._id);
        // console.log('cartid:', cartID);

        if (resp.status == 'success') {
            useCartID.setCartID(resp.CartID);
            setCartProducts(resp.data.products);
            setNumOfCartItems(resp.numOfCartItems);
            // console.log('vtotalCartPrice:', numOfCartItems);
            // console.log('vtotalCartPrice:', useCart.numOfCartItems);
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



    if (cartProducts) {
        return (
            <div className="cart-container">
                <div className="cart-heading">
                    <div>
                        <p className="cart-title bg-red-800">My cart</p>
                    </div>
                    <div>
                        <button className='cart-btn outline-green-600 bg-transparent'
                            onClick={() => {
                                {
                                    cartID &&
                                        console.log('checkout clicked cartid : ', cartID);
                                    navigate(`/check-out/${cartID}`, {state:paymentMethod});
                                }
                            }}
                        >Checkout</button>
                    </div>
                </div>
                <div className="cart-data">
                    <p className="total-price">Total Price: {totalCartPrice} EGP</p>
                    <p className="total-count">Total Number Of Items: {numOfCartItems}</p>
                </div>
                <div className="cart-products ">
                    {cartProducts &&
                        cartProducts.map((cartProduct) => (
                            <div key={cartProduct._id} className="cart-product">
                                <CartCard product={cartProduct} />
                            </div>
                        ))}

                </div>

                <select name="paymentMethod" id="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)
                    }>
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                </select>   

                <button className='cart-clear-btn outline-green-600 bg-transparent'
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