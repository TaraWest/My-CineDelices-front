interface DishTypeFilterProps {
    onFilterChange: (dishType: number) => void;
}

export const DishTypeFilter = ({ onFilterChange }: DishTypeFilterProps) => {
    return (
        <div className="flex space-x-4">
            <button
                onClick={() => onFilterChange(1)}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 flex-grow"
            >
                Boisson
            </button>
            <button
                onClick={() => onFilterChange(4)}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 flex-grow"
            >
                Entrée
            </button>
            <button
                onClick={() => onFilterChange(2)}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 flex-grow"
            >
                Plat
            </button>
            <button
                onClick={() => onFilterChange(3)}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 flex-grow"
            >
                Dessert
            </button>
        </div>
    );
};
