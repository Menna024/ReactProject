import * as Yup from 'yup';
import { useFormik } from 'formik';
import './CheckOut.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateOrderContext } from '../../Context/CreateOrderContext';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const CheckOut = () => {

    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const useCreateOrder = useContext(CreateOrderContext);
    const { cartID } = useParams();
    

    const navigate = useNavigate();
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
            onSubmit: values => {
                console.log(values);
                // setRegisterData(values);
                // console.log('setting registerdata state', registerData);
                callCheckoutAPI(values);
            }
        });


    async function callCheckoutAPI(registerData) {
        const resp = await useCreateOrder.createOrder(cartID,registerData);

        if(resp.statusMsg=='fail')
        {
            setSuccessMsgFromAPI('');
            setErrorMsgFromAPI(resp.message);
            toast.error(resp.message);
        }
        else if(resp.status=='success')
        console.log('response from checkout api', resp);
    }

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
            </div>
            <ToastContainer />
        </>
    );
};

export default CheckOut;