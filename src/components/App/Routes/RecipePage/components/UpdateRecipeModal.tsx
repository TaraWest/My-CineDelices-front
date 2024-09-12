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
        console.log(event);

        const { name, value, id, dataset } = event.target;
        console.log(name);
        console.log(value);
        console.log(id);
        console.log(id.toUpperCase());

        console.log(dataset.index);
        const index = dataset.index ? Number(dataset.index) : undefined;
        const field = name;

        // dispatch({
        //     type:
        // })

        if (id === 'movie') {
            dispatch({
                type: 'UPDATE_MOVIE',
                field: name,
                value: value,
            });
        } else if (id === 'preparation') {
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
        } else if (id === 'ingredients') {
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
                                                    className="label-input-linked"
                                                    key={item.id}
                                                >
                                                    <label className="modal-label">
                                                        Ingrédient {index + 1}
                                                        <input
                                                            data-index={index}
                                                            className="modal-input"
                                                            id="update_ingredient"
                                                            name={'name'}
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

                                                    <label className="modal-label">
                                                        {' '}
                                                        Quantité {index + 1}
                                                        <input
                                                            data-index={index}
                                                            className="modal-input"
                                                            id="update_ingredient"
                                                            name={`quantity`}
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
                                                    className="label-input-linked"
                                                >
                                                    <label className="modal-label">
                                                        Etape:
                                                        <input
                                                            data-index={index}
                                                            className="modal-input"
                                                            id="update_preparation"
                                                            name={`step_position`}
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
                                                    <label className="modal-label">
                                                        Description:
                                                        <textarea
                                                            data-index={index}
                                                            className="modal-input text-input"
                                                            id="update_preparation"
                                                            name={`description`}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                state
                                                                    .Preparations[
                                                                    index
                                                                ].description
                                                            }
                                                        ></textarea>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                        {recipeOrFilm === 'film' && (
                            <div className="label-input-container">
                                <label className="modal-label">
                                    Titre
                                    <textarea
                                        className="modal-input"
                                        id="update_movie"
                                        name="name"
                                        value={state.Movie.name}
                                        onChange={handleChange}
                                    ></textarea>
                                </label>
                                <label className="modal-label">
                                    Catégorie
                                    <select
                                        className="modal-input"
                                        id="update_movie"
                                        name="Category"
                                        value={state.Movie.Category.name}
                                        onChange={handleChange}
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
                                <label className="modal-label">
                                    Image associée
                                    <input
                                        id="update_movie"
                                        name="picture"
                                        type="file"
                                    />
                                </label>
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
