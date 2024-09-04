import { useEffect, useState } from 'react';
import { Movies, Recipes } from '../models';
import './index.scss';
import { Link } from 'react-router-dom';
import { NavBarCalogue } from '../components/navbarCalogue';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>([]);
    const [movies, setMovies] = useState<Movies>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
        null,
    );
    const [selectedDishType, setSelectedDishType] = useState<number | null>(
        null,
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Par défaut, l'URL pour les recettes
                let recipesUrl = 'http://localhost:3000/recipes';

                // Si un type de plat est sélectionné, on utilise la route spécifique du backend
                if (selectedDishType) {
                    recipesUrl = `http://localhost:3000/Recipes/DishTypes/${selectedDishType}`;
                }

                // Si une difficulté est sélectionnée, on l'ajoute en tant que paramètre de requête
                if (selectedDifficulty) {
                    const separator = recipesUrl.includes('?') ? '&' : '?';
                    recipesUrl += `${separator}difficulty=${selectedDifficulty}`;
                }

                console.log('URL de la requête:', recipesUrl); // Vérifie l'URL générée

                const recipesResponse = await fetch(recipesUrl);
                if (!recipesResponse.ok) {
                    throw new Error(
                        'Erreur lors de la récupération des recettes',
                    );
                }
                const recipesData = await recipesResponse.json();
                setRecipes(recipesData);

                const moviesResponse = await fetch(
                    'http://localhost:3000/movies',
                );
                if (!moviesResponse.ok) {
                    throw new Error('Erreur lors de la récupération des films');
                }
                const moviesData = await moviesResponse.json();
                setMovies(moviesData);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données :',
                    error,
                );
            }
        };

        fetchData();
    }, [selectedDifficulty, selectedDishType]); // La requête change si la difficulté ou le type de plat change

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-screen-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Catalogue
                </h1>

                {/* Intégration de la NavBar avec les filtres */}
                <NavBarCalogue
                    onDifficultyFilterChange={setSelectedDifficulty}
                    onDishTypeFilterChange={setSelectedDishType}
                />

                {/* Grille des recettes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {recipes.length === 0 ? (
                        <p>Aucune recette trouvée</p>
                    ) : (
                        recipes.map((recipe) => {
                            const movie = movies.find(
                                (m) => m.id === recipe.movie_id,
                            );

                            return (
                                <div
                                    key={recipe.id}
                                    className="bg-white shadow rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={recipe.picture}
                                        alt={recipe.name}
                                        className="h-32 w-full object-cover"
                                    />
                                    {movie && (
                                        <img
                                            src={movie.picture}
                                            alt={movie.name}
                                            className="h-20 w-full object-cover mt-2"
                                        />
                                    )}
                                    <div className="p-4">
                                        {movie && (
                                            <h3 className="text-md font-medium mb-2 text-gray-700">
                                                {movie.name}
                                            </h3>
                                        )}
                                        <Link to={`/recipes/${recipe.id}`}>
                                            <button className="text-sm font-medium text-blue-600 hover:underline">
                                                {recipe.name}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};
