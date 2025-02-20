import { createContext } from "react";
import axios from 'axios';

export const ForgotPassContext=createContext();

const ForgotPassContextProvider  =({children })=>{  

    function forgotPass(forgotPassData) {
        console.log('forgotPass api context');
        console.log('forgotPass data', forgotPassData);
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', forgotPassData).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <ForgotPassContext.Provider value={{ forgotPass }}>
            {children}
        </ForgotPassContext.Provider>
    );

}

export {ForgotPassContextProvider};