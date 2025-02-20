import { createContext } from 'react';
import axios from 'axios';

export const RegisterContext = createContext();

const RegisterContextProvider = ({ children }) => {
     function register(registerData) {
        console.log('register api context');
        console.log('register data', registerData);
        return  axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', registerData).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <RegisterContext.Provider value={{ register }}>
            {children}
        </RegisterContext.Provider>
    );
};

export { RegisterContextProvider };