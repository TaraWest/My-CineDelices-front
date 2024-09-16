// RecepiesTab.tsx
import React, { useState } from 'react';
import { IRecipe } from '../models';
import AddRecipeModal from '../../CatalogPage/components/modal';
import { fetchDeleteRecipe } from '../services';

interface RecepiesTabProps {
    recipies: IRecipe[];
    getUserRecipes: () => void; // Function passed from parent to refresh recipes
}

// I'm using here a reusable modale (AddRecipeModal) from cataloguePage and this need a function
const handleAddRecipe = (newRecipe: any) => {
    console.log('Nouvelle recette ajoutée :', newRecipe);
};

const RecepiesTab: React.FC<RecepiesTabProps> = ({
    recipies,
    getUserRecipes,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleValidateModal() {
        setIsOpen(!isOpen);
    }

    async function handleDeleteRecipe(recipeId: number) {
        await fetchDeleteRecipe(recipeId);
        getUserRecipes(); // Fetch updated list after deletion
        handleValidateModal(); // Close modal
    }

    if (recipies.length === 0) {
        return (
            <div className="justify-center flex-col h-160">
                <p>Vous n'avez pas encore créé de recettes</p>
                <AddRecipeModal onAddRecipe={handleAddRecipe} />
            </div>
        );
    }

    return (
        <div className="justify-center flex-col h-160">
            <AddRecipeModal onAddRecipe={handleAddRecipe} />
            {recipies.map((recipe) => (
                <div className="img-container" key={recipe.id}>
                    <div className="img-left">
                        <img
                            src={`http://localhost:3000/recipes/${recipe.picture}`}
                            alt={`image illustrant la recette : ${recipe.name}`}
                            className="random-img random-img-left"
                        />
                        <p className="inspiration-subtitle">{recipe.name}</p>
                    </div>
                    <div className="img-right">
                        <img
                            src={`http://localhost:3000/movies/${recipe.Movie.picture}`}
                            alt={`image illustrant le film : ${recipe.Movie.name}`}
                            className="random-img random-img-right"
                        />
                        <p className="inspiration-subtitle">
                            {recipe.Movie.name}
                        </p>
                    </div>
                    <button
                        onClick={handleValidateModal}
                        className="button-link"
                    >
                        Supprimer
                    </button>
                    {isOpen && (
                        <div className="modal">
                            <p>
                                Êtes-vous sûr de vouloir supprimer
                                définitivement votre recette ?
                            </p>
                            <button
                                onClick={() => handleDeleteRecipe(recipe.id)}
                                className="button"
                            >
                                Oui
                            </button>
                            <button
                                onClick={handleValidateModal}
                                className="button"
                            >
                                Non
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RecepiesTab;
