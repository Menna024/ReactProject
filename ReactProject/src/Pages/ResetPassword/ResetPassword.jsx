import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ResetPasswordContext } from "../../Context/ResetPasswordContext";
import './ResetPassword.css';

const ResetPassword = () => {
    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const  useResetPassword  = useContext(ResetPasswordContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            newPassword: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/(?=.*[0-9])/, 'Password must contain a number')
        }),
        onSubmit: values => {
                 callResetPasswordAPI(values);
                console.log('submit form')
                console.log(values);
        }
    });

    async function callResetPasswordAPI(values) {

        const resp = await useResetPassword.resetPassword(values);

        if (resp.statusMsg == 'fail') {
            setSuccessMsgFromAPI('');
            setErrorMsgFromAPI(resp.message);
        }
        else {
            setErrorMsgFromAPI('');
            setSuccessMsgFromAPI(resp.message);

        }

        return resp;
    }

    return (
        <div className="reset-password">
            <form onSubmit={formik.handleSubmit}>
                <h3 >Please enter your verification code</h3>
                <label htmlFor="password" className="form-label">Email</label>
                <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email && <p className="error-text">{formik.errors.email}</p>}

                <label htmlFor="password" className="form-label">Password</label>   
                <input id="newPassword" name="newPassword" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} />
                {formik.touched.newPassword && formik.errors.newPassword && <p className="error-text">{formik.errors.newPassword}</p>}

                {errorMsgFromAPI && <p className="error-text">{errorMsgFromAPI}</p>}
                {successMsgFromAPI && <p className="success-text">{successMsgFromAPI}</p>}

                <div className="reset-pass-actions-container">
                    <button type="submit" className={`verify-btn ${(!formik.isValid || !formik.dirty) && 'disabled'}`}
                     disabled={!formik.isValid || !formik.dirty}>
                        Verify
                    </button>
                </div>
            </form >
        </div >
    );
};

export default ResetPassword;