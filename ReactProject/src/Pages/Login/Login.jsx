import './Login.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NavLink } from "react-router-dom";
import { useContext, useState } from 'react';
import { LoginContext } from '../../Context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

const Login = () => {
    const useLogin = useContext(LoginContext);
    const { Token, setToken } = useContext(TokenContext);
    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');
    const [successMsgFromAPI, setSuccessMsgFromAPI] = useState('');
    const navigate = useNavigate();

    const formik = useFormik(
        {
            initialValues: {
                email: '',
                password: ''
            },
            validationSchema: Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required')
            }),
            onSubmit: values => {
                console.log('submit form')
                console.log(values);
                callLoginAPI(values);

            }
        });

    async function callLoginAPI(registerData) {
        console.log('call login api')
        const resp = await useLogin.login(registerData);

        setErrorMsgFromAPI('');
        console.log('response message  from register api', resp.message);

        if (resp.message == 'success') {
            console.log('account created successfully');

            setErrorMsgFromAPI('');
            setSuccessMsgFromAPI(resp.message);
            
            setToken(resp.token);
            console.log('After setting token from Token Context token', Token);

            localStorage.setItem('token', resp.token);
            localStorage.setItem('user', JSON.stringify(resp.user));
            // window.location.href = '/';
            console.log('After setting token from Token Context token', Token);
            navigate('/home');
        } else
            if (resp.message == 'Incorrect email or password') {
                console.log('Incorrect email or password');

                setSuccessMsgFromAPI('');
                setErrorMsgFromAPI(resp.message);
                
                console.log('error message', errorMsgFromAPI);
            }
            else if(resp.message=='fail')
            {
                console.log('fail');

                setSuccessMsgFromAPI('');
                setErrorMsgFromAPI(resp.errors.msg);
                
                console.log('error message', errorMsgFromAPI);
            }
    }

  

    return (
        <div className="login">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email && <p className="error-text">{formik.errors.email}</p>}

                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                {formik.touched.password && formik.errors.password && <p className="error-text">{formik.errors.password}</p>}

                {errorMsgFromAPI && <p className="error-text">{errorMsgFromAPI}</p>}
                {successMsgFromAPI && <p className="success-text">{successMsgFromAPI}</p>}

                <div className="login-actions-container">
                    <NavLink to={'/forgot-password'}>Forgot your password?</NavLink>
                    <button type="submit" className={`login-btn ${(!formik.isValid || !formik.dirty) &&
                        'disabled'}`}
                        disabled={!formik.isValid || !formik.dirty}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;