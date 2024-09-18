import axios from 'axios';
import { useState } from 'react';

interface AddRecipeModalProps {
    onAddRecipe: (newRecipe: any) => void;
}

const AddRecipeModal = ({ onAddRecipe }: AddRecipeModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Storage of images encoded in base64

    const [selectedImageBase64, setSelectedImageBase64] = useState<
        string | null
    >(null);
    const [selectedMovieImageBase64, setSelectedMovieImageBase64] = useState<
        string | null
    >(null);

    // Management of ingredients
    const [ingredients, setIngredients] = useState([
        { name: '', quantity: '' },
    ]);
    // Management of preparation steps
    const [preparationSteps, setPreparationSteps] = useState([
        { step: '', step_position: 1 },
    ]);

    const toggleModal = () => setIsOpen(!isOpen);

    // Function to convert an image to base64
    const convertToBase64 = (
        file: File,
        callback: (result: string | null) => void,
    ) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            callback(reader.result as string);
        };
        reader.onerror = (error) => {
            console.error('Erreur lors de la conversion en base64:', error);
            callback(null);
        };
    };
    //UX on picture's input
    // États pour gérer la sélection de fichiers
    const [isFileMovieSelected, setIsFileMovieSelected] = useState<
        boolean | null
    >(null);
    const [isFileRecipeSelected, setIsFileRecipeSelected] = useState<
        boolean | null
    >(null);

    // Management of the movie image
    const handleMovieFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setIsFileMovieSelected(!!file); // Met à jour l'état selon la sélection
        if (file) convertToBase64(file, setSelectedMovieImageBase64);
    };

    // Fonction pour gérer le changement d'image pour la recette
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setIsFileRecipeSelected(!!file); // Met à jour l'état selon la sélection
        if (file) {
            convertToBase64(file, setSelectedImageBase64); // Convertir l'image si un fichier est sélectionné
        }
    };

    // Fonction pour gérer le changement d'image pour le film
    // const handleMovieFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     setIsFileMovieSelected(!!file); // Met à jour l'état selon la sélection
    //     if (file) {
    //         convertToBase64(file, setSelectedImageBase64); // Convertir l'image si un fichier est sélectionné
    //     }
    // };

    const addIngredient = () =>
        setIngredients([...ingredients, { name: '', quantity: '' }]);

    const updateIngredient = (index: number, field: string, value: string) => {
        const updatedIngredients = ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient,
        );
        setIngredients(updatedIngredients);
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const addPreparationStep = () => {
        setPreparationSteps([
            ...preparationSteps,
            { step: '', step_position: preparationSteps.length + 1 },
        ]);
    };

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

    const removePreparationStep = (index: number) => {
        const updatedSteps = preparationSteps.filter((_, i) => i !== index);
        setPreparationSteps(updatedSteps);
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formElements = e.currentTarget.elements as any;

        // Creation of the object with images encoded in base64 and other fields

        const formData = {
            name: formElements.name.value,
            movie_name: formElements.movie_name.value,
            dish_types_id: formElements.dish_types_id.value,
            category_id: formElements.category_id.value,
            difficulty: formElements.difficulty.value,
            total_duration: formElements.total_duration.value,
            anecdote: formElements.anecdote.value,
            picture: selectedImageBase64,
            movie_picture: selectedMovieImageBase64,
            ingredients: ingredients
                .map(
                    (ingredient) =>
                        `${ingredient.name} (${ingredient.quantity})`,
                )
                .join('\n'),
            preparation: preparationSteps.map((step) => step.step).join('\n'),
        };

        try {
            const response = await axios.post(
                'http://localhost:3000/recipes',
                formData,
                { withCredentials: true },
            );
            onAddRecipe(response.data);
            toggleModal();
            console.log(response);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette :", error);
            setError("Une erreur est survenue lors de l'ajout de la recette.");
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] rounded-lg w-full md:w-32 h-12 flex items-center justify-center hover:bg-[#59041b]"
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

                        <form onSubmit={submitForm}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Recipe name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom de la recette
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>

                                {/* Recipe picture */}
                                <div>
                                    <label
                                        className={`block text-sm font-medium ${
                                            isFileRecipeSelected === null
                                                ? 'text-gray-700' // Couleur normale quand aucun fichier n'est sélectionné
                                                : isFileRecipeSelected
                                                  ? 'text-green-600' // Texte vert si un fichier est sélectionné
                                                  : 'text-red-600' // Texte rouge si aucun fichier n'est sélectionné
                                        }`}
                                    >
                                        {isFileRecipeSelected === null
                                            ? "Sélectionnez l'image de la recette" // Message initial
                                            : isFileRecipeSelected
                                              ? 'Image de recette sélectionnée' // Message quand un fichier est sélectionné
                                              : 'Aucune image sélectionnée, veuillez en choisir une'}{' '}
                                        {/* Message d'erreur */}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={`mt-1 block w-full p-2 border rounded ${
                                            isFileRecipeSelected === null
                                                ? 'border-gray-300' // Initial state (no file selected yet)
                                                : isFileRecipeSelected
                                                  ? 'border-green-500' // Green border if a file is selected
                                                  : 'border-red-500' // Red border if no file is selected
                                        }`}
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Movie name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nom du film associé
                                    </label>
                                    <input
                                        name="movie_name"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>

                                {/* Movie picture */}
                                <div>
                                    <label
                                        className={`block text-sm font-medium ${
                                            isFileMovieSelected === null
                                                ? 'text-gray-700' // Couleur normale quand aucun fichier n'est sélectionné
                                                : isFileMovieSelected
                                                  ? 'text-green-600' // Texte vert si un fichier est sélectionné
                                                  : 'text-red-600' // Texte rouge si aucun fichier n'est sélectionné
                                        }`}
                                    >
                                        {isFileMovieSelected === null
                                            ? "Sélectionnez l'image associée au film" // Message initial
                                            : isFileMovieSelected
                                              ? 'Image de film sélectionnée' // Message quand un fichier est sélectionné
                                              : 'Aucune image sélectionnée, veuillez en choisir une'}{' '}
                                        {/* Message d'erreur */}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={`mt-1 block w-full p-2 border rounded ${
                                            isFileMovieSelected === null
                                                ? 'border-gray-300' // Initial state (no file selected yet)
                                                : isFileMovieSelected
                                                  ? 'border-green-500' // Green border if a file is selected
                                                  : 'border-red-500' // Red border if no file is selected
                                        }`}
                                        onChange={handleMovieFileChange}
                                    />
                                </div>

                                {/* Category */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Catégorie
                                    </label>
                                    <select
                                        name="category_id"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    >
                                        <option value="1">Film</option>
                                        <option value="2">Série</option>
                                        <option value="3">Animé</option>
                                    </select>
                                </div>

                                {/* Dishtype */}
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
                                        <option value="2">Plat</option>
                                        <option value="3">Dessert</option>
                                    </select>
                                </div>

                                {/* Difficulty */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Difficulté
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

                                {/* Total duration */}
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
                                        rows={2}
                                    ></textarea>
                                </div>

                                {/* Ingrédients */}
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

                                {/* Preparation steps */}
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
                                                min={1}
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

                            {/* Submit buttons */}
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
