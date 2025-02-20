import { useState, useEffect, useContext } from 'react';
import './Categories.css';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import { GetAllCategoriesContext } from '../../Context/GetAllCategoriesContext';

const Categories = () => {

    const [categories, setCategories] = useState();
    const useAllCategory = useContext(GetAllCategoriesContext);

    async function getAllcategoryFromAPI() {
        const resp = await useAllCategory.getAllCategories();

        console.log('response from get all products api', resp);

        setCategories(resp.data);
        console.log('category state ', categories);

    }

    useEffect(() => {
        getAllcategoryFromAPI();
    }, []);



    return (
        <div className="w-full"> {/* Make sure the parent takes full width */}
            <h3 className="all-categories-heading">All Categories</h3>
            <div className="categories grid grid-cols-3 "> 
                {console.log('categories jsx', categories)}
                {categories &&
                    categories.map((category) => (
                        <div key={category._id} className="category">
                            {console.log('category jsx', category)}
                            <CategoryCard category={category} />
                        </div>
                    ))}

            </div>
        </div>
    );
};

export default Categories;