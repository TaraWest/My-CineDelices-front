import { Link } from 'react-router-dom';
import './RecipePage.scss';

function RecipePage() {
    return (
        <div className="recipe-page-container">
            <header className="recipe-page-header">
                <h1 className="recipe-page-title">Ramen de Naruto</h1>
                <span className="recipe-page-author">
                    Recette proposée par Jungkookmavie
                </span>
                <div className="images-container">
                    <img
                        className="recipe-page-image image-dish"
                        src="/ramen.png"
                        alt="Photos des ramens préférés de Naruto"
                    />
                    <img
                        className="recipe-page-image image-film"
                        src="/naruto.png"
                        alt="Photo de Naruto dégustant ses ramens"
                    />
                </div>
                <table className="table-preparation">
                    <thead className="table-preparation-head">
                        <tr className="table-preparation-line">
                            <th className="table-preparation-cell-line">
                                Préparation
                            </th>
                            <th className="table-preparation-cell-line">
                                Cuisson
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-preparation-body">
                        <tr className="table-preparation-line">
                            <td className="table-preparation-cell-line">
                                25 min
                            </td>
                            <td className="table-preparation-cell-line"> 1h</td>
                        </tr>
                    </tbody>
                </table>
                <div className="categories-container">
                    <p className="categories-item">Anime</p>
                    <p className="categories-item"> Plat</p>
                </div>
            </header>
            <main className="recipe-page-main">
                <div className="ingredients-container">
                    <h2>Ingrédients</h2>
                    <p className="number-of-persons">Pour 1 personne</p>
                    <ul className="ingredient-list">
                        <li className="ingredient-list-item">5kg Ramen</li>
                        <li className="ingredient-list-item">
                            5 Steacks végétariens à base de haricot mungo
                        </li>
                        <li className="ingredient-list-item">
                            3 bouteilles 250mL Sauce tamari
                        </li>
                        <li className="ingredient-list-item">100g Carottes</li>
                        <li className="ingredient-list-item">
                            10L eau potable sans fluor
                        </li>
                    </ul>
                </div>
                <div className="preparation-container">
                    <h2>Préparation</h2>
                    <ul className="preparation-list">
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
                                Emietter les steacks de haricot mungo, laisser
                                reposer 1 minute.
                            </p>
                        </li>
                        <li className="preparation-list-item">
                            <p className="preparation-list-step">Etape 5:</p>
                            <p className="preparation-list-paragraph">
                                C'est prêt!
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="anecdote-container">
                    <h2>Anecdote</h2>
                    <p>
                        Naruto déteste attendre que les ramens refroidissent.
                        Ils sont un symbole de célébration et de réconfort.
                        Surtout ceux d'Ichiraku.
                    </p>
                </div>
            </main>

            <footer className="recipe-page-footer">
                <p>
                    Une recette à proposer?
                    <Link
                        to="/connexion"
                        className="link recipe-page-link-to-connection"
                    >
                        connectez vous
                    </Link>
                    !
                </p>
            </footer>
        </div>
    );
}

export default RecipePage;
