import { useEffect, useState } from 'react';
import { IRecipe } from './models';
import { getUserRecipes } from './services';

function RecepiesTab() {
    const [recepies, setRecepies] = useState<IRecipe[]>([]);
    useEffect(() => {
        getUserRecipes().then((data) => {
            setRecepies(data);
            return;
        });
    });
    return (
        <div>
            <div className="img-container">
                <div className="img-left">
                    <img
                        src={`http://localhost:3000/recipes/${recepies?.picture}`}
                        alt={`image illustrant la recette : ${recepies?.name}`}
                        className="random-img random-img-left"
                    />

                    <p className="inspiration-subtitle">
                        Ta recette "{recepies.name}"
                    </p>
                </div>
                <div className="img-right">
                    <img
                        src={`http://localhost:3000/movies/${recepies?.Movie?.picture}`}
                        alt={`image illustrant le film  : ${recepies?.Movie?.name}`}
                        className="random-img random-img-right"
                    />
                    <p className="inspiration-subtitle">
                        Le film associé : {recepies.Movie?.name}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default RecepiesTab;
