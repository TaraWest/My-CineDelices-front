import { useState } from 'react';

const AddRecipeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        {
            /* Inverse l'état pour ouvrir/fermer la modale*/
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Bouton pour ouvrir la modale, au clic la fonction toggleModal est appelée, c'est alors ici que le useState est inversé */}
            <button
                onClick={toggleModal}
                className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700"
            >
                Ajouter une recette
            </button>

            {/* Si l'utilisateur clique sur le bouton, alors isOpen  est TRUE, donc on affiche la modale */}
            {/* Dans le cas où  isOpen est false, on ne montre pas la modale */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Ajouter une recette
                        </h2>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom de la recette
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom de la recette"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image de la recette
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Film de la recette
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom du film"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image du film de la recette
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image du film"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Type de recette
                                    </label>
                                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                                        <option>Entrée</option>
                                        <option>Plat</option>
                                        <option>Dessert</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Difficulté de la recette
                                    </label>
                                    <select className="mt-1 block w-full p-2 border border-gray-300 rounded">
                                        <option>Facile</option>
                                        <option>Moyen</option>
                                        <option>Difficile</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ingrédients de la recette
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="3"
                                        placeholder="Liste des ingrédients"
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Préparation de la recette
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="4"
                                        placeholder="Détails de la préparation"
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Anecdote
                                    </label>
                                    <textarea
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="2"
                                        placeholder="Anecdote liée à la recette"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                {/* Ici on appelle toggleModal pour fermer la modale, on iverse l'état */}
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="bg-gray-500 text-white font-medium py-2 px-4 rounded"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white font-medium py-2 px-4 rounded"
                                >
                                    Valider
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddRecipeModal;
