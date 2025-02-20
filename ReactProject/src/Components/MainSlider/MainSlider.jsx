import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './MainSlider.css';

const MainSlider = () => {
    async function getCategories() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    const { data } = useQuery(
        {
            queryKey: ['categories'],
            queryFn: getCategories
        }
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        // slidesToScroll: 1,
    };

    console.log('categories', data?.data?.data);
    // return (
    //     <Slider {...settings} className='secondary-slider'>
    //         {/* <div className='secondary-slider'> */}
    //             {data?.data?.data?.map((category) => (
    //                 < div key={category._id} className='bg-red-600 ' >
    //                     {console.log('category id', category._id)}
    //                     <img src={category.image} alt={category.name} className='category-img' />
    //                     <h3 className='xo bg-green-700 z-50'>{category._id}</h3>
    //                 </div>
    //             ))}
    //         {/* </div> */}
    //     </Slider >
    // );

    return (
        <div className="main-slider-container">
            <Slider {...settings}>


                {data?.data?.data?.slice(0, 2).map((category) => (
                    <div key={category._id} className='category-slide'>
                        <img src={category.image} alt={category.name} className='category-img' />
                        {/* <h3 className='category-title'>{category.name}</h3> */}
                    </div>
                ))}
            </Slider>
        </div>);
};

export default MainSlider;
