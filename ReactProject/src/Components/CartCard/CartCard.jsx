import { IoTrashBin } from "react-icons/io5";
import './CartCard.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";

const CartCard = ({ product }) => {
    const Navigate = useNavigate();
    const useCart = useContext(CartContext);

    async function removeProductFromCartFromAPI(productID) {
        console.log('removeProductFromCartFromAPI', productID);
        const resp = await useCart.removeProdCart(productID);

        if (resp.status == 'success') {
            console.log(resp);
            // onRemove();
            toast.success(resp.message);
        }
    }

    return (
        <div className="cart-product-card">
            <div className="cart-product-img">
                <img src={product.product.imageCover} alt={product.title} />
            </div>

            <div className="p-2 text-center cart-product-details">
                <p className="cart-name">{product.product.title}</p>
                <p className="cart-price">{product.price} EGP</p>
                <span className="cart-remove" onClick={
                    () => {
                        console.log('remove clicked on prod id  ', product._id);
                        removeProductFromCartFromAPI(product._id);
                        console.log('navigate to cart');
                        
                        Navigate('/cart');
                    }
                }><IoTrashBin color="red"
                    /> Remove</span>
            </div>

            <button className='cart-add-to-cart-btn outline-green-600 bg-transparent'
                onClick={() => {
                    console.log('cart-add to cart clicked.prodid', product.id);

                }}
            >Add to cart</button>
            <ToastContainer />
        </div>

    );
};

export default CartCard;