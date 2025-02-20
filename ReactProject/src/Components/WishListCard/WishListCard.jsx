import { IoTrashBin } from "react-icons/io5";
import './WishListCard.css';
import { useContext } from 'react';
import { AddProdToCartContext } from "../../Context/AddProdToCartContext";
import { toast, ToastContainer } from 'react-toastify';
import { RemoveProdWishListContext } from "../../Context/RemoveProdWishListContext";

const WishListCard = ({ product , onRemove}) => {
    const useAddProdToCart = useContext(AddProdToCartContext);
    const useRemoveProdWishList = useContext(RemoveProdWishListContext);

    async function addProductToCartFromAPI(productID) {
        const resp = await useAddProdToCart.addProductToCart(productID);

        if (resp.status == 'success') {
            console.log(resp.message)

            setTimeout(() => {
                toast.success(resp.message);
            }, 1000);

        }
        else {
            console.log(resp.message)
            toast.error(resp.message);
        }

        console.log('response from add product to cart api', resp);

    }

    async function removeProductFromWishListFromAPI(productID) {
        const resp = await useRemoveProdWishList.removeProdWishList(productID);
        console.log('response from remove product from wishlist api', resp);
    }

    return (
        <div className="wishlist-product-card">
            <div className="wishlist-product-img">
                <img src={product.imageCover} alt={product.title} />
            </div>

            <div className="p-2 text-center wishlist-product-details">
                <p className="name">{product.title}</p>
                <p className="price">{product.price} EGP</p>
                <span className="remove"   onClick={
                        () => {
                            console.log('remove clicked on prod id  ', product.id);
                            removeProductFromWishListFromAPI(product.id);
                            console.log('removed from wishlist');
                            // Navigate('/cart');
                                
                        }
                    } ><IoTrashBin color="red"
                  /> Remove</span>
            </div>

            <button className='wishlist-add-to-cart-btn outline-green-600 bg-transparent'
                onClick={() => {
                    console.log('add to cart clicked.prodid', product.id);
                    addProductToCartFromAPI(product.id);
                }}
            >Add to cart</button>
            <ToastContainer />
        </div>

    );
};

export default WishListCard;