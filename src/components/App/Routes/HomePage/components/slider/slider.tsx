import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IRecipe } from '../../models';
import './slider.scss';

function RecipeSlider() {
    const [tenRecipes, setTenRecipes] = useState<IRecipe[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [transitionState, setTransitionState] = useState<string>('active');

    // Function for next slide
    function nextSlide() {
        setTransitionState('exit'); // Begins the exit transition
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % tenRecipes.length);
            setTransitionState('enter'); // Begins the enter transition
        }, 500); // Wait that the exit transition is complete
    }

    // Function for previous slide
    function previousSlide() {
        setTransitionState('exit');
        setTimeout(() => {
            setCurrentIndex(
                (currentIndex - 1 + tenRecipes.length) % tenRecipes.length,
            );
            setTransitionState('enter');
        }, 500);
    }

    // Function for fetching 10 recipies random
    async function fetchTenRecipes() {
        try {
            const response = await fetch(
                'http://localhost:3000/recipes/random',
            );
            const data = await response.json();
            setTenRecipes(data);
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des recettes :',
                error,
            );
        }
    }

    // When the composant is loaded, fetch 10 random recipes
    useEffect(() => {
        fetchTenRecipes();
    }, []);

    // Callback for next slide
    const nextSlideCallback = useCallback(nextSlide, [
        currentIndex,
        tenRecipes.length,
    ]);
    // Autoplay of the slider
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlideCallback();
        }, 5000); // Change the slide every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component
    }, [currentIndex, tenRecipes.length, nextSlideCallback]);

    // When the currentIndex or transitionState change, start the enter transition
    useEffect(() => {
        if (transitionState === 'enter') {
            setTimeout(() => setTransitionState('active'), 10);
        }
    }, [currentIndex, transitionState]);

    if (tenRecipes.length === 0) {
        return <div>Un instant, ça charge...</div>;
    }

    const currentRecipe = tenRecipes[currentIndex];
    const currentMovie = currentRecipe.Movie;

    return (
        <div className="slider">
            <div className="main_slider">
                <div
                    className={`img-left ${transitionState}`}
                    onClick={previousSlide}
                >
                    <img
                        className="img-img-left"
                        src={`http://localhost:3000/recipes/${currentRecipe?.picture}`}
                        alt={`Image illustrant la recette : "${currentRecipe?.name}"`}
                    />
                    <p className="inspiration-subtitle">
                        {`MANGE "${currentRecipe?.name}"`}
                    </p>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="icon-arrow left"
                    />
                </div>
                <div
                    className={`img-right ${transitionState}`}
                    onClick={nextSlide}
                >
                    <img
                        className="img-img-right"
                        src={`http://localhost:3000/movies/${currentMovie?.picture}`}
                        alt={`Image illustrant le film : "${currentMovie?.name}"`}
                    />
                    <p className="inspiration-subtitle">
                        {`REGARDE "${currentMovie?.name}"`}
                    </p>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="icon-arrow right"
                    />
                </div>
            </div>
            <Link to={`/recette/${currentRecipe?.id}`} className="button-link">
                Voir le détail
            </Link>
        </div>
    );
}

export default RecipeSlider;
