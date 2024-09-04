import { useState } from 'react';

interface AddRecipeModalProps {
    onAddRecipe: (newRecipe: any) => void;
}

const AddRecipeModal = ({ onAddRecipe }: AddRecipeModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Conversion des données du formulaire en un objet
        const data = Object.fromEntries(formData);

        // Recréer l'objet imbriqué pour les films
        const formattedData = {
            ...data,
            movies: {
                name: data.movie_name,
                picture: data.movie_picture,
            },
        };

        try {
            const response = await fetch('http://localhost:3000/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error('Failed to save recipe');
            }

            const savedRecipe = await response.json();
            onAddRecipe(savedRecipe);
            console.log(savedRecipe);

            toggleModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette:", error);
            setError("Une erreur est survenue lors de l'ajout de la recette.");
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700"
            >
                Ajouter une recette
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            Ajouter une recette
                        </h2>

                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}

                        <form method="POST" onSubmit={submitForm}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom de la recette
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom de la recette"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image de la recette
                                    </label>
                                    <input
                                        name="picture"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom du film associé
                                    </label>
                                    <input
                                        name="movie_name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom du film"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image du film
                                    </label>
                                    <input
                                        name="movie_picture"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image du film"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Type de recette
                                    </label>
                                    <select
                                        name="dish_types_id"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    >
                                        <option value="1">Boisson</option>
                                        <option value="4">Entrée</option>
                                        <option value="2">Plat</option>
                                        <option value="3">Dessert</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Difficulté de la recette
                                    </label>
                                    <select
                                        name="difficulty"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    >
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
                                        name="ingredients"
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
                                        name="preparation"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="4"
                                        placeholder="Détails de la préparation"
                                    ></textarea>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Durée totale de la recette
                                    </label>
                                    <textarea
                                        name="total_duration"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="2"
                                        placeholder="Anecdote liée à la recette"
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Anecdote
                                    </label>
                                    <textarea
                                        name="anecdote"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        rows="2"
                                        placeholder="Anecdote liée à la recette"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
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
