// RecepiesTab.tsx
import React, { useState } from 'react';
import { IRecipe } from '../models';
import AddRecipeModal from '../../CatalogPage/components/modal';

interface RecepiesTabProps {
    recipies: IRecipe[];
    handleDeleteRecipe: (id: number) => void; // Function passed from parent to refresh recipes
    setRecipies: React.Dispatch<React.SetStateAction<IRecipe[]>>;
}

const RecepiesTab: React.FC<RecepiesTabProps> = ({
    recipies,
    handleDeleteRecipe,
    setRecipies,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Add the new recipe in the interface
    const handleAddRecipe = (newRecipe: any) => {
        setRecipies((prevRecipies) => [...prevRecipies, newRecipe]);
    };

    function handleValidateModal() {
        setIsOpen(!isOpen);
    }

    function handleDeleteFunction(id: number) {
        handleDeleteRecipe(id);
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
                        {recipe.movie?.picture && recipe.movie?.name && (
                            <img
                                src={`http://localhost:3000/movies/${recipe.movie.picture}`}
                                alt={`image illustrant le film : ${recipe.movie.name}`}
                                className="random-img random-img-right"
                            />
                        )}
                        {recipe.movie?.name && (
                            <p className="inspiration-subtitle">
                                {recipe.movie.name}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleValidateModal}
                        className="button-link"
                    >
                        Supprimer
                    </button>
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <p>
                                Êtes-vous sûr de vouloir supprimer
                                définitivement votre recette ?
                            </p>
                            <button
                                onClick={() => handleDeleteFunction(recipe.id)}
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
