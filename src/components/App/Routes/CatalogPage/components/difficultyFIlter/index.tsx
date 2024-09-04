import React from 'react';

interface DifficultyFilterProps {
    onFilterChange: (difficulty: string) => void;
}

export const DifficultyFilter: React.FC<DifficultyFilterProps> = ({
    onFilterChange,
}) => {
    return (
        <div className="flex space-x-4">
            <button
                onClick={() => onFilterChange('Facile')}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Facile
            </button>
            <button
                onClick={() => onFilterChange('Moyen')}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Moyen
            </button>
            <button
                onClick={() => onFilterChange('Difficile')}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Difficile
            </button>
        </div>
    );
};
