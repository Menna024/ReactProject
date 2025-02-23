import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "../../Context/ProductDetailsContext";
import { useContext, useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { GiHearts } from "react-icons/gi";
import './ProductDetails.css';
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
// import { AddProdToCartContext } from "../../Context/AddProdToCartContext";
import { CartContext } from "../../Context/CartContext";
import { TokenContext } from "../../Context/TokenContext";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {
    const { id } = useParams();
    const useProductDetails = useContext(ProductDetailsContext);
    const [productDetails, setProductDetails] = useState();
    const token = useContext(TokenContext);
    const useCart = useContext(CartContext);

    async function getProdDetailsFromAPI() {
        const resp = await useProductDetails.getProductDetails(id);

        setProductDetails(resp.data);
        console.log('RESPONSE from get product details api', resp.data);
    }

    useEffect(() => {
        getProdDetailsFromAPI();
    }, [id]);
    console.log('id', id);



    async function addProductToCartFromAPI(productID) {
        const resp = await useCart.addProductToCart(productID);

        if (resp.status == 'success') {
            console.log(resp.message)
            toast.success(resp.message);
        }
        else {
            console.log(resp.message)
            toast.error(resp.message);
        }

        console.log('response from add product to cart api', resp);
    }

    return (
        <div className="product-details">
            <div className="product-slider">
                <ProductSlider images={productDetails?.images} />
            </div>
            {productDetails &&
                <div className="p-2 text-center product">

                    <p className="title">{productDetails?.title}</p>
                    <p className="description">{productDetails?.description}</p>
                    <div className='price-rating'>
                        <span className="price">{productDetails?.price} EGP</span>
                        <span className="rating">{productDetails?.ratingsAverage} <BsStarFill color='yellow' /> </span>

                    </div>
                    <div className='flex justify-end heart-icon'><GiHearts color='black' /></div >

                    <button className="add-btn" onClick={() => {
                        console.log('add btn clicked');
                        {
                            token.Token &&
                                addProductToCartFromAPI(productDetails._id);
                        }
                        {
                            !token.Token &&
                                toast.error('Please login to add to cart');
                        }

                    }
                    }>Add</button>
                </div>}
                <ToastContainer />
        </div>
    );
};

export default ProductDetails;