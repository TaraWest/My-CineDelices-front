import { Link, useNavigate, useParams } from 'react-router-dom';
import './RecipePage.scss';
import { useEffect, useRef, useState } from 'react';
import { IIngredientsList, IRecipe } from './models';

import { extractNumber } from './services/numberExtraction';
import UpdateRecipeModal from './components/UpdateRecipeModal';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import CommentComponent from './components/CommentPart/CommentComponent';

import LikeButton from './components/LikeButton';
import {
    checkUserLikedIt,
    deleteOneLike,
    fetchLikesNumber,
    fetchRecipe,
    putOneLike,
} from './services/APICall';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
    const [userLikedIt, setUserLikedIt] = useState<boolean>(false);
    const [likesNumber, setLikesNumber] = useState<number>(0);
    const [plusClicked, setPlusClicked] = useState<boolean>(false);

    // use the authentification context
    const { isAuth, userAuth } = useAuthContext();

    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

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
    }, [dataFetch]);

    useEffect(() => {
        if (isAuth && userAuth?.id && dataFetch?.id) {
            const userId = userAuth.id;
            const recipeId = dataFetch.id;

            setIsRecipeOwner(userId === recipeId);

            // // si le user a déjà liké la recette, setUserLikedIt sur true
            checkUserLikedIt(recipeId, userId).then((result) => {
                console.log(result.userLikedIt);

                setUserLikedIt(result.userLikedIt);
            });
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
    useEffect(() => {
        console.log(userLikedIt);
        // Load the number of likes for this recipe after data fetched
        if (dataFetch && dataFetch.id) {
            fetchLikesNumber(dataFetch.id)
                .then((result) => {
                    setLikesNumber(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [dataFetch, userLikedIt]);

    function handleLikeRecipeButton() {
        console.log(!userLikedIt);

        if (!userLikedIt) {
            // décencher la fonction d'ajout de like
            console.log('action de like déclenchée');
            console.log(userLikedIt);

            if (isAuth && userAuth?.id && dataFetch?.id) {
                putOneLike(dataFetch.id, userAuth.id).then((result) => {
                    console.log(result);

                    if (result === 201) {
                        setUserLikedIt(true);
                        console.log(result);
                    }
                    return;
                });
            } else {
                console.log('il faut se connecter pour pouvoir liker!');
            }
        } else if (userLikedIt) {
            // déclencher la fonction pour enlever le like
            if (isAuth && userAuth?.id && dataFetch?.id) {
                deleteOneLike(dataFetch?.id, userAuth?.id).then((result) => {
                    console.log(result);

                    if (result === 204) {
                        setUserLikedIt(false);
                        console.log(userLikedIt);
                    }
                    return;
                });
            }
        } else {
            return;
        }
    }

    // console.log(isRecipeOwner);

    //S'il y a une erreur, j'affiche un message dans le navigateur
    if (errorMessage) return <div>{errorMessage}</div>;

    //Si la connexion est lente et les données pas encore arrivées dans le client, j'affiche un petit message qui invite à partienter.
    if (!dataFetch)
        return <div>Le plat finit de mijoter, c'est bientôt prêt ^^</div>;

    return (
        <div className="w-full text-base">
            {!isDesktop && (
                <button onClick={() => setPlusClicked(!plusClicked)}>
                    <FontAwesomeIcon
                        className="button-plus"
                        icon={faPlus}
                        style={{ color: '#bb7133' }}
                        size="2xl"
                    />
                </button>
            )}
            {(isDesktop || (!isDesktop && plusClicked)) && (
                <button
                    className={
                        isDesktop
                            ? 'fixed-button-desktop'
                            : ' fixed-button-mobile'
                    }
                    onClick={() => navigate('/catalogue')}
                >
                    Catalogue
                </button>
            )}
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
                {isAuth && isRecipeOwner && (
                    <UpdateRecipeModal
                        recipeData={dataFetch}
                    ></UpdateRecipeModal>
                )}
                {/* button like here */}
                <LikeButton
                    handleLikeRecipeButton={handleLikeRecipeButton}
                    userLikedIt={userLikedIt}
                    likesNumber={likesNumber}
                ></LikeButton>
                <p className="mt-0.5em">Une recette à proposer?</p>
                {!isAuth && (
                    <Link to="/connexion" className="my-1em">
                        Connectez vous!
                    </Link>
                )}
                {isAuth && (
                    <Link to="/catalogue" className="my-1em">
                        C'est par ici!{' '}
                    </Link>
                )}

                <div className="w-full">
                    <CommentComponent
                        recipeId={dataFetch.id}
                    ></CommentComponent>
                </div>
            </footer>
        </div>
    );
}

export default RecipePage;
