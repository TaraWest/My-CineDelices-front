import { Link, useParams } from 'react-router-dom';
import './RecipePage.scss';
import { useEffect, useState } from 'react';
import { IIngredientsList, IRecipe } from './models';
import { fetchRecipe } from './services';
import { extractNumber } from './services/numberExtraction';
import UpdateRecipeModal from './components/UpdateRecipeModal';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import CommentComponent from './components/CommentPart/CommentComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function RecipePage() {
    // récupération de l'id fourni par l'url de la page catalogue
    const { id } = useParams();
    //State qui permet de stocker les data reçus de l'API pour les utiliser dans la page
    const [dataFetch, setDataFetch] = useState<IRecipe | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [count, setCount] = useState<number>(1);
    const [ingredientsList, setIngredientsList] = useState<
        IIngredientsList[] | null
    >(null);
    const [isRecipeOwner, setIsRecipeOwner] = useState<boolean>(false);
    const { isAuth, userAuth } = useAuthContext();
    const [recipeLiked, setRecipeLiked] = useState<boolean>(false);
    const [likesNumber, setLikesNumber] = useState<number>(0);

    //déclenchement de la fonction au chargement de la page et pour toute modification de l'id
    useEffect(() => {
        //Fetch recipe with the id provided
        fetchRecipe(Number(id))
            .then((data) => {
                if ('error' in data) {
                    setErrorMessage(data.error);
                } else {
                    setDataFetch(data);
                }
            })
            .catch((error) => {
                return {
                    error:
                        error.message ||
                        'Une erreur est survenue lors du chargement de la recette',
                };
            });
    }, [id]);
    console.log(dataFetch);
    useEffect(() => {
        if (dataFetch && dataFetch.Ingredient) {
            const { Ingredient } = dataFetch;
            const result = Ingredient.map((item) => {
                const quantityUnitSeparation = extractNumber(item.quantity);
                return {
                    ...item,
                    quantity: quantityUnitSeparation,
                };
            });
            if (result) {
                setIngredientsList(result);
            }
        }

        // Load the number of likes for this recipe after data fetched
        if (dataFetch && dataFetch.id) {
            axios
                .get(`http://localhost:3000/likes/${dataFetch.id}`)
                .then((result) => {
                    setLikesNumber(result.data);
                });
        }
    }, [dataFetch]);

    useEffect(() => {
        if (isAuth && userAuth?.id && dataFetch?.id) {
            const userId = userAuth.id;
            const recipeId = dataFetch.id;

            setIsRecipeOwner(userId === recipeId);
            // si le user a déjà liké la recette, setRecipeLiked sur true
        }
    }, [isAuth, userAuth, dataFetch]);

    const incrementCounter = () => {
        setCount(count + 1);
    };
    const decrementCounter = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    function handleLikeRecipeButton() {
        if (!recipeLiked) {
            // décencher la fonction d'ajout de like
        }
        if (recipeLiked) {
            // déclencher la fonction pour enlever le like
        }
    }

    console.log(isRecipeOwner);

    //S'il y a une erreur, j'affiche un message dans le navigateur
    if (errorMessage) return <div>{errorMessage}</div>;

    //Si la connexion est lente et les données pas encore arrivées dans le client, j'affiche un petit message qui invite à partienter.
    if (!dataFetch)
        return <div>Le plat finit de mijoter, c'est bientôt prêt ^^</div>;

    return (
        <div className="w-full text-base">
            <header className="flex flex-col items-center mb-2em">
                <h1 className="semibold py-1em text-5xl border-b-4 border-solid border-skin recipe-title ">
                    {dataFetch.name}
                </h1>

                <span className="recipe-page-film font-cinzel m-2em text-center">
                    Recette inspirée du film {dataFetch.Movie.name}
                </span>
                <div className="flex  items-center my-1em w-4/5 justify-between">
                    {likesNumber === 0 && <p></p>}
                    {likesNumber !== 0 && (
                        <p>
                            Cette recette a été aimée par{' '}
                            {likesNumber > 1
                                ? `${likesNumber} personnes`
                                : `${likesNumber} personne`}
                        </p>
                    )}
                    <span className="recipe-page-author p-1em m-1em italic">
                        Recette proposée par {dataFetch.User.username}
                    </span>
                </div>

                <div className="images-container mx-1.5em my-0.5em p-1.5em flex flex-col justify-center items-center max-w-90%">
                    <img
                        className="recipe-page-image"
                        src={`http://localhost:3000/recipes/${dataFetch.picture}`}
                        alt="Photo illustrant la recette"
                    />
                    <img
                        className="recipe-page-image"
                        src={`http://localhost:3000/movies/${dataFetch.Movie.picture}`}
                        alt="Photo illustrant le film"
                    />
                </div>
                <table className="text-center">
                    <thead>
                        <tr>
                            <th className="p-0.5em">Temps de préparation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-0.5em">
                                {dataFetch.total_duration} min
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="m-1em flex gap-1.2em">
                    <p className="categories-item">
                        {dataFetch.Movie.Category.name}
                    </p>
                    <p className="categories-item">{dataFetch.DishType.name}</p>
                </div>
            </header>
            <main className="recipe-page-main">
                <div className="flex flex-col items-start">
                    <h2 className="recipe-part">Ingrédients</h2>
                    <div className="flex items-center">
                        <p className="italic m-1em ml-0">
                            Recette pour {count}{' '}
                            {count > 1 ? 'personnes' : 'personne'}
                        </p>
                        <div
                            className="counter-button mx-2"
                            onClick={decrementCounter}
                        >
                            -
                        </div>
                        <div
                            className="counter-button"
                            onClick={incrementCounter}
                        >
                            +
                        </div>
                    </div>
                    <ul className="flex flex-col items-start">
                        {ingredientsList &&
                            ingredientsList.map((ingredient) => (
                                <li key={ingredient.id} className="p-0.5em">
                                    {ingredient.quantity?.numberPart
                                        ? ingredient.quantity.numberPart * count
                                        : 'erreur dans la récupération des ingrédients'}{' '}
                                    {ingredient.quantity?.textPart}{' '}
                                    {ingredient.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="recipe-part">Préparation</h2>
                    <ul className="flex flex-col items-start">
                        {dataFetch.Preparations.map((step) => (
                            <li key={step.id}>
                                <p className="mb-0.5em font-semibold underline">
                                    Etape {step.step_position}:
                                </p>
                                <p className="m-0.5em">{step.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full text-center mt-3em mb-1.5em">
                    <h2 className="recipe-part anecdote">Anecdote</h2>
                    <p>{dataFetch.anecdote}</p>
                </div>
            </main>

            <footer className="m-1.5em text-center italic flex flex-col items-center">
                {isAuth /*&& isRecipeOwner*/ && (
                    <UpdateRecipeModal
                        recipeData={dataFetch}
                    ></UpdateRecipeModal>
                )}
                <div className="flex items-center gap-1 my-1em">
                    Vous aimez cette recette?
                    <button
                        onClick={handleLikeRecipeButton}
                        className="like-button font-body text-base mx-0.5em"
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{
                                color: '#bb7133',
                                marginRight: '0.5em',
                            }}
                        />
                        J'aime
                    </button>
                    <p className="text-ld">{likesNumber}</p>
                </div>
                <p>Une recette à proposer?</p>
                <Link to="/connexion" className="my-1em">
                    Connectez vous!
                </Link>
                <div>
                    <CommentComponent
                        recipeId={dataFetch.id}
                    ></CommentComponent>
                </div>
            </footer>
        </div>
    );
}

export default RecipePage;
