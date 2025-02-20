import ProductCard from "../../Components/ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import { GetAllProductsContext } from "../../Context/GetAllProductsContext";

import './Products.css';

const Products = () => {
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
            <div className="products-component">
                <div className="products-component-products grid grid-cols-4 w-full">
                    {console.log('product', products)}
                    {products &&
                        products.map((product) => (
                            <div key={product.id} className="products-component-product">
                                <ProductCard product={product} />
                            </div>
                        ))}
                </div>

            </div>
        </>
    );
};

export default Products;