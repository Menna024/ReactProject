import ProductCard from "../../Components/ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import { GetAllProductsContext } from "../../Context/GetAllProductsContext";
// import SecondarySlider from "../../Components/SecondarySlider/SecondarySlider";
import './Home.css';
import SecondarySlider from "../../Components/SecondarySlider/SecondarySlider";

import MainSlider from "../../Components/MainSlider/MainSlider";
const Home = () => {
    const [products, setProducts] = useState();
    const useAllProducts = useContext(GetAllProductsContext);

    async function getAllProductsFromAPI() {
        const resp = await useAllProducts.getAllProducts();

        console.log('response from get all products api', resp);

        setProducts(resp.data);
        console.log('produt state ', products);

    }

    useEffect(() => {
        getAllProductsFromAPI();
    }, []);


    return (
        <>
            <div>
                <MainSlider />
                <SecondarySlider />
                <div className="home-products grid grid-cols-4 w-full">
                    {console.log('home-product', products)}
                    {products &&
                        products.map((product) => (
                            <div key={product.id} className="home-product">                                
                                <ProductCard product={product} />
                            </div>
                        ))}
                </div>

            </div>
        </>
    );
};

export default Home;