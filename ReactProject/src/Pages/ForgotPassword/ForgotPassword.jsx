import { useState, useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ForgotPassContext } from "../../Context/ForgotPassContext";
import './ForgotPassword.css';
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {

    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const useForgotPass = useContext(ForgotPassContext);
    const navigator = useNavigate();

    const formik = useFormik(
        {
            initialValues: {
                email: ''
            },
            validationSchema: Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required')
            }),
            onSubmit: values => {
                console.log('submit form')
                console.log(values);
                callForgotPasswordAPI(values);


            }
        }
    )


    async function callForgotPasswordAPI() {
        console.log('forgot password method');

        if (formik.values.email == '') {
            console.log('please enter your email');
            setErrorMsgFromAPI('Please enter your email');
            return;
        }

        const resp = await useForgotPass.forgotPass({ email: formik.values.email });
        console.log('response from forgot password api', resp);

        if (resp.statusMsg == 'success') {
            console.log('email sent successfully');

            setErrorMsgFromAPI('');
            setSuccessMsgFromAPI(resp.message);

            console.log('Success message', successMsgFromAPI);

            navigator('/verify-code');
        }
        else if (resp.statusMsg == 'fail') {
            // console.log('email not sent');

            setSuccessMsgFromAPI('');
            setErrorMsgFromAPI(resp.message);
            console.log('error message', errorMsgFromAPI);
        }

    }

    return (
        <div className="forgot-password">

            <form onSubmit={formik.handleSubmit}>
                <h3 className="form-label">Please enter your verification code</h3>
                {/* <label htmlFor="email" className="form-label">Email</label> */}
                <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email && <p className="error-text">{formik.errors.email}</p>}


                {errorMsgFromAPI && <p className="error-text">{errorMsgFromAPI}</p>}
                {successMsgFromAPI && <p className="success-text">{successMsgFromAPI}</p>}

                <div className="forgot-pass-actions-container">
                    <button type="submit" className={`verify-btn ${(!formik.isValid || !formik.dirty) &&
                        'disabled'}`}
                        disabled={!formik.isValid || !formik.dirty}>
                        Verify
                    </button>
                </div>
            </form>

        </div>
    );
};

export default ForgotPassword;