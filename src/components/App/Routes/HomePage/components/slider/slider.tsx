import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IRecipe } from '../../models';
import './slider.scss'; // Assure-toi que le style est bien géré

function RecipeSlider() {
    const [tenRecipes, setTenRecipes] = useState<IRecipe[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [transitionState, setTransitionState] = useState<string>('active');

    // Fonction pour passer à la slide suivante
    function nextSlide() {
        setTransitionState('exit'); // Démarre la transition de sortie
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % tenRecipes.length);
            setTransitionState('enter'); // Démarre la transition d'entrée
        }, 500); // Attendre que l'animation de sortie soit terminée
    }

    // Fonction pour revenir à la slide précédente
    function previousSlide() {
        setTransitionState('exit'); // Démarre la transition de sortie
        setTimeout(() => {
            setCurrentIndex(
                (currentIndex - 1 + tenRecipes.length) % tenRecipes.length,
            );
            setTransitionState('enter'); // Démarre la transition d'entrée
        }, 500); // Attendre que l'animation de sortie soit terminée
    }

    // Fonction pour récupérer les 10 recettes de l'API
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

    // Effet pour récupérer les recettes à l'initialisation du composant
    useEffect(() => {
        fetchTenRecipes();
    }, []);

    // Autoplay pour faire défiler automatiquement les slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change toutes les 3 secondes

        return () => clearInterval(interval); // Nettoie l'intervalle à la fin du cycle
    }, [currentIndex, tenRecipes.length]);

    // Effet pour gérer les transitions d'entrée et de sortie
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
