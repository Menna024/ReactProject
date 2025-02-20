import { createContext } from "react";
import axios from 'axios';

export const VerifyCodeContext=createContext();

const VerifyCodeContextProvider  =({children })=>{  

    function verifycode(code) {
        console.log('verify code api context');
        console.log('code data', code);
        return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', code).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <VerifyCodeContext.Provider value={{ verifycode }}>
            {children}
        </VerifyCodeContext.Provider>
    );

}

export {VerifyCodeContextProvider};