import { useEffect, useState } from 'react';
import { IRecipe } from './models';
import { getUserRecipes } from './services';

function RecepiesTab() {
    const [recepies, setRecepies] = useState<IRecipe[]>([]);

    useEffect(() => {
        getUserRecipes()
            .then((data) => {
                setRecepies(data);
                return;
            })
            .catch((error) => {
                return error;
            });
    }, []);

    //If user hasn't create any recipe
    if (!recepies)
        return (
            <div className="justify-center flex h-160">
                <p>Vous n'avez pas encore créé de recettes</p>
            </div>
        );

    return (
        <div>
            {recepies.map((recepies) => (
                <div className="img-container">
                    <div className="img-left">
                        <img
                            src={`http://localhost:3000/recipes/${recepies.picture}`}
                            alt={`image illustrant la recette : ${recepies.name}`}
                            className="random-img random-img-left"
                        />

                        <p className="inspiration-subtitle">
                            {/* Ta recette "{recepies.name}" */}
                        </p>
                    </div>
                    <div className="img-right">
                        <img
                            src={`http://localhost:3000/movies/${recepies.Movie.picture}`}
                            alt={`image illustrant le film  : ${recepies.Movie.name}`}
                            className="random-img random-img-right"
                        />
                        <p className="inspiration-subtitle">
                            {/* Le film associé : {recepies.Movie?.name} */}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default RecepiesTab;
