import { createContext } from "react";
import axios from 'axios';

export const GetAllCategoriesContext=createContext();

const GetAllCategoriesContextProvider  =({children })=>{  

    function getAllCategories() {
        console.log('GetAllCategories api context');
    
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories').
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <GetAllCategoriesContext.Provider value={{ getAllCategories }}>
            {children}
        </GetAllCategoriesContext.Provider>
    );

}

export {GetAllCategoriesContextProvider};