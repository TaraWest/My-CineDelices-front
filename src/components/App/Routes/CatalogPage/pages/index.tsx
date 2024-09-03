import { useState } from 'react';
import { Recipes } from '../models';
import { getRecipes } from '../services';
import './index.scss';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>(getRecipes);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-screen-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Catalogue
                </h1>

                {/* Ajout d'une barre de filtres */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                        Facile
                    </button>
                    <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                        Moyen
                    </button>
                    <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                        Difficile
                    </button>
                    <button className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700">
                        Ajouter une recette
                    </button>
                    <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                        Entrée
                    </button>
                    <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                        Plat
                    </button>
                    <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                        Dessert
                    </button>
                </div>

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
