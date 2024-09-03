import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            {/* logo */}
            <div className="logo-container">
                <Link to="/">Ciné Délices</Link>
            </div>
            <div className="link-container">
                {/* barre de raccourci */}
                <div className="account-icon">Bonhomme</div>
                <div className="add-recipe-icon">+</div>
                <div className="search-recipe-icon">Loupe</div>
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
