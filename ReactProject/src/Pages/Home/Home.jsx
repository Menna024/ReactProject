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
    // const [heartedProducts, setHeartedProducts] = useState([]);

    async function getAllProductsFromAPI() {
        const resp = await useAllProducts.getAllProducts();

        setProducts(resp.data);

    }


    async function getWishListProductsFromAPI() {
        const resp = await useWishListProducts.getWishListProducts(token);
        if (resp.status == 'success') {
            setWishListProducts(resp.data);
        }
    }


    useEffect(() => {
        getAllProductsFromAPI();
    }, []);

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
                    
                    {products &&
                        products.map((product) => (
                            <div key={product.id} className="home-product" >                              
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