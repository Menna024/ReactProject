import * as Yup from 'yup';
import { useFormik } from 'formik';
import './Signup.css';
import { useContext, useState } from 'react';
import { RegisterContext } from '../../Context/RegisterContext';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

const Signup = () => {
    const [errorMsgFromAPI, setErrorMsgFromAPI] = useState('');

    const useRegister = useContext(RegisterContext);
    const { Token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();

    const formik = useFormik(
        {
            initialValues: {
                name: '',
                email: '',
                password: '',
                rePassword: '',
                phone: ''
            },
            validationSchema: Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required'),
                rePassword: Yup.string().required('rePassword is required'),
                name: Yup.string().required('Name is required'),
                phone: Yup.string().required('Phone is required')
            }),
            onSubmit: values => {
                console.log(values);
                // setRegisterData(values);
                // console.log('setting registerdata state', registerData);
                callRegisterAPI(values);
            }
        });

    async function callRegisterAPI(registerData) {
        const resp = await useRegister.register(registerData);
        // console.log('response from register api', resp);
        setErrorMsgFromAPI('');
        console.log('response message  from register api', resp.message);
        // handle account already exxists
        // handle success and store token to local storage
        if (resp.message == 'success') {
            console.log('account created successfully');

            localStorage.setItem('token', resp.token);
            localStorage.setItem('user', JSON.stringify(resp.user));
            setToken(resp.token);
            console.log('After setting token from Token Context token', Token);
            navigate('/home');
        } else
            if (resp.message == 'Account Already Exists') {
                console.log('account already exists');
                setErrorMsgFromAPI(resp.message);
                console.log('error message', errorMsgFromAPI);
            }
            else if (resp.message == 'fail') {
                console.log('failed to create account');

                setErrorMsgFromAPI(resp.errors.param + '- ' + resp.errors.msg);
                console.log('error message', errorMsgFromAPI);
            }
    }

    return (
        <>

            <div className="signup">

                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="name" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                    {formik.touched.name && formik.errors.name && <p className="error-text">{formik.errors.name}</p>}


                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    {formik.touched.email && formik.errors.email && <p className="error-text">{formik.errors.email}</p>}

                    <label htmlFor="password" className="form-label">Password</label>
                    <input id="password" name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                    {formik.touched.password && formik.errors.password && <p className="error-text">{formik.errors.password}</p>}

                    <label htmlFor="rePassword" className="form-label">Confirm Password</label>
                    <input id="rePassword" name="rePassword" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} />
                    {formik.touched.rePassword && formik.errors.rePassword && <p className="error-text">{formik.errors.rePassword}</p>}

                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input id="phone" name="phone" type="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                    {formik.touched.phone && formik.errors.phone && <p className="error-text">{formik.errors.phone}</p>}

                    {errorMsgFromAPI && <p className="error-text text-center mx-auto">{errorMsgFromAPI}</p>}
                    <div className="signup-actions-container">
                        <button type="submit" className={`signup-btn ${(!formik.isValid || !formik.dirty) && 'disabled'}`}
                            disabled={!formik.isValid || !formik.dirty}>
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};


export default Signup;

