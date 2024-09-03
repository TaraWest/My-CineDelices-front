import { Link } from 'react-router-dom';
import AddRecipeModal from '../modal';

export const NavBarCalogue = () => {
    return (
        <>
            <div className="flex justify-center space-x-4 mb-6">
                <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                    Facile
                </button>

                <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                    Moyen
                </button>

                <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                    Difficile
                </button>

                <button className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700">
                    <AddRecipeModal></AddRecipeModal>
                </button>

                <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                    Entrée
                </button>

                <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                    Plat
                </button>

                <button className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200">
                    Dessert
                </button>
            </div>
        </>
    );
};
