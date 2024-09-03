import { useState } from 'react';
import { NavBarCalogue } from '../components/navbarCalogue';
import { Recipe, Recipes } from '../models';
import { getRecipes } from '../services';
import './index.scss';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>(getRecipes);

    // Pour lors de l'ajout d'une recette, on ajoute la recette à la liste des recettes et on change le state de la liste des recettes
    const addRecipeToCatalog = (recipe: Recipe) => {
        setRecipes([...recipes, recipe]);
    };

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
                </div>
            </div>
        </div>
    );
};
