import { Link, useParams } from 'react-router-dom';
import './RecipePage.scss';
import { useEffect, useState } from 'react';
import { IRecipe } from './RecipePageTypes';

function RecipePage() {
    // récupération de l'id fourni par l'url de la page catalogue
    // const { id } = useParams();
    //State qui permet de stocker les data reçus de l'API pour les utiliser dans la page
    const [dataFetch, setDataFetch] = useState<IRecipe | null>(null);

    async function fetchRecipe(/*id: string | undefined*/) {
        try {
            const response = await fetch(`/dataRecipe.json`);
            if (!response.ok) {
                console.log('erreur dans la récupération de la recette');
                return;
            }

            const data = await response.json();
            console.log('then/success', data);

            setDataFetch(data);
        } catch (error) {
            console.log(error);
        }
    }
    //déclenchement de la fonction au chargement de la page et pour toute modification de l'id
    useEffect(() => {
        fetchRecipe(/*id*/);
    }, []);
    console.log(dataFetch);

    if (!dataFetch)
        return <div>Le plat finit de mijoter, c'est bientôt prêt ^^</div>;

    return (
        <div className="recipe-page-container">
            <header className="recipe-page-header">
                <h1 className="recipe-page-title">{dataFetch.name}</h1>
                <span className="recipe-page-author">
                    Recette proposée par {dataFetch.user.username}
                </span>
                <div className="images-container">
                    <img
                        className="recipe-page-image image-dish"
                        src={dataFetch.picture}
                        alt="Photos des ramens préférés de Naruto"
                    />
                    <img
                        className="recipe-page-image image-film"
                        src={dataFetch.movie.picture}
                        alt="Photo de Naruto dégustant ses ramens"
                    />
                </div>
                <table className="table-preparation">
                    <thead className="table-preparation-head">
                        <tr className="table-preparation-line">
                            <th className="table-preparation-cell-line">
                                Temps de préparation
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-preparation-body">
                        <tr className="table-preparation-line">
                            <td className="table-preparation-cell-line">
                                {dataFetch.total_duration} min
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="categories-container">
                    <p className="categories-item">
                        {dataFetch.movie.category.name}
                    </p>
                    <p className="categories-item"> {dataFetch.type.name}</p>
                </div>
            </header>
            <main className="recipe-page-main">
                <div className="ingredients-container">
                    <h2>Ingrédients</h2>
                    <p className="number-of-persons">Pour 1 personne</p>
                    <ul className="ingredient-list">
                        {/* map les ingredients */}
                        {dataFetch.ingredients.map((ingredient) => (
                            <li
                                key={ingredient.id}
                                className="ingredient-list-item"
                            >
                                {ingredient.quantity} {ingredient.name}
                            </li>
                        ))}

                        {/* <li className="ingredient-list-item">5kg Ramen</li>
                        <li className="ingredient-list-item">
                            5 Steacks végétariens à base de haricot mungo
                        </li>
                        <li className="ingredient-list-item">
                            3 bouteilles 250mL Sauce tamari
                        </li>
                        <li className="ingredient-list-item">100g Carottes</li>
                        <li className="ingredient-list-item">
                            10L eau potable sans fluor
                        </li> */}
                    </ul>
                </div>
                <div className="preparation-container">
                    <h2>Préparation</h2>
                    <ul className="preparation-list">
                        {dataFetch.preparation.map((step) => (
                            <li key={step.id} className="preparation-list-item">
                                <p className="preparation-list-step">
                                    Etape {step.step_position}:
                                </p>
                                <p className="preparation-list-paragraph">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                        {/*                         
                        <li className="preparation-list-item">
                            <p className="preparation-list-step">Etape 1:</p>
                            <p className="preparation-list-paragraph">
                                Faire bouillir l'eau dans une marmitte
                            </p>
                        </li>
                        <li className="preparation-list-item">
                            <p className="preparation-list-step">Etape 2:</p>
                            <p className="preparation-list-paragraph">
                                Ajouter les carottes, laisser bouillir 5
                                minutes, puis ajouter les ramens, laisser
                                bouillir encore 5 minutes.
                            </p>
                        </li>
                        <li className="preparation-list-item">
                            <p className="preparation-list-step">Etape 3:</p>
                            <p className="preparation-list-paragraph">
                                Eteindre le feu, vider deux bouteilles de sauce
                                tamari dans la marmitte, et vider la troisème
                                par terre, ça porte bonheur.
                            </p>
                        </li>
                        <li className="preparation-list-item">
                            <p className="preparation-list-step">Etape 4:</p>
                            <p className="preparation-list-paragraph">
                                Découpez les steacks de haricot mungo, disposez
                                les au dessus.
                            </p>
                        </li>
                        <li className="preparation-list-item">
                            <p className="preparation-list-step">Etape 5:</p>
                            <p className="preparation-list-paragraph">
                                C'est prêt!
                            </p>
                        </li> */}
                    </ul>
                </div>
                <div className="anecdote-container">
                    <h2>Anecdote</h2>
                    <p>{dataFetch.anecdote}</p>
                </div>
            </main>

            <footer className="recipe-page-footer">
                <p>Une recette à proposer?</p>
                <Link
                    to="/connexion"
                    className="link recipe-page-link-to-connection"
                >
                    connectez vous!
                </Link>
            </footer>
        </div>
    );
}

export default RecipePage;
