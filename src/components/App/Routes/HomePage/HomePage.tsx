import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IRecipe } from './models';
import Slider from './components/slider/slider';
import { fetchOneRandom } from './services';
import './components/slider/slider.scss';
import './homePage.scss';
import AddRecipeModal from '../CatalogPage/components/modal';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import { useMediaQuery } from 'react-responsive';

function HomePage() {
    const [data, setData] = useState<IRecipe | null>(null);
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const { userAuth } = useAuthContext();

    // Fonction pour gérer l'ajout d'une recette
    const handleAddRecipe = (newRecipe: any) => {
        // Logique pour ajouter la recette, par exemple mettre à jour l'état ou faire une action spécifique
        console.log('Nouvelle recette ajoutée :', newRecipe);
    };

    useEffect(() => {
        fetchOneRandom()
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                return error;
            });
    }, []);

    if (!data) {
        return <div>Oups, petit problème !? Merci de revenir plus tard...</div>;
    }

    return (
        <div className="homePage">
            {userAuth?.username && !isDesktop && (
                <div className={` text-right text-skin text-base w-full mr-10`}>
                    Bienvenue {userAuth.username} !
                </div>
            )}
            <h1 className="homepage-title">
                Bienvenue dans Ciné Délices !
                <br />
                Plongez dans un univers où la cuisine rencontre le cinéma...
            </h1>
            <h2 className="homepage-subtitle">
                Pas d'idée pour ce soir ? Trouve l'inspiration avec des recettes
                tirées de tes films et séries préférés !
            </h2>
            <ul className="presentation-list">
                <li className="presentation-list-item">
                    <Link to="/catalogue" className="button-link">
                        Nos recettes
                    </Link>
                </li>
                <li className="presentation-list-item">
                    <AddRecipeModal onAddRecipe={handleAddRecipe} />{' '}
                </li>
            </ul>
            <p>Bon appétit et bon visionnage !</p>
            <div className="img_presentation">
                <img
                    className="homepage-image"
                    src="http://localhost:3000/movies/Jack-small.webp"
                    alt=""
                />
            </div>
            <div className="inspiration">
                <h3>Envie d'un dîner original ?</h3>
                <div className="img-container">
                    <div className="img-left">
                        <img
                            src={`http://localhost:3000/recipes/${data?.picture}`}
                            alt={`image illustrant la recette : ${data?.name}`}
                            className="random-img random-img-left"
                        />
                        <p className="inspiration-subtitle">
                            Ce soir c'est "{data.name}"
                        </p>
                    </div>
                    <div className="img-right">
                        <img
                            src={`http://localhost:3000/movies/${data?.Movie?.picture}`}
                            alt={`image illustrant le film  : ${data?.Movie?.name}`}
                            className="random-img random-img-right"
                        />
                        <p className="inspiration-subtitle">
                            En regardant : {data.Movie?.name}
                        </p>
                    </div>
                </div>
                <Link
                    to={`/recette/${data.id}`}
                    className="button-link discover-recipe-button"
                >
                    Découvre la recette
                </Link>
            </div>
            <h4>
                Met ton plus beau tablier et prépare ta soirée avec notre
                proposition !
            </h4>
            <Slider></Slider>
        </div>
    );
}
export default HomePage;
