import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
            <h1 className="homepage-title mb-2em">
                Bienvenue dans Ciné Délices !
                <br />
                Plongez dans un univers où la cuisine rencontre le cinéma...
            </h1>
            <h2 className="homepage-subtitle mb-2em">
                Pas d'idée pour ce soir ? Trouve l'inspiration avec des recettes
                tirées de tes films et séries préférés !
            </h2>

            <div className="container">
                <div className="presentation">
                    <p>
                        Bienvenue sur CinéDélices, votre destination
                        incontournable pour découvrir des recettes inspirées des
                        films cultes ! Plongez dans l'univers cinématographique
                        à travers les plats emblématiques qui ont marqué
                        l'histoire du grand écran. Chaque recette est
                        soigneusement recréée pour vous permettre de goûter à la
                        magie des scènes les plus gourmandes. Que vous soyez fan
                        de banquets fantastiques, de festins royaux ou de petits
                        plats simples mais mémorables, nous vous invitons à
                        cuisiner comme vos personnages préférés. Préparez-vous à
                        allier passion du cinéma et plaisir de la table ! Bon
                        appétit et bon film !
                    </p>
                </div>

                <div className="img_presentation">
                    <img
                        className="homepage-image"
                        src="http://localhost:3000/movies/Cinédelices.webp"
                        alt=""
                    />
                </div>
            </div>

            <div className="homepage-button">
                <button
                    className="button-link homepage-link-button"
                    onClick={() => {
                        navigate('/catalogue');
                    }}
                >
                    Nos recettes
                </button>
                <AddRecipeModal onAddRecipe={handleAddRecipe} />{' '}
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
