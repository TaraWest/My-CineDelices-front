import { useEffect, useState } from 'react';
import './homePage.scss';
import './components/slider/index.scss';
import { IRecipe } from './models';
import Slider from './components/slider';
import { Link } from 'react-router-dom';
import AddRecipeModal from './components/modal';

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
            <ul>
                <li>
                    <Link
                        to="/catalogue"
                        className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 hover:bg-blue-700"
                    >
                        Catalogue de recettes
                    </Link>
                </li>
                <li>
                    <AddRecipeModal></AddRecipeModal>
                </li>
            </ul>
            <h3>Bon appétit et bon visionnage !</h3>

            <div className="img_presentation"></div>
            <div className="inspiration">
                <div className="recipe-movie">
                    <div className="img-left">
                        <img
                            src={`/recipes/${data?.picture}`}
                            alt={`image illustrant la recette : ${data?.name}`}
                        />
                        <p className="inspiration-subtitle">
                            Cuisine ce soir {data?.name}
                        </p>
                    </div>
                    <div className="img-right">
                        <img
                            src={`/movies/${data?.Movie?.picture}`}
                            alt={`image illustrant le film  : ${data?.Movie?.name}`}
                        />
                        <p className="inspiration-subtitle">
                            En regardant : {data?.Movie?.name}
                        </p>
                    </div>
                </div>
                <div className="right-div">
                    <h4>Tu cherches une inspiration pour ce soir ?</h4>
                    <Link to={`/recette/${data?.id}`} className="link-button">
                        voir notre proposition
                    </Link>
                </div>
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
