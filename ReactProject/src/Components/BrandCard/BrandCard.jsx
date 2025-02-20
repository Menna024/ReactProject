import BrandModal from '../BrandModal/BrandModal';
import './BrandCard.css';
import { useState } from 'react';

const BrandCard = ({ brand }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
    setIsModalOpen(true);
    console.log('open modal brand', brand);
};

const closeModal = () => {
    setIsModalOpen(false);
};

if (brand) {
    return (
        <>
            <div className="brand-card" onClick={openModal}>
                <a href="#" className="brand-img" >
                    <img className="mx-auto" src={brand.image} alt={brand.name} />
                </a>
                <div className="p-2 text-center">
                    <p className="name">{brand.name}</p>
                </div>
            </div>
            <BrandModal brand={brand} isOpen={isModalOpen} closeModal={closeModal} />
        </>
    );
}
};

export default BrandCard;