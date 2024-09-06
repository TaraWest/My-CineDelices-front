import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IRecipe } from '../../models';
import { Link } from 'react-router-dom';
import './slider.scss';

function Slider() {
    const [tenrecipes, setTenrecipes] = useState<IRecipe[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function nextSlide() {
        // % permet et de revenir à 0
        setCurrentIndex((currentIndex + 1) % tenrecipes.length);
    }

    function previousSlide() {
        setCurrentIndex(
            (currentIndex - 1 + tenrecipes.length) % tenrecipes.length,
        );
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
        <div>
            <div className="main_slider">
                <div className="img-left" onClick={previousSlide}>
                    <img
                        src={`/recipes/${tenrecipes[currentIndex].picture}`}
                        alt={`image illustrant la recette : "${tenrecipes[currentIndex].name}"`}
                    />
                    <p className="inspiration-subtitle">
                        {`MANGE "${tenrecipes[currentIndex].Movie?.name}
                        "`}
                    </p>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="icon-arrow left"
                    />
                </div>
                <div className="img-right" onClick={nextSlide}>
                    <img
                        src={`/movies/${tenrecipes[currentIndex].Movie?.picture}`}
                        alt={`image illustrant le film : "${tenrecipes[currentIndex].Movie?.name}"`}
                    />
                    <p className="inspiration-subtitle">
                        {`REGARDE "${tenrecipes[currentIndex].Movie?.name}
                        "`}
                    </p>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="icon-arrow right"
                    />
                </div>
            </div>
            <Link
                to={`/recette/${tenrecipes[currentIndex].id}`}
                className="button-link"
            >
                Voir le détail
            </Link>
        </div>
    );
}

export default Slider;
