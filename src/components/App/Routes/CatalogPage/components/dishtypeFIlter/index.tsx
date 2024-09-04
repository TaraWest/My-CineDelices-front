interface DishTypeFilterProps {
    onFilterChange: (dishType: number) => void;
}

export const DishTypeFilter = ({ onFilterChange }: DishTypeFilterProps) => {
    return (
        <div className="flex space-x-4">
            <button
                onClick={() => onFilterChange(1)} // 1 correspond à Boisson
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Boisson
            </button>
            <button
                onClick={() => onFilterChange(4)} // 4 correspond à Entrée
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Entrée
            </button>
            <button
                onClick={() => onFilterChange(2)} // 2 correspond à Plat
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Plat
            </button>
            <button
                onClick={() => onFilterChange(3)} // 3 correspond à Dessert
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
            >
                Dessert
            </button>
        </div>
    );
};
