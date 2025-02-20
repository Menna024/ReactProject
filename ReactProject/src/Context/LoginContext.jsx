import { createContext } from "react";
import axios from 'axios';

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
    function login(loginData) {
        console.log('login api context');
        console.log('login data', loginData);
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginData).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <LoginContext.Provider value={{ login }}>
            {children}
        </LoginContext.Provider>
    );

}

export { LoginContextProvider };