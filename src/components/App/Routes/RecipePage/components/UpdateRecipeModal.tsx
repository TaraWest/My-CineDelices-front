import { useState } from 'react';
import './UpdateRecipeModal.scss';
import { IInputsModal, IRecipe } from '../models';
import { getInputsRecipeForm } from '../services/modalUpdateRecipeFormFieldsConfig';
import ModalComponent from './ModalComponent';

interface UpdateRecipeModalProps {
    recipeData: IRecipe;
}

function UpdateRecipeModal({ recipeData }: UpdateRecipeModalProps) {
    const [isUser, setIsUser] = useState(true);
    const [isRecipeOwner, setIsRecipeOwner] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [recipeOrFilm, setRecipeOrFilm] = useState('recipe');
    const InputsModal = getInputsRecipeForm(recipeData);

    function toggleModal() {
        setIsOpen(!isOpen);
    }
    //recevoir les données de la part de la recette en cours
    /*Les disposer dans la modale:
    - nom de recette
    - image cuisine
    - temps préparation
    - type plat (select)
    - liste ingrédient: liste avec quantité et description
    - liste préparation: numéro étape et description
    - anecdote
    - nom du film
    - image film
    - type film (select)
    
*/
    console.log(recipeData);
    const { name, anecdote, difficulty, picture, total_duration, Ingredient } =
        recipeData;

    const recipePartData: IRecipePartData[] = [
        { label: 'Nom de la Recette', value: name },
        { label: 'Durée de préparation', value: total_duration },
        { label: 'Anecdote', value: anecdote },
        { label: 'Image associée à la recette', value: picture },
    ];
    interface IRecipePartData {
        label: string;
        value: string | number | null | undefined;
    }

    function toggleRecipeOrFilmPart(
        event: React.MouseEvent<HTMLButtonElement>,
    ) {
        console.log(event.currentTarget.id);

        if (event.currentTarget.id === 'recipe') {
            setRecipeOrFilm('recipe');
        }
        if (event.currentTarget.id === 'film') {
            setRecipeOrFilm('film');
        }
    }

    // function handleChangeInput() {
    //     console.log('input change !');
    // }

    console.log(recipePartData);

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
                        <div>
                            {InputsModal.map((item: IInputsModal) => {
                                return (
                                    <ModalComponent
                                        key={item.name}
                                        item={item}
                                    />
                                );
                            })}
                        </div>

                        {/* {recipeOrFilm === 'recipe' && (
                            <div>
                                {recipePartData &&
                                    recipePartData.map(
                                        (data: IRecipePartData) => {
                                            return (
                                                <label className="modal-label">
                                                    {data.label}:
                                                    <input
                                                        className="text-black text-center "
                                                        type={
                                                            data.label ===
                                                            'Image associée à la recette'
                                                                ? 'file'
                                                                : 'text'
                                                        }
                                                        value={
                                                            data.label ===
                                                            'Image associée à la recette'
                                                                ? ''
                                                                : data.value
                                                        }
                                                        required
                                                        // disabled
                                                    />
                                                </label>
                                            );
                                        },
                                    )}
                                <div className="flex flex-col items-center">
                                    <label className="update-anecdote text-black flex flex-col p-2 ">
                                        Anecdote
                                        <textarea name="" id="" className="p-7">
                                            {recipeData.anecdote}
                                        </textarea>
                                    </label>
                                </div>
                                <div className="recipeIngredientModal ">
                                    <h3 className="text-black">Ingrédients</h3>
                                    <div className="flex justify-center">
                                        <div>
                                            {Ingredient &&
                                                Ingredient.map((item) => {
                                                    return (
                                                        <label className="text-black flex flex-col items-center">
                                                            Ingrédient:
                                                            <input
                                                                className="text-black text-center "
                                                                type="text"
                                                                value={
                                                                    item.name
                                                                }
                                                                required
                                                                // disabled
                                                            />
                                                        </label>
                                                    );
                                                })}
                                        </div>
                                        <div>
                                            {Ingredient &&
                                                Ingredient.map((item) => {
                                                    return (
                                                        <label className="text-black flex flex-col items-center">
                                                            Quantité
                                                            <input
                                                                className="text-black text-center "
                                                                type="text"
                                                                value={
                                                                    item.quantity
                                                                }
                                                                required
                                                                // disabled
                                                            />
                                                        </label>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}

                        <button>Soumettre</button>
                        <button onClick={toggleModal}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateRecipeModal;
