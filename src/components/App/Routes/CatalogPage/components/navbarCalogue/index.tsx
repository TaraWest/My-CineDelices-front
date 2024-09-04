import React from 'react';

import AddRecipeModal from '../modal';
import { DifficultyFilter } from '../difficultyFIlter';
import { DishTypeFilter } from '../dishtypeFIlter';

interface NavBarCalogueProps {
    onDifficultyFilterChange: (difficulty: string) => void;
    onDishTypeFilterChange: (dishType: number) => void;
}

export const NavBarCalogue: React.FC<NavBarCalogueProps> = ({
    onDifficultyFilterChange,
    onDishTypeFilterChange,
}) => {
    return (
        <>
            <div className="flex justify-center space-x-4 mb-6">
                {/* Filtres par difficulté */}
                <DifficultyFilter onFilterChange={onDifficultyFilterChange} />

                {/* Filtres par type de plat */}
                <DishTypeFilter onFilterChange={onDishTypeFilterChange} />

                {/* Modale pour ajouter une recette */}
                <AddRecipeModal />
            </div>
        </>
    );
};
