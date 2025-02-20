import './CategoryCard.css';

const CategoryCard = ({ category }) => {


    if (category) {
        return (
            <>
                <div className="category-card" >
                    <a href="#" className="category-img" >
                        <img className="mx-auto" src={category.image} alt={category.name} />
                    </a>
                    <div className="p-2 text-center">
                        <p className="name">{category.name}</p>
                    </div>
                </div>

            </>
        );
    }
};

export default CategoryCard;