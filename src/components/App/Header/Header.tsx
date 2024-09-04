import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faPlus,
    faSearch,
    faBars,
} from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <div className="header">
            {/* logo */}
            <div className="logo-container">
                <Link to="/">Ciné Délices</Link>
            </div>
            <div className="link-container">
                {/* barre de raccourci */}
                <div className="account-icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="add-recipe-icon">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className="search-recipe-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                {/* burger menu */}
                <div className="burger-menu">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            {/* <ul>
                <li>Accueil</li>
                <li>Catalogue</li>
                <li>Connexion</li>
                <li>Inscription</li>
                <li>Proposer une recette</li>
                <li>Recherche</li>
            </ul> */}
        </div>
    );
}

export default Header;
