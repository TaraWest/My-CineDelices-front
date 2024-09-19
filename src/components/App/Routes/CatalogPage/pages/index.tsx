import { useEffect, useState } from 'react';
import { Movies, Recipes } from '../models';
import './index.scss';
import { Link } from 'react-router-dom';
import { NavBarCalogue } from '../components/navbarCalogue';
import axios from 'axios';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>([]);
    const [movies, setMovies] = useState<Movies>([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
        null,
    );
    const [selectedDishType, setSelectedDishType] = useState<number | null>(
        null,
    );

    // Variables d'état pour la pagination
    const [currentPage, setCurrentPage] = useState(1); // Actual page
    const recipesPerPage = 10; // number of recipes per page

    // Function to add a new recipe
    const handleAddRecipe = (newRecipe: any) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]); // Add the new recipe to the state
    };

    // Function reset to return to the catalogue with all recipes
    const resetFilters = () => {
        setSelectedDifficulty(null);
        setSelectedDishType(null);
    };

    // Function selection of difficulty
    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDishType(null); // Reset the dish type
        setSelectedDifficulty(difficulty); // Update the selected difficulty
        setCurrentPage(1); // Reset the current page
    };

    // Function selection of dish type
    const handleDishTypeChange = (dishTypeId: number) => {
        setSelectedDifficulty(null); // Reset the difficulty
        setSelectedDishType(dishTypeId); // Update the selected dish type
        setCurrentPage(1); // Reset the current page
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // URL initial for recipes
                let recipesUrl = 'http://localhost:3000/recipes';

                // If a dish type is selected, use the backend route specific
                if (selectedDishType) {
                    recipesUrl = `http://localhost:3000/Recipes/DishTypes/${selectedDishType}`;
                }

                // If a difficulty is selected, add it as a query parameter
                if (selectedDifficulty) {
                    const separator = recipesUrl.includes('?') ? '&' : '?';
                    recipesUrl += `${separator}difficulty=${selectedDifficulty}`;
                }

                // Retrieval of recipes with axios
                const recipesResponse = await axios.get(recipesUrl);
                setRecipes(recipesResponse.data);

                // Retrieval of movies with axios
                const moviesResponse = await axios.get(
                    'http://localhost:3000/movies',
                );
                setMovies(moviesResponse.data);
            } catch (error) {
                console.error(
                    'Erreur lors de la récupération des données :',
                    error,
                );
                setError(
                    'Une erreur est survenue lors de la récupération des données.',
                );
            }
        };

        fetchData();
    }, [selectedDifficulty, selectedDishType]);
    // Call to fetchData each time one of the filters changes

    // Calculation of indices to display the paged recipes
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Function to change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div
            className="flex justify-center items-center min-h-screen"
            style={{ backgroundColor: '#59041b' }}
        >
            {/* <div className="w-full max-w-screen-lg"> */}
            <div className="w-full px-6">
                <h1
                    onClick={resetFilters} // Reset filters by clicking on "Catalogue"
                    className="text-5xl font-extrabold mb-8 text-center cursor-pointer text-[#0d0d0d] shadow-lg shadow-black border-2 border-[#0d0d0d] bg-[#d9c7b8] rounded-lg p-4"
                >
                    Catalogue
                </h1>

                {/* Integration of the NavBar with the filters */}
                <NavBarCalogue
                    onDifficultyFilterChange={handleDifficultyChange}
                    onDishTypeFilterChange={handleDishTypeChange}
                    onAddRecipe={handleAddRecipe}
                />

                {/* Grid of recipes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {currentRecipes.length === 0 ? (
                        <p>Aucune recette trouvée</p>
                    ) : (
                        currentRecipes.map((recipe) => {
                            const movie = movies.find(
                                (m) => m.id === recipe.movie_id,
                            );

                            return (
                                <div
                                    key={recipe.id}
                                    className="bg-[#59041b] shadow rounded-lg overflow-hidden h-full flex flex-col justify-stretch"
                                    style={{
                                        boxShadow: '0px 0px 15px #d9c7b8',
                                    }}
                                >
                                    <img
                                        src={`http://localhost:3000/recipes/${recipe.picture}`}
                                        alt={recipe.name}
                                        className="w-full aspect-square object-cover border-none"
                                    />
                                    {movie && (
                                        <img
                                            src={`http://localhost:3000/movies/${movie.picture}`}
                                            alt={movie.name}
                                            className="w-full aspect-square object-cover border-none mt-1"
                                        />
                                    )}
                                    <div className="p-4 flex flex-col items-center justify-between flex-grow">
                                        {movie && (
                                            <h3 className="text-md font-medium mb-2 text-[#d9c7b8] text-center min-h-[3rem] flex items-center">
                                                {movie.name}
                                            </h3>
                                        )}
                                        <div className="flex justify-center mt-auto">
                                            <Link to={`/recette/${recipe.id}`}>
                                                <button className="text-sm font-medium text-[#0d0d0d]">
                                                    {recipe.name}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center space-x-4 mt-6">
                    {/* Previous */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1} // Disable if on the first page
                        className={`px-4 py-2 text-sm ${currentPage === 1 ? 'bg-[#d9c7b8]' : 'bg-[#d9c7b8]'} text-[#0d0d0d] rounded-lg`}
                    >
                        Précédent
                    </button>

                    {/* Next */}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastRecipe >= recipes.length} // Disable if on the last page
                        className={`px-4 py-2 text-sm ${indexOfLastRecipe >= recipes.length ? 'bg-[#d9c7b8]' : 'bg-[#d9c7b8]'} text-[#0d0d0d] rounded-lg`}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};
