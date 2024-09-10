import axios from 'axios';
import { useState } from 'react';

interface AddRecipeModalProps {
    onAddRecipe: (newRecipe: any) => void;
}

const AddRecipeModal = ({ onAddRecipe }: AddRecipeModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedMovieImage, setSelectedMovieImage] = useState<File | null>(
        null,
    );
    const [recipeImageUrl, setRecipeImageUrl] = useState<string | null>(null);
    const [movieImageUrl, setMovieImageUrl] = useState<string | null>(null);

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

    // Gestion de l'image de la recette
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
    };

    // Gestion de l'image du film
    const handleMovieFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedMovieImage(file);
    };

    // Fonction d'upload pour l'image de la recette
    const uploadRecipeImage = async () => {
        if (!selectedImage) return;

        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/upload-recipe-image',
                formData,
            );
            setRecipeImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error(
                "Erreur lors de l'upload de l'image de la recette :",
                error,
            );
            setError("Erreur lors de l'upload de l'image de la recette.");
        }
    };

    // Fonction d'upload pour l'image du film
    const uploadMovieImage = async () => {
        if (!selectedMovieImage) return;

        const formData = new FormData();
        formData.append('file', selectedMovieImage);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/upload-movie-image',
                formData,
            );
            setMovieImageUrl(response.data.imageUrl);
        } catch (error) {
            console.error(
                "Erreur lors de l'upload de l'image du film :",
                error,
            );
            setError("Erreur lors de l'upload de l'image du film.");
        }
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        // Ajoutez les champs du formulaire
        const formElements = e.currentTarget.elements as any;
        formData.append('name', formElements.name.value);
        formData.append('movie_name', formElements.movie_name.value);
        formData.append('dish_types_id', formElements.dish_types_id.value);
        formData.append('difficulty', formElements.difficulty.value);
        formData.append('total_duration', formElements.total_duration.value);
        formData.append('anecdote', formElements.anecdote.value);

        // Ajoutez les URL des images uploadées
        if (recipeImageUrl) formData.append('picture', recipeImageUrl);
        if (movieImageUrl) formData.append('movie_picture', movieImageUrl);

        // Ajoutez les ingrédients et étapes de préparation sous forme de texte
        const ingredientsString = ingredients
            .map((ingredient) => `${ingredient.name} (${ingredient.quantity})`)
            .join('\n');
        const preparationString = preparationSteps
            .map((step) => step.step)
            .join('\n');

        formData.append('ingredients', ingredientsString);
        formData.append('preparation', preparationString);

        try {
            const response = await axios.post(
                'http://localhost:3000/recipes',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );

            const savedRecipe = response.data;
            onAddRecipe(savedRecipe);

            toggleModal();
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette :", error);
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
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={uploadRecipeImage}
                                        className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
                                    >
                                        Upload Image de la recette
                                    </button>
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
                                        type="file"
                                        accept="image/*"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        onChange={handleMovieFileChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={uploadMovieImage}
                                        className="bg-blue-600 text-white rounded px-4 py-2 mt-2"
                                    >
                                        Upload Image du film
                                    </button>
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
