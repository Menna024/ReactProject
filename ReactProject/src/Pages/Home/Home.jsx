import ProductCard from "../../Components/ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import { GetAllProductsContext } from "../../Context/GetAllProductsContext";
// import SecondarySlider from "../../Components/SecondarySlider/SecondarySlider";
import './Home.css';
import SecondarySlider from "../../Components/SecondarySlider/SecondarySlider";
import { GetWishListProductsContext } from "../../Context/GetWishListProductsContext";
import MainSlider from "../../Components/MainSlider/MainSlider";
const Home = () => {
    const [products, setProducts] = useState();
    const useAllProducts = useContext(GetAllProductsContext);
    const useWishListProducts = useContext(GetWishListProductsContext);
    const token = localStorage.getItem('token');
    const [wishListProducts, setWishListProducts] = useState();
    const [heartedProducts, setHeartedProducts] = useState([]);

    async function getAllProductsFromAPI() {
        const resp = await useAllProducts.getAllProducts();

        console.log('response from get all products api', resp);

        setProducts(resp.data);
        console.log('produt state ', products);

    }


    async function getWishListProductsFromAPI() {
        // if (!token) return;
        console.log('get wishlist products from api function INSIDE HOME COMPONENT');
        const resp = await useWishListProducts.getWishListProducts(token);
        console.log('response from get wishlist products api', resp);
        if (resp.status == 'success') {
            setWishListProducts(resp.data);
            // console.log('response from get wishlist products apiz', resp.data);
            // console.log('wishlist product in ASYNC FUNCTION', resp.data);
        }
    }


    useEffect(() => {
        getAllProductsFromAPI();
    }, []);

    useEffect(() => {
        if (products) {
            console.log('products in use effect ', products);
            getWishListProductsFromAPI();
        }

        console.log('XXXproducts in use effect ', products);


        if (products && wishListProducts) {
            console.log('PRODS IN IF BOTH ', products);
            console.log('WISHLIST PRODS IN IF BOTH ', wishListProducts);

        }

    }, [products, wishListProducts]);

    useEffect(() => {

        if (products) {
            getWishListProductsFromAPI();
        }
    }, [products, wishListProducts]);



    return (
        <>
            <div>
                <MainSlider />
                <SecondarySlider />
                <div className="home-products grid grid-cols-4 w-full">
                    {console.log('home-product', products)}
                    {products &&
                        products.map((product) => (
                            <div key={product.id} className="home-product" >
                                {
                                    console.log('products COMPARE WISH AND NOREMAL ', wishListProducts &&
                                        wishListProducts.some(wishListProduct => wishListProduct.id == product.id), product.id, 'WISHLIST', wishListProducts)
                                }
                                <ProductCard product={product} isFav={wishListProducts &&
                                    wishListProducts.some(wishListProduct => wishListProduct.id == product.id)}
                                />
                            </div>
                        ))}
                </div>

            </div>
        </>
    );
};

export default Home;