// RecepiesTab.tsx
import React from 'react';
import { IRecipe } from '../models';
import AddRecipeModal from '../../CatalogPage/components/modal';

interface RecepiesTabProps {
    recipies: IRecipe[];
}

// I'm using here a reusable modale (AddRecipeModal) from cataloguePage and this need a function
const handleAddRecipe = (newRecipe: any) => {
    console.log('Nouvelle recette ajoutée :', newRecipe);
};

const RecepiesTab: React.FC<RecepiesTabProps> = ({ recipies }) => {
    if (recipies.length === 0) {
        return (
            <div className="justify-center flex h-160">
                <p>Vous n'avez pas encore créé de recettes</p>
                <AddRecipeModal onAddRecipe={handleAddRecipe} />{' '}
            </div>
        );
    }

    return (
        <div>
            <AddRecipeModal onAddRecipe={handleAddRecipe} />{' '}
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
                            {recipe.Movie?.name}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecepiesTab;
