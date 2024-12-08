import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import AddRecipeModal from '../CatalogPage/components/modal';
import { IRecipe } from './models';
import { fetchOneRandom } from './services';
import Slider from './components/slider/slider';
import './components/slider/slider.scss';
import './homePage.scss';

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
        <div className=" flex flex-col items-center p-5">
            {/* {userAuth?.username && !isDesktop && (
                <div className={` text-right text-skin text-base w-full mr-10`}>
                    Bienvenue {userAuth.username} !
                </div>
            )} */}
            <h1 className="text-center text-2xl md:text-4xl font-bold mb-8">
                Bienvenue dans Ciné Délices !
                <br />
                <br /> Ici la cuisine rencontre le cinéma...
            </h1>
            <h2 className="text-center text-lg md:text-xl font-medium mb-8">
                Pas d'idée pour ce soir ? Trouve l'inspiration avec des recettes
                tirées de tes films et séries préférés !
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-8 border-8 border-double border-skin rounded-t-[15%] rounded-b-lg p-5 md:p-10">
                <div className="text-center md:text-justify pt-5 leading-6 text-base md:text-lg">
                    {isDesktop && (
                        <img
                            className="rounded-lg w-1/2 float-right ml-4"
                            src="http://localhost:3000/movies/cinedelices.webp"
                            alt="Image de présentation de Ciné Délices"
                        />
                    )}
                    <p className="text-base md:text-lg mx-auto">
                        <strong>
                            Bienvenue sur Ciné Délices, la destination
                            incontournable pour découvrir des recettes inspirées
                            de films cultes !
                        </strong>
                        <br />
                        <br />
                        Plonge dans l'univers cinématographique à travers les
                        plats emblématiques qui ont marqué l'histoire du grand
                        écran. Chaque recette est soigneusement recréée pour te
                        permettre de goûter à la magie des scènes les plus
                        gourmandes.
                        <br />
                        <br />
                        Que tu sois un fan de banquets fantastiques, de festins
                        royau ou de petits plats simples mais mémorables , nous
                        t'invitons à cuisiner comme tes personnages préférés.
                        Prépare-toi à allier passion du cinéma et plaisir de la
                        table !
                        <br />
                        <br />
                        <em>Bon appétit et bon film !</em>
                    </p>
                </div>

                {!isDesktop && (
                    <div className="img_presentation w-3/4">
                        <img
                            className="rounded-lg object-cover"
                            src="http://localhost:3000/movies/cinedelices_small.webp"
                            alt="Image de présentation de Ciné Délices"
                        />
                    </div>
                )}
            </div>

            <div className="flex w-full justify-around my-8">
                <button
                    className="button-link homepage-link-button mr-4"
                    onClick={() => {
                        navigate('/catalogue');
                    }}
                >
                    Nos recettes
                </button>
                <AddRecipeModal onAddRecipe={handleAddRecipe} />{' '}
            </div>

            <h4>
                Met ton plus beau tablier et prépare ta soirée grâce à nos
                propositions !
            </h4>
            <Slider></Slider>
        </div>
    );
}
export default HomePage;
