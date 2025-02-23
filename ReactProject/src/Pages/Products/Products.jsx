import ProductCard from "../../Components/ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import { GetAllProductsContext } from "../../Context/GetAllProductsContext";
import { GetWishListProductsContext } from "../../Context/GetWishListProductsContext";
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState();
    const useAllProducts = useContext(GetAllProductsContext);
    const useWishListProducts = useContext(GetWishListProductsContext);
    const [wishListProducts, setWishListProducts] = useState();
    const token = localStorage.getItem('token');

    async function getAllProductsFromAPI() {
        const resp = await useAllProducts.getAllProducts();

        console.log('response from get all products api', resp);

        setProducts(resp.data);
        console.log('produt state ', products);

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
            <div className="products-component">
                <div className="products-component-products grid grid-cols-4 w-full">
                    {console.log('product', products)}
                    {products &&
                        products.map((product) => (
                            <div key={product.id} className="products-component-product">
                                <ProductCard product={product} isFav={wishListProducts &&
                                    wishListProducts.some(wishListProduct => wishListProduct.id == product.id)}/>
                            </div>
                        ))}
                </div>

            </div>
        </>
    );
};

export default Products;