import { Link, useParams } from 'react-router-dom';
import './RecipePage.scss';
import { useEffect, useState } from 'react';
import { IRecipe } from './models';
import { fetchRecipe } from './services';

function RecipePage() {
    // récupération de l'id fourni par l'url de la page catalogue
    const { id } = useParams();
    //State qui permet de stocker les data reçus de l'API pour les utiliser dans la page
    const [dataFetch, setDataFetch] = useState<IRecipe | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    //déclenchement de la fonction au chargement de la page et pour toute modification de l'id
    useEffect(() => {
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

    if (!dataFetch)
        return <div>Le plat finit de mijoter, c'est bientôt prêt ^^</div>;

    if (errorMessage) return <div>{errorMessage}</div>;

    return (
        <div className="recipe-page-container">
            <header className="recipe-page-header">
                <h1 className="recipe-page-title">{dataFetch.name}</h1>

                <span className="recipe-page-film">
                    Recette inspirée du film {dataFetch.Movie.name}
                </span>
                <span className="recipe-page-author">
                    Recette proposée par {dataFetch.User.username}
                </span>

                <div className="images-container">
                    <img
                        className="recipe-page-image image-dish"
                        src={`http://localhost:3000/recipes/${dataFetch.picture}`}
                        alt="Photo illustrant la recette"
                    />
                    <img
                        className="recipe-page-image image-film"
                        src={`http://localhost:3000/movies/${dataFetch.Movie.picture}`}
                        alt="Photo illustrant le film"
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
                        {dataFetch.Movie.Category.name}
                    </p>
                    <p className="categories-item">{dataFetch.DishType.name}</p>
                </div>
            </header>
            <main className="recipe-page-main">
                <div className="ingredients-container">
                    <h2 className="recipe-part">Ingrédients</h2>
                    <p className="number-of-persons">Pour 1 personne</p>
                    <ul className="ingredients-list">
                        {dataFetch.Ingredient.map((ingredient) => (
                            <li
                                key={ingredient.id}
                                className="ingredient-list-item"
                            >
                                {ingredient.quantity} {ingredient.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="preparation-container">
                    <h2 className="recipe-part">Préparation</h2>
                    <ul className="preparation-list">
                        {dataFetch.Preparations.map((step) => (
                            <li key={step.id} className="preparation-list-item">
                                <p className="preparation-list-step">
                                    Etape {step.step_position}:
                                </p>
                                <p className="preparation-list-paragraph">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="anecdote-container">
                    <h2 className="recipe-part anecdote">Anecdote</h2>
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
