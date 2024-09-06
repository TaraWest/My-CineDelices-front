import React from 'react';

import AddRecipeModal from '../modal';
import { DifficultyFilter } from '../difficultyFIlter';
import { DishTypeFilter } from '../dishtypeFIlter';

interface NavBarCalogueProps {
    onDifficultyFilterChange: (difficulty: string) => void;
    onDishTypeFilterChange: (dishType: number) => void;
    onAddRecipe: (newRecipe: any) => void;
}

export const NavBarCalogue = (props: NavBarCalogueProps) => {
    const { onDifficultyFilterChange, onDishTypeFilterChange, onAddRecipe } =
        props;

    return (
        <>
            <div className="flex flex-wrap justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                {/* Filtres par difficulté */}
                <DifficultyFilter onFilterChange={onDifficultyFilterChange} />
                {/* Modale pour ajouter une recette */}

                <AddRecipeModal onAddRecipe={onAddRecipe} />

                {/* Filtres par type de plat */}
                <DishTypeFilter onFilterChange={onDishTypeFilterChange} />
            </div>
        </>
    );
};
