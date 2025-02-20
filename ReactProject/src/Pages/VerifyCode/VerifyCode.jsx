import { useState, useContext } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { VerifyCodeContext } from "../../Context/VerifyCodeContext";
import './VerifyCode.css';
import { useNavigate } from "react-router-dom";


const VerifyCode = () => {

    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const useVerifyCode = useContext(VerifyCodeContext);
    const navigator = useNavigate();

    const formik = useFormik(
        {
            initialValues: {
                resetCode: ''
            },
            validationSchema: Yup.object({
                resetCode: Yup.string().required('Reset code is required')
            }),
            onSubmit: values => {
                console.log('submit form')
                console.log(values);
                callVerifyCodeAPI(values);
            }
        }
    )


    async function callVerifyCodeAPI() {
        console.log('verify code method');

        if (formik.values.resetCode == '') {
            console.log('please enter your resetCode');
            setErrorMsgFromAPI('Please enter your resetCode');
            return;
        }

        const resp = await useVerifyCode.verifycode({ resetCode: formik.values.resetCode });
        console.log('response from reset code api', resp);

        if (resp.status == 'Success') {
            console.log('resetCode sent successfully');

            setErrorMsgFromAPI('');
            setSuccessMsgFromAPI(resp.status);

            navigator('/reset-password');
            console.log('Success message', successMsgFromAPI);
        }
        else if (resp.statusMsg == 'fail') {
            // console.log('email not sent');

            setSuccessMsgFromAPI('');
            setErrorMsgFromAPI(resp.message);
            console.log('error message', errorMsgFromAPI);
        }

    }

    return (
        <div className="verify-code">

            <form onSubmit={formik.handleSubmit}>
                <h3 className="form-label">Please reset your account password</h3>
                {/* <label htmlFor="email" className="form-label">Email</label> */}
                <input id="resetCode" name="resetCode" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} />
                {formik.touched.resetCode && formik.errors.resetCode && <p className="error-text">{formik.errors.resetCode}</p>}


                {errorMsgFromAPI && <p className="error-text">{errorMsgFromAPI}</p>}
                {successMsgFromAPI && <p className="success-text">{successMsgFromAPI}</p>}

                <div className="verify-code-actions-container">                    
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

export default VerifyCode;