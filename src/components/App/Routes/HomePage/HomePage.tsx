import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from './models';
import Slider from './components/slider/slider';
import AddRecipeModal from './components/modal';
import './components/slider/slider.scss';
import './homePage.scss';

function HomePage() {
    const [data, setData] = useState<IRecipe | null>(null);
    async function fetchOneRandom() {
        try {
            const response = await fetch(
                'http://localhost:3000/recipes/randomOne',
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

    if (!data) {
        return <div>Oups, petit problème !? Merci de revenir plus tard...</div>;
    }
    return (
        <div className="homePage">
            <h1 className="homepage-title">
                Bienvenue dans Ciné Délices !
                <br />
                Plongez dans un univers où la cuisine rencontre le cinéma...
            </h1>
            <h2 className="homepage-subtitle">
                Pas d'idée pour ce soir ? Trouve l'inspiration avec des recettes
                tirées de tes films et séries préférés !
            </h2>
            <ul>
                <li>
                    <Link to="/catalogue" className="button-link">
                        Nos recettes
                    </Link>
                </li>
                <li>
                    <AddRecipeModal></AddRecipeModal>
                </li>
            </ul>
            <h3>Bon appétit et bon visionnage !</h3>

            <div className="img_presentation"></div>
            <div className="inspiration">
                <h3>Envie d'un dîner original ?</h3>
                <div className="img-container">
                    <div className="img-left">
                        <img
                            src={`/recipes/${data.picture}`}
                            alt={`image illustrant la recette : ${data.name}`}
                            className="random-img"
                        />

                        <p className="inspiration-subtitle">
                            Ce soir c'est "{data.name}"
                        </p>
                    </div>
                    <div className="img-right">
                        <img
                            src={`/movies/${data.Movie?.picture}`}
                            alt={`image illustrant le film  : ${data.Movie?.name}`}
                            className="random-img"
                        />
                        <p className="inspiration-subtitle">
                            En regardant : {data.Movie?.name}
                        </p>
                    </div>
                </div>
                <Link to={`/recette/${data.id}`} className="button-link">
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
