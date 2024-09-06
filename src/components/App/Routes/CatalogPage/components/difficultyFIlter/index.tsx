interface DifficultyFilterProps {
    onFilterChange: (difficulty: string) => void;
}

export const DifficultyFilter = ({ onFilterChange }: DifficultyFilterProps) => {
    return (
        <div className="flex space-x-4">
            <button
                onClick={() => onFilterChange('Facile')}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 w-full md:w-32"
            >
                Facile
            </button>
            <button
                onClick={() => onFilterChange('Moyen')}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 w-full md:w-32"
            >
                Moyen
            </button>
            <button
                onClick={() => onFilterChange('Difficile')}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 w-full md:w-32"
            >
                Difficile
            </button>
        </div>
    );
};
