interface DishTypeFilterProps {
    onFilterChange: (dishType: number) => void;
}

export const DishTypeFilter = ({ onFilterChange }: DishTypeFilterProps) => {
    return (
        <div className="flex space-x-4">
            <button
                onClick={() => onFilterChange(1)}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#59041b] w-full md:w-32"
            >
                Boisson
            </button>
            <button
                onClick={() => onFilterChange(4)}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#59041b] w-full md:w-32"
            >
                Entrée
            </button>
            <button
                onClick={() => onFilterChange(2)}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#59041b] w-full md:w-32"
            >
                Plat
            </button>
            <button
                onClick={() => onFilterChange(3)}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#59041b] w-full md:w-32"
            >
                Dessert
            </button>
        </div>
    );
};
