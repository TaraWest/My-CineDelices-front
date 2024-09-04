import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

function Header() {
    // est ce que mon burger menu est ouvert ou fermé
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // fonction pour basculer l'état du menu ouvert ou fermé
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="header flex justify-between items-center p-4 bg-custom-dark-red text-white border-b-2 border-custom-beige">
            {/* logo */}
            <div className="logo-container">
                <Link to="/" className="text-2l font-bold">
                    Ciné Délices
                </Link>
            </div>
            <div className="link-container flex items-center space-x-4">
                {/* barre de raccourci */}
                <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                {/* burger menu */}
                <div
                    className="burger-menu flex flex-col cursor-pointer"
                    onClick={toggleMenu}
                >
                    <div className="line bg-custom-beige"></div>
                    <div className="line bg-custom-beige"></div>
                    <div className="line bg-custom-beige"></div>
                </div>
            </div>
            {/* Menu mobile qui s'affiche ou se cache selon l'état isMenuOpen */}
            <div
                className={`mobile-menu absolute top-0 right-0 mt-16 bg-custom-dark-red text-white w-64 transition-transform duration-300 ${isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'}`}
            >
                <div className="p-4">
                    <Link to="/" className="block py-2">
                        Accueil
                    </Link>
                    <Link to="/catalogue" className="block py-2">
                        Catalogue
                    </Link>
                    <Link to="/connexion" className="block py-2">
                        Connexion
                    </Link>
                    <Link to="/inscription" className="block py-2">
                        Inscription
                    </Link>
                    <Link to="/addrecipe" className="block py-2">
                        Proposer une recette
                    </Link>
                    <Link to="/recherche" className="block py-2">
                        Recherche
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
