import * as Yup from 'yup';
import { useFormik } from 'formik';
import './CheckOut.css';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserIDContext } from '../../Context/UserIDContext';
import { CartContext } from '../../Context/CartContext';


const CheckOut = () => {

    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const { cartID } = useParams();
    const { cashOnDelivery, onlinePayment, numOfCartItems } = useContext(CartContext);
    const { state } = useLocation();
    const useUserID = useContext(UserIDContext);
    // const navigate = useNavigate()

    const formik = useFormik(
        {
            initialValues: {
                details: '',
                phone: '',
                city: ''
            },
            validationSchema: Yup.object({
                details: Yup.string().required('Details are required'),
                phone: Yup.string().required('Phone is required'),
                city: Yup.string().required('City is required')
            }),
            onSubmit: async values => {
                console.log(values);
                // setRegisterData(values);
                // console.log('setting registerdata state', registerData);
                if (state == 'online') {
                    let OnlinePaymentResponse = await onlinePayment(values,cartID);
                    console.log('OnlinePaymentResponse', OnlinePaymentResponse);
                    console.log('STATUS OnlinePaymentResponse', OnlinePaymentResponse?.status);
                    if (OnlinePaymentResponse?.status == "success") {
                        console.log('OnlinePaymentResponse', OnlinePaymentResponse.session.url);
                        window.location.href = OnlinePaymentResponse.session.url;
                    }
                }
                else
                    callCheckoutAPI(values);
            }
        });

    // async function callOnlinePaymentAPI(registerData) {
    //     let OnlinePaymentResponse = await onlinePayment(registerData, cartID);
    //     return OnlinePaymentResponse;
    // }

    async function callCheckoutAPI(registerData) {

        const resp = await cashOnDelivery(registerData);

        if (resp.statusMsg == 'fail') {
            setSuccessMsgFromAPI('');
            setErrorMsgFromAPI(resp.message);
            toast.error(resp.message);
        }
        else if (resp.status == 'success') {

            setErrorMsgFromAPI('');
            setSuccessMsgFromAPI(resp.message);
            toast.success(resp.message);
            console.log('response from checkout api', resp);
            useUserID.setUserID(resp.data.user);
            console.log('userid:', resp.data.user);
            Navigate('/payment');
            // callCheckoutSessionFromAPI(registerData);
        }
    }

    useEffect(() => {
        console.log('cartID', cartID);
        console.log('numOfCartItems', numOfCartItems);
    }
        ,);

    return (
        <>
            <div className="checkout">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="details" className="form-label">Details</label>
                    <input id="details" name="details" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />
                    {formik.touched.details && formik.errors.details && <p className="error-text">{formik.errors.details}</p>}


                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input id="phone" name="phone" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                    {formik.touched.phone && formik.errors.phone && <p className="error-text">{formik.errors.phone}</p>}

                    <label htmlFor="city" className="form-label">City</label>
                    <input id="city" name="city" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
                    {formik.touched.city && formik.errors.city && <p className="error-text">{formik.errors.city}</p>}

                    {errorMsgFromAPI && <p className="error-text text-center mx-auto">{errorMsgFromAPI}</p>}
                    <div className="chekout-actions-container">
                        <button type="submit" className={`chekout-btn ${(!formik.isValid || !formik.dirty) && 'disabled'}`}
                            disabled={!formik.isValid || !formik.dirty}>
                            Pay now
                        </button>
                    </div>
                </form>
            </div >
            <ToastContainer />
        </>
    );
};

export default CheckOut;