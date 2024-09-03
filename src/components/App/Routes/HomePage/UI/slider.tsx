import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../homePagetype';

function Slider() {
    const [tenrecipes, setTenrecipes] = useState<IRecipe[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function nextSlide() {
        setCurrentIndex(currentIndex + 1);
    }

    function previousSlide() {
        setCurrentIndex(currentIndex - 1);
    }

    async function fetchTenRecipes() {
        try {
            const response = await fetch('/dataForSlider.json');
            const data = await response.json();
            console.log('then/success', data);
            setTenrecipes(data);
        } catch (error) {
            console.log('catch/error', error);
        }
    }

    useEffect(() => {
        fetchTenRecipes();
    }, []);
    return (
        <div className="main_slider">
            {tenrecipes.map((recipe) => (
                <div key={recipe.id}>
                    <div className="img-left" onClick={previousSlide}>
                        <img
                            src={recipe?.picture}
                            alt={`image illustrant la recette : ${recipe?.name}`}
                        />
                    </div>
                    <div className="img-right" onClick={nextSlide}>
                        <img
                            src={recipe?.picture}
                            alt={`image illustrant la recette : ${recipe?.name}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Slider;
