import { useEffect, useState } from 'react';
import { NavBarCalogue } from '../components/navbarCalogue';
import { Movies, Recipes } from '../models';
import './index.scss';
import { Link } from 'react-router-dom';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>([]);
    const [movies, setMovies] = useState<Movies>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipesResponse = await fetch(
                    'http://localhost:3000/recipes',
                );
                const recipesData = await recipesResponse.json();
                setRecipes(recipesData);

                const moviesResponse = await fetch(
                    'http://localhost:3000/movies',
                );
                const moviesData = await moviesResponse.json();
                setMovies(moviesData);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des recettes',
                    error,
                );
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-screen-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Catalogue
                </h1>

                <NavBarCalogue />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {recipes.map((recipe) => {
                        // Associe le film à la recette en utilisant un ID correspondant
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
                    })}
                </div>
            </div>
        </div>
    );
};
