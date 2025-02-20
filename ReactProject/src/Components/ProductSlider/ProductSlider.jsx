import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from 'prop-types';

import './ProductSlider.css';

const ProductSlider = ({images}) => {
    console.log('images', images);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="product-slider-container">
            <Slider {...settings}>
                {images?.map((image,index) => (
                    <div key={index} className='product-img-slide'> 
                        <img src={images[index]} className='product-img' />
                        {/* <h3 className='product-title'>{product.name}</h3>  */}
                    </div>
                ))}
            </Slider>
        </div>
        
        );
};
ProductSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductSlider;
