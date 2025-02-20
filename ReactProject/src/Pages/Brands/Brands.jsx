import React, { useState, useEffect, useContext } from 'react';
import { GetAllBrandsContext } from '../../Context/GetAllBrandsContext';
import './Brands.css';
import BrandCard from '../../Components/BrandCard/BrandCard';

const Brands = () => {

    const [brands, setBrands] = useState();
    const useAllBrands = useContext(GetAllBrandsContext);

    async function getAllBrandsFromAPI() {
        const resp = await useAllBrands.getAllBrands();

        console.log('response from get all products api', resp);

        setBrands(resp.data);
        console.log('brand state ', brands);

    }

    useEffect(() => {
        getAllBrandsFromAPI();
    }, []);



    return (
        <div>
            <h3 className="all-brands-heading">All Brands</h3>
            <div className="brands grid grid-cols-4 w-full">
                {console.log('brands jsx', brands)}
                {brands &&
                    brands.map((brand) => (
                        <div key={brand._id} className="brand">
                            {console.log('brand jsx', brand)}
                            <BrandCard brand={brand} />
                        </div>
                    ))}

            </div>
        </div>
    );
};

export default Brands;