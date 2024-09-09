import axios from 'axios';
import { useState } from 'react';

interface AddRecipeModalProps {
    onAddRecipe: (newRecipe: undefined) => void;
}

const AddRecipeModal = ({ onAddRecipe }: AddRecipeModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Gestion des ingrédients avec quantité
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: '' },
    ]);
    // Gestion des étapes de préparation avec position
    const [preparationSteps, setPreparationSteps] = useState([
        { step: '', step_position: 1 },
    ]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // Ajout d'un nouvel ingrédient
    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    // Mise à jour des ingrédients
    const updateIngredient = (index: number, field: string, value: string) => {
        const updatedIngredients = ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient,
        );
        setIngredients(updatedIngredients);
    };

    // Suppression d'un ingrédient
    const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    // Ajout d'une étape de préparation
    const addPreparationStep = () => {
        setPreparationSteps([
            ...preparationSteps,
            { step: '', step_position: preparationSteps.length + 1 },
        ]);
    };

    // Mise à jour des étapes de préparation
    const updatePreparationStep = (
        index: number,
        field: string,
        value: string,
    ) => {
        const updatedSteps = preparationSteps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step,
        );
        setPreparationSteps(updatedSteps);
    };

    // Suppression d'une étape
    const removePreparationStep = (index: number) => {
        const updatedSteps = preparationSteps.filter((_, i) => i !== index);
        setPreparationSteps(updatedSteps);
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = Object.fromEntries(formData);

        // Conversion des ingrédients en chaîne de caractères (séparés par des sauts de ligne)
        const ingredientsString = ingredients
            .map((ingredient) => `${ingredient.name} (${ingredient.quantity})`)
            .join('\n');

        // Conversion des étapes de préparation en chaîne de caractères
        const preparationString = preparationSteps
            .map((step) => step.step)
            .join('\n');

        // Recréer l'objet imbriqué pour les films
        const formattedData = {
            ...data,
            ingredients: ingredientsString, // Envoie comme chaîne de caractères
            preparation: preparationString, // Envoie comme chaîne de caractères
            movies: {
                name: data.movie_name,
                picture: data.movie_picture,
            }, // Envoie le nom du film directement
        };

        console.log('Données envoyées:', formattedData);

        try {
            const response = await axios.post(
                'http://localhost:3000/recipes',
                formattedData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const savedRecipe = response.data;
            onAddRecipe(savedRecipe);

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
                className="text-sm font-medium text-white bg-blue-600 rounded-lg w-full md:w-32 h-12 flex items-center justify-center hover:bg-blue-700"
            >
                Ajouter une recette
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Ajouter une recette
                        </h2>

                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}

                        <form method="POST" onSubmit={submitForm}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Nom de la recette */}
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

                                {/* Image de la recette */}
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

                                {/* Film associé */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom du film associé
                                    </label>
                                    <input
                                        name="movie_name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="Nom du film"
                                        required
                                    />
                                </div>

                                {/* Image du film */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image du film associé
                                    </label>
                                    <input
                                        name="movie_picture"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="URL de l'image du film"
                                    />
                                </div>

                                {/* Type de recette */}
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

                                {/* Difficulté de la recette */}
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

                                {/* Durée totale */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Durée totale de la recette
                                    </label>
                                    <input
                                        name="total_duration"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        placeholder="En minutes"
                                    />
                                </div>

                                {/* Anecdote */}
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

                                {/* Ingrédients dynamiques */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ingrédients de la recette
                                    </label>
                                    {ingredients.map((ingredient, index) => (
                                        <div
                                            key={index}
                                            className="flex space-x-4 mb-2"
                                        >
                                            <input
                                                type="text"
                                                value={ingredient.name}
                                                onChange={(e) =>
                                                    updateIngredient(
                                                        index,
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full p-2 border border-gray-300 rounded"
                                                placeholder="Nom de l'ingrédient"
                                                required
                                            />
                                            <input
                                                type="text"
                                                value={ingredient.quantity}
                                                onChange={(e) =>
                                                    updateIngredient(
                                                        index,
                                                        'quantity',
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full p-2 border border-gray-300 rounded"
                                                placeholder="Quantité"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeIngredient(index)
                                                }
                                                className="bg-red-500 text-white rounded px-4"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addIngredient}
                                        className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
                                    >
                                        Ajouter un ingrédient
                                    </button>
                                </div>

                                {/* Étapes de préparation dynamiques */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Étapes de préparation
                                    </label>
                                    {preparationSteps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="flex space-x-4 mb-2"
                                        >
                                            <input
                                                type="text"
                                                value={step.step}
                                                onChange={(e) =>
                                                    updatePreparationStep(
                                                        index,
                                                        'step',
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full p-2 border border-gray-300 rounded"
                                                placeholder="Détail de l'étape"
                                                required
                                            />
                                            <input
                                                type="number"
                                                value={step.step_position}
                                                onChange={(e) =>
                                                    updatePreparationStep(
                                                        index,
                                                        'step_position',
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full p-2 border border-gray-300 rounded"
                                                placeholder="Position"
                                                min="1"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removePreparationStep(index)
                                                }
                                                className="bg-red-500 text-white rounded px-4"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addPreparationStep}
                                        className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
                                    >
                                        Ajouter une étape
                                    </button>
                                </div>
                            </div>

                            {/* Boutons de soumission */}
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
