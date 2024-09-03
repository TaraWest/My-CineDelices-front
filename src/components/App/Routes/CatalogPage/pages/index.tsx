import { useEffect, useState } from 'react';
import { NavBarCalogue } from '../components/navbarCalogue';
import { Movies, Recipes } from '../models';
import './index.scss';

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

                <NavBarCalogue></NavBarCalogue>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="bg-white shadow rounded-lg p-4"
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {recipe.name}
                                </h2>
                                <img
                                    src={recipe.picture}
                                    alt={recipe.name}
                                    className="h-32 w-full object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mt-6">Films associés</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="bg-white shadow rounded-lg p-4"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    {movie.name}
                                </h3>
                                <img
                                    src={movie.picture}
                                    alt={movie.name}
                                    className="h-32 w-full object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
