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
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const recipesPerPage = 10; // Nombre de recettes par page

    // Fonction pour ajouter une nouvelle recette
    const handleAddRecipe = (newRecipe: any) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe]); // Ajout de la nouvelle recette dans l'état
    };

    // Fonction reset pour retourner sur le catalogue avec toutes les recettes
    const resetFilters = () => {
        setSelectedDifficulty(null);
        setSelectedDishType(null);
    };

    // Fonction sélection de difficulté
    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDishType(null); // Réinitialise le type de plat
        setSelectedDifficulty(difficulty); // Met à jour la difficulté sélectionnée
        setCurrentPage(1); // Réinitialiser la page actuelle
    };

    // Fonction sélection type de plat
    const handleDishTypeChange = (dishTypeId: number) => {
        setSelectedDifficulty(null); // Réinitialise la difficulté
        setSelectedDishType(dishTypeId); // Met à jour le type de plat sélectionné
        setCurrentPage(1); // Réinitialiser la page actuelle
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // URL initiale pour les recettes
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

                // Récupération des recettes avec axios
                const recipesResponse = await axios.get(recipesUrl);
                setRecipes(recipesResponse.data);

                // Récupération des films avec axios
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
    // Appel à fetchData chaque fois que l'un des filtres change

    // Calcul des indices pour afficher les recettes paginées
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Fonction pour changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div
            className="flex justify-center items-center min-h-screen"
            style={{ backgroundColor: '#59041b' }}
        >
            {/* <div className="w-full max-w-screen-lg"> */}
            <div className="w-full px-6">
                <h1
                    onClick={resetFilters} // Réinitialise les filtres au clic sur "Catalogue"
                    className="text-5xl font-extrabold mb-8 text-center cursor-pointer text-[#0d0d0d] shadow-lg shadow-black border-2 border-[#0d0d0d] bg-[#d9c7b8] rounded-lg p-4"
                >
                    Catalogue
                </h1>

                {/* Intégration de la NavBar avec les filtres */}
                <NavBarCalogue
                    onDifficultyFilterChange={handleDifficultyChange}
                    onDishTypeFilterChange={handleDishTypeChange}
                    onAddRecipe={handleAddRecipe}
                />

                {/* Grille des recettes */}
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
                                    className="bg-[#59041b] shadow rounded-lg overflow-hidden h-full flex flex-col"
                                    style={{
                                        boxShadow: '0px 0px 15px #d9c7b8',
                                    }}
                                >
                                    <img
                                        src={`http://localhost:3000/recipes/${recipe.picture}`}
                                        alt={recipe.name}
                                        className="h-full w-full object-cover object-center border-none"
                                    />
                                    {movie && (
                                        <img
                                            src={`http://localhost:3000/movies/${movie.picture}`}
                                            alt={movie.name}
                                            className="h-full w-full object-cover object-center border-none  mt-1"
                                        />
                                    )}
                                    <div className="p-4">
                                        {movie && (
                                            <h3 className="text-md font-medium mb-2 text-[#d9c7b8] text-center">
                                                {movie.name}
                                            </h3>
                                        )}
                                        <div className="flex justify-center">
                                            <Link to={`/recette/${recipe.id}`}>
                                                <button className="text-sm font-medium text-[#0d0d0d] ">
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
                    {/* Précédent */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1} // Désactiver si on est sur la première page
                        className={`px-4 py-2 text-sm ${currentPage === 1 ? 'bg-[#d9c7b8]' : 'bg-[#d9c7b8]'} text-[#0d0d0d] rounded-lg`}
                    >
                        Précédent
                    </button>

                    {/* Suivant */}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastRecipe >= recipes.length} // Désactiver si on est à la dernière page
                        className={`px-4 py-2 text-sm ${indexOfLastRecipe >= recipes.length ? 'bg-[#d9c7b8]' : 'bg-[#d9c7b8]'} text-[#0d0d0d] rounded-lg`}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};
