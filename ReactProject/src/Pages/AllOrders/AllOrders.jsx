import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import './AllOrders.css';
import { toast, ToastContainer } from "react-toastify";
import { TokenContext } from '../../Context/TokenContext';
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
    const useCart = useContext(CartContext);
    const [orders, setOrders] = useState();
    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const token = useContext(TokenContext);
    const navigate = useNavigate();

    async function callGetUserOrdersAPI() {
        const resp = await useCart.getUserOrders();
        if (resp.statusMsg == 'fail') {
            console.log('fail');
            toast.error('No Orders Found');
            setSuccessMsgFromAPI('');
            setErrorMsgFromAPI(resp.message);
            setOrders([]);


            localStorage.removeItem('user');
            localStorage.removeItem('token');
            token.setToken('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        }
        else {
            console.log('success');
            setOrders(resp);
        }
        // if (Array.isArray(resp)) {
        //     setOrders(resp);
        // } else {
        //     setOrders([]);
        // }
        console.log('all orders', resp);
    }

    useEffect(() => {
        callGetUserOrdersAPI();
    }, [])

    // if (orders) {
    return (
        <div>
            <table>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Order Payment Status</th>
                    <th>Order Delivered Status</th>
                    <th>Order Total</th>
                </tr>

                {
                    orders &&
                    orders.map((order, index) => {
                        console.log(`order ${index}:`, order);
                        <tr key={order?._id}>
                            <p className="error-text">dd</p>
                            <td>{order?._id}</td>
                            <td>{order?.createdAt}</td>
                            <td>{order?.isPaid}</td>
                            <td>{order?.isDelivered}</td>
                            <td>{order?.totalOrderPrice}</td>
                        </tr>

                    }
                    )
                }

            </table>
            {errorMsgFromAPI && <p className="error-text">{errorMsgFromAPI}</p>}
            {successMsgFromAPI && <p className="success-text">{successMsgFromAPI}</p>}
            <div className="error-text">    XOXO</div>
            <ToastContainer />
        </div>
    );
    // }
};

export default AllOrders;