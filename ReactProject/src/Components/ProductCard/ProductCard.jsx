import PropTypes from 'prop-types';
import './ProductCard.css';
import { BsStarFill } from "react-icons/bs";
import { GiHearts } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AddProdToWishListContext } from '../../Context/AddProdToWishListContext';
import { ToastContainer, toast } from 'react-toastify';
import { AddProdToCartContext } from '../../Context/AddProdToCartContext';
import { TokenContext } from '../../Context/TokenContext';

const ProductCard = ({ product, isFav }) => {

    console.log('IS FAVEDDD??', isFav);
    console.log('product card', product);
    // console.log('PRODUCT CARD COMPONENT wishlist products', wishlistProducts);


    const navigate = useNavigate();
    const token = useContext(TokenContext);
    const useAddProdToWishList = useContext(AddProdToWishListContext);
    const useAddProdToCart = useContext(AddProdToCartContext);
    // const [isProdWished, setIsProdWished] = useState(isFav);

    async function addProductToWishListFromAPI(productID) {
        // setIsProdWished(false);
        const resp = await useAddProdToWishList.addProductToWishList(productID);

        if (resp.status == 'success') {
            console.log(resp.message)
            toast.success(resp.message);

            // setIsProdWished(true);

        }
        else {
            console.log(resp.message)
            toast.error(resp.message);
            // setIsProdWished(false);
        }

        // console.log('response from add product to wish list api', resp);
    }

    // console.log('PROD CARD VALIDATION', retWishListProducts);
    async function addProductToCartFromAPI(productID) {
        const resp = await useAddProdToCart.addProductToCart(productID);

        if (resp.status == 'success') {
            // console.log(resp.message)
            toast.success(resp.message);
        }
        else {
            console.log(resp.message)
            toast.error(resp.message);
        }

        // console.log('response from add product to cart api', resp);
    }

    if (product) {
        return (
            <div className="product-card-product-card" >
                <a href="#" className="product-card-product-img " onClick={() => navigate(`/ProductDetails/${product._id}`)}>
                    <img className="mx-auto" src={product.imageCover} alt={product.title} />
                </a>
                <div className="p-2 text-center" >
                    <div onClick={() => navigate(`/ProductDetails/${product._id}`)}>
                        <p className=" category">{product.category.name}</p>
                        <p className="title">{product.title}</p>
                        <div className='price-rating'>
                            <span className="price">{product.price} EGP</span>
                            <span className="rating">{product.ratingsAverage} <BsStarFill color='yellow' /> </span>

                        </div>
                    </div>
                    <div className="flex justify-end heart-icon" onClick={() => {
                        console.log('heart icon clicked');
                        {
                            token.Token &&
                                addProductToWishListFromAPI(product._id);
                        }
                        {
                            !token.Token &&
                                toast.error('Please login to add to wishlist');
                        }
                    }
                    }><GiHearts color={`${isFav ? 'red' : 'black'}`} /></div >

                    <button className='product-card-add-btn' onClick={() => {
                        console.log('add btn clicked');
                        {
                            token.Token &&
                                addProductToCartFromAPI(product._id);
                        }
                        {
                            !token.Token &&
                                toast.error('Please login to add to cart');
                        }

                    }
                    }>Add</button>
                </div>

                <ToastContainer />
            </div>
        );
    }
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        imageCover: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        // Add other properties as needed
    }).isRequired,
};

export default ProductCard;