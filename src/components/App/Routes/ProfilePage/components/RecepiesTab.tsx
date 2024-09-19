// RecepiesTab.tsx
import React, { useState } from 'react';
import { IRecipe } from '../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
                <div className="img-container flex-col" key={recipe.id}>
                    <div className="flex">
                        <div className="img-left">
                            <img
                                src={`http://localhost:3000/recipes/${recipe.picture}`}
                                alt={`image illustrant la recette : ${recipe.name}`}
                                className="random-img random-img-left aspect-square "
                            />
                            <p className="inspiration-subtitle">
                                {recipe.name}
                            </p>
                        </div>
                        <div className="img-right ">
                            <img
                                src={`http://localhost:3000/movies/${recipe.Movie.picture}`}
                                alt={`image illustrant le film : ${recipe.Movie.name}`}
                                className="random-img random-img-right aspect-square"
                            />

                            <p className="inspiration-subtitle">
                                {recipe.Movie.name}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleValidateModal}
                        className="button-link"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="p-6 rounded-lg shadow-lg text-center">
                                <p>
                                    Êtes-vous sûr de vouloir supprimer
                                    définitivement votre recette ?
                                </p>
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() =>
                                            handleDeleteFunction(recipe.id)
                                        }
                                        className="button m-2"
                                    >
                                        Oui
                                    </button>
                                    <button
                                        onClick={handleValidateModal}
                                        className="button m-2"
                                    >
                                        Non
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RecepiesTab;
