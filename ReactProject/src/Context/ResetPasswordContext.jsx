import { createContext } from "react";
import axios from 'axios';

export const ResetPasswordContext = createContext();

const ResetPasswordContextProvider = ({ children }) => {

    function resetPassword(resetPasswordData) {
        console.log('ResetPassword api context');
        console.log('ResetPassword data', resetPasswordData);
        return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            email: resetPasswordData.email,
            newPassword: resetPasswordData.newPassword
        }).
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <ResetPasswordContext.Provider value={{ resetPassword }}>
            {children}
        </ResetPasswordContext.Provider>
    );

}

export { ResetPasswordContextProvider };