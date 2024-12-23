import { Link } from 'react-router-dom';
import './PageNotFound.scss';

function PageNotFound() {
    return (
        <div className="flex flex-col items-center">
            <p className="mt-1em mx-2em font-cinzel text-1xl font-semibold">
                Oh non ! la page que vous cherchez est aussi introuvable qu'un
                ramen dans un film de science-fiction...
            </p>
            <div className="not-found-part">
                <img
                    className="not-found-img"
                    src="http://localhost:3000/recipes/ramen.webp"
                    alt=""
                />
            </div>
            <Link className="text-2xl mx-2em" to="/catalogue">
                Cliquez ici pour revenir à la page de catalogue!
            </Link>
        </div>
    );
}

export default PageNotFound;
