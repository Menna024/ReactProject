
// const BrandModal = ({ brand }) => {
//     console.log('brand modal', brand);

//     return (
//         <div>

//             <div>
//                 {/* Modal toggle */}
//                 {/* <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
//                     Toggle modal
//                 </button> */}
//                 {/* Main modal */}
//                 <div id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
//                     <div className="relative p-4 w-full max-w-2xl max-h-full">
//                         {/* Modal content */}
//                         <div className="relative bg-red rounded-lg shadow-sm dark:bg-gray-700">
//                             {/* Modal header */}
//                             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//                                 <h3 className="text-xl font-semibold text-gray-900 dark:text-red">
//                                     Terms of Service
//                                 </h3>
//                                 <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-red" data-modal-hide="default-modal">
//                                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                                     </svg>
//                                     <span className="sr-only">Close modal</span>
//                                 </button>
//                             </div>
//                             {/* Modal body */}
//                             <div className="p-4 md:p-5 space-y-4">
//                                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//                                     With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
//                                 </p>
//                                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//                                     The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
//                                 </p>
//                             </div>
//                             {/* Modal footer */}
//                             <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                                 <button data-modal-hide="default-modal" type="button" className="text-red bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
//                                 <button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-red rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-red dark:hover:bg-gray-700">Decline</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default BrandModal;


// import './BrandModal.css'; // Import your CSS
// import PropTypes from 'prop-types';

// const BrandModal = ({ brand, isOpen, closeModal }) => {
//     if (!isOpen) {
//         return null; // Don't render anything if not open
//     }

//     return (
//         <div className="modal-overlay"> {/* The overlay */}
//         {console.log('brand modal opened', brand)}
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h3 className="modal-title">{brand.name} Details</h3> {/* Use brand data */}
//                     <button className="modal-close" onClick={closeModal}>&times;</button>
//                 </div>
//                 <div className="modal-body">
//                     {/* Add more details about the brand here */}
//                     <p>Brand Description: {brand.description || "No description available"}</p>
//                     {/* ... other brand information ... */}
//                 </div>
//                 <div className="modal-footer">
//                     <button className="modal-close-btn" onClick={closeModal}>Close</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// BrandModal.propTypes = {
//     brand: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string,
//     }).isRequired,
//     isOpen: PropTypes.bool.isRequired,
//     closeModal: PropTypes.func.isRequired,
// };

// export default BrandModal;


import './BrandModal.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const BrandModal = ({ brand, isOpen, closeModal }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open'); // Add class to body
        } else {
            document.body.classList.remove('modal-open'); // Remove class from body
        }
        return () => {
            document.body.classList.remove('modal-open'); // Clean up on unmount
        };
    }, [isOpen]);


    if (!isOpen) {
        return null;
    }

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">{brand.name}</h3>
                    <button className="modal-close" onClick={closeModal}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="modal-description">
                        <h3 className="modal-slug">{brand.slug}</h3>
                    </div>
                    <div className="modal-image">
                        <img src={brand.image} alt={brand.name} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-close-btn" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
};


BrandModal.propTypes = {
    brand: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default BrandModal;