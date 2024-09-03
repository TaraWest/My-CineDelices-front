import { useState } from 'react';
import { Recipes } from '../models';
import { getRecipes } from '../services';
import './index.scss';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>(getRecipes);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Catalogue</h1>
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
        </>
    );
};
