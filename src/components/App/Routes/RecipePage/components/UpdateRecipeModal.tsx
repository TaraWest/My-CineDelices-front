import { useReducer, useState } from 'react';
import './UpdateRecipeModal.scss';
import { IInputsModal, IRecipe } from '../models';
import { getInputsRecipeForm } from '../services/modalUpdateRecipeFormFieldsConfig';
import ModalComponent from './ModalComponent';
import { recipeReducer } from '../services/RecipeReducer';

interface UpdateRecipeModalProps {
    recipeData: IRecipe;
}

function UpdateRecipeModal({ recipeData }: UpdateRecipeModalProps) {
    const [isUser, setIsUser] = useState(true);
    const [isRecipeOwner, setIsRecipeOwner] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [recipeOrFilm, setRecipeOrFilm] = useState('recipe');
    const { Ingredient, Preparations, Movie } = recipeData;

    const [state, dispatch] = useReducer(recipeReducer, recipeData);
    const InputsModal = getInputsRecipeForm(state);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    console.log(recipeData);

    function toggleRecipeOrFilmPart(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        if (event.currentTarget.id === 'recipe') {
            setRecipeOrFilm('recipe');
        }
        if (event.currentTarget.id === 'film') {
            setRecipeOrFilm('film');
        }
    }

    function handleChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) {
        const { name, value } = event.target;
        if (name.includes('step_position') || name.includes('description')) {
            const index = Number(name.split(' ')[1]);
            const field = name.split(' ')[0];
            console.log(index);
            console.log(field);

            dispatch({
                type: 'UPDATE_PREPARATION',
                field,
                index,
                value: value,
            });
        } else if (name.includes('name') || name.includes('quantity')) {
            const index = Number(name.split('_')[1]);
            const field = name.split('_')[0];

            dispatch({
                type: 'UPDATE_INGREDIENT',
                field,
                index,
                value: value,
            });
        } else {
            dispatch({
                type: 'SET_FIELD',
                field: name,
                value: value,
            });
        }
    }

    console.log(state);

    if (!recipeData) return <div>Chargement en cours ^^</div>;

    return (
        <div>
            {isUser && isRecipeOwner && !isOpen && (
                <button onClick={toggleModal}>Modifier ma recette</button>
            )}

            {isOpen && (
                //Black transparent background around modal
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* Background of modal */}
                    <div className="bg-skin rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto flex flex-col">
                        <h2 className="text-black">Modifier la recette</h2>
                        <div className="flex gap-2 justify-center">
                            <button
                                className="modal-button"
                                onClick={toggleRecipeOrFilmPart}
                                id="recipe"
                            >
                                Partie Recette
                            </button>

                            <button
                                className="modal-button"
                                onClick={toggleRecipeOrFilmPart}
                                id="film"
                            >
                                Partie Film
                            </button>
                        </div>
                        {/* Update Recipe Modal Part */}
                        {recipeOrFilm === 'recipe' && (
                            <div>
                                <div>
                                    {InputsModal.map((item: IInputsModal) => {
                                        return (
                                            <ModalComponent
                                                key={item.name}
                                                item={item}
                                                handleChange={handleChange}
                                            />
                                        );
                                    })}
                                </div>
                                {/* Ingredients part */}
                                <div>
                                    {Ingredient &&
                                        Ingredient.map((item, index) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="text-black"
                                                >
                                                    <label>
                                                        Ingrédient {index + 1}
                                                        <input
                                                            name={`name_${index}`}
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                state
                                                                    .Ingredient[
                                                                    index
                                                                ].name
                                                            }
                                                        />
                                                    </label>
                                                    <label>
                                                        {' '}
                                                        Quantité {index + 1}
                                                        <input
                                                            name={`quantity_${index}`}
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                state
                                                                    .Ingredient[
                                                                    index
                                                                ].quantity
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div>
                                    {Preparations &&
                                        Preparations.map((step, index) => {
                                            return (
                                                <div
                                                    key={step.id}
                                                    className="text-black"
                                                >
                                                    <label>
                                                        Etape:
                                                        <input
                                                            name={`step_position ${index}`}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            type="number"
                                                            value={
                                                                state
                                                                    .Preparations[
                                                                    index
                                                                ].step_position
                                                            }
                                                        />
                                                    </label>
                                                    <label>
                                                        Description:
                                                        <input
                                                            name={`description ${index}`}
                                                            type="text"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                state
                                                                    .Preparations[
                                                                    index
                                                                ].description
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                        {recipeOrFilm === 'film' && (
                            <div className="text-black ">
                                <div className="flex flex-col">
                                    <label>
                                        Titre
                                        <input
                                            name="name"
                                            type="text"
                                            defaultValue={Movie.name}
                                        />
                                    </label>
                                    <label>
                                        Catégorie
                                        <select
                                            name="Category"
                                            defaultValue={Movie.Category.name}
                                        >
                                            <option value="Film" id="1">
                                                Film
                                            </option>
                                            <option value="Série" id="2">
                                                Série
                                            </option>
                                            <option value="Anime" id="3">
                                                Anime
                                            </option>
                                        </select>
                                    </label>
                                    <label>
                                        Image associée
                                        <input
                                            name="picture"
                                            type="file"
                                            value=""
                                        />
                                    </label>
                                </div>
                            </div>
                        )}

                        <button>Soumettre</button>
                        <button onClick={toggleModal}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateRecipeModal;
