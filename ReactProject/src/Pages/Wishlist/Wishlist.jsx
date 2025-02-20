import './Wishlist.css';
import { useContext, useEffect, useState } from 'react';
import { GetWishListProductsContext } from '../../Context/GetWishListProductsContext';
import WishListCard from '../../Components/WishListCard/WishListCard';

const Wishlist = () => {
    const [products, setProducts] = useState();
    const useWishListProducts = useContext(GetWishListProductsContext);
    const token = localStorage.getItem('token');
    // console.log('hi wishlist token', token);
    useEffect(() => {
        // console.log('hi wishlist token', token);
        getWishListProductsFromAPI();
    }, [token]);

    async function getWishListProductsFromAPI() {
        const resp = await useWishListProducts.getWishListProducts(token);

        if (resp.status == 'success') {
            setProducts(resp.data);
            console.log('response from get wishlist products apiz', resp.data);
            console.log('prodz', products);
        }
    }

    function handleProductRemove() {
        console.log('handleProductRemove wishlist');
        getWishListProductsFromAPI();
    }

    if (products) {
        return (
            <div>
                <p className="wishlist-heading">Wishlist</p>

                <div className="wishlist-products ">
                    {products &&
                        products.map((product) => (
                            <div key={product?.id} className="wishlist-product">
                                <WishListCard product={product} onRemove={handleProductRemove()}/>
                                <hr></hr>
                            </div>
                        ))}

                </div>
            </div>
        );
    }
};

export default Wishlist;