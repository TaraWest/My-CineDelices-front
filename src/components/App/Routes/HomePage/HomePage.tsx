import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import './homePage.scss';
import './UI/slider.scss';
import { IRecipe } from './homePagetype';
import Slider from './UI/slider.tsx';

function HomePage() {
    const [data, setData] = useState<IRecipe | null>(null);
    async function fetchOneRandom() {
        try {
            const response = await fetch(
                'http://localhost:3000/recipes/random',
            );
            const data = await response.json();
            console.log('then/success', data);
            setData(data);
        } catch (error) {
            console.log('catch/error', error);
        }
    }

    useEffect(() => {
        fetchOneRandom();
    }, []);

    return (
        <div className="homePage">
            <h1>
                Bienvenue dans Ciné Délices !
                <br />
                Plongez dans un univers où la cuisine rencontre le cinéma...
            </h1>
            <h2>
                Notre site vous propose des recettes de cuisine inspirées de
                films, séries et animés.
            </h2>
            <h3>Explorez nos fonctionnalités :</h3>
            <ul>
                <li>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="icon-padding"
                    />
                    Catalogue de recettes : Trouvez votre prochaine création
                    culinaire
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        className="icon-padding"
                    />
                    Ajoutez vos propres recettes
                </li>
            </ul>
            <h3>Bon appétit et bon visionnage !</h3>

            <div className="img_presentation">
                <img
                    src="/JackIsInTheKitchen.jpg"
                    alt="Jack Sparrow, héros du film Pirates des Caraïbes, fait la cuisine chez toi !"
                />
            </div>
            <div className="inspiration">
                <h3>Tu cherches une inspiration pour ce soir ?</h3>
                <div className="recipe-movie">
                    <div className="img-left">
                        <img
                            src="/dorade.png"
                            alt={`image illustrant la recette : ${data?.name}`}
                        />
                        <p className="inspiration-subtitle">
                            Cuisine ce soir {data?.name}
                        </p>
                    </div>
                    <div className="img-right">
                        <img
                            src="/les-dents-de-la-mer.jpg"
                            alt={`image illustrant la recette : ${data?.name}`}
                        />
                        <p className="inspiration-subtitle">
                            Cuisine ce soir {data?.name}
                        </p>
                    </div>
                </div>
                <h3>
                    Met ton plus beau tablier et prépare ta soirée avec notre
                    proposition !
                </h3>
            </div>
            <Slider></Slider>
        </div>
    );
}

export default HomePage;
