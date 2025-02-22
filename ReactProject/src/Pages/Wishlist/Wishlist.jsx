import './Wishlist.css';
import { use, useContext, useEffect, useState } from 'react';
import { GetWishListProductsContext } from '../../Context/GetWishListProductsContext';
import WishListCard from '../../Components/WishListCard/WishListCard';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [products, setProducts] = useState();
    const useWishListProducts = useContext(GetWishListProductsContext);
    const token = localStorage.getItem('token');
    const navigate =useNavigate();

    useEffect(() => {
        if (token==null) {
            navigate('/login');
        }

        getWishListProductsFromAPI();
    }, [token]);

    async function getWishListProductsFromAPI() {
        const resp = await useWishListProducts.getWishListProducts(token);

        if (resp.status == 'success') {
            setTimeout(() => {
                toast.success(resp.message);
            }, 500);

            setProducts(resp.data);
        }
    }

    function handleProductRemove() {
        // console.log('handleProductRemove wishlist');
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
                                <WishListCard product={product} onRemove={handleProductRemove()} />
                                <hr></hr>
                            </div>
                        ))}

                </div>
                <ToastContainer />
            </div>
        );
    }
};

export default Wishlist;