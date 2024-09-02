import { useState } from 'react';
import { Recipes } from '../models';
import { getRecipes } from '../services';

export const Catalog = () => {
    const [recipes, setRecipes] = useState<Recipes>(getRecipes);

    return (
        <>
            <h1>Catalogue</h1>
            <div>
                {recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <img src={recipe.picture} alt={recipe.name} />
                    </div>
                ))}
            </div>
        </>
    );
};
