import { useEffect, useState } from 'react';
import { IRecipe } from '../homePagetype';
import { Link } from 'react-router-dom';
import './slider.scss';

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
            const response = await fetch(
                'http://localhost:3000/recipes/random',
            );
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
            <div className="img-left" onClick={previousSlide}>
                <img
                    src={tenrecipes[currentIndex]?.picture}
                    alt={`image illustrant la recette : "${tenrecipes[currentIndex]?.name}"`}
                />
            </div>
            <div className="img-right" onClick={nextSlide}>
                <img
                    src={tenrecipes[currentIndex]?.Movie?.picture}
                    alt={`image illustrant le film : "${tenrecipes[currentIndex]?.Movie?.name}"`}
                />
            </div>
            <Link to={`/recipes/${tenrecipes[currentIndex]?.id}`}>
                Voir le détail
            </Link>
        </div>
    );
}

export default Slider;
