import { createContext } from "react";
import axios from 'axios';

export const GetAllBrandsContext=createContext();

const GetAllBrandsContextProvider  =({children })=>{  

    function getAllBrands() {
        console.log('GetAllBrands api context');
    
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands').
            then(response => { console.log(response.data); return response.data })
            .catch(error => { console.log(error.response.data); return error.response.data });
    }

    return (
        <GetAllBrandsContext.Provider value={{ getAllBrands }}>
            {children}
        </GetAllBrandsContext.Provider>
    );

}

export {GetAllBrandsContextProvider};