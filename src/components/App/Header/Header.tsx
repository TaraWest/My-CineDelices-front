import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import './header.scss';

function Header() {
    // État pour savoir si le menu burger est ouvert ou fermé
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // État pour savoir si la barre de recherche est ouverte ou fermée
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Fonction pour basculer l'état du menu burger
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Fonction pour basculer l'état de la barre de recherche
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    return (
        <div className="header flex justify-between items-center p-4 bg-dark-red text-white border-b-2 relative">
            {/* logo */}
            <div className="logo-container">
                <Link to="/" className="text-2xl font-bold ">
                    Ciné Délices
                </Link>
            </div>
            <div className="link-container flex items-center space-x-4 relative">
                {/* Icônes de raccourci */}
                <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
                {/* Icône de recherche avec gestionnaire de clic */}
                <div className="icon cursor-pointer" onClick={toggleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                {/* Menu burger pour mobile */}
                <div
                    className="burger-menu flex flex-col cursor-pointer"
                    onClick={toggleMenu}
                >
                    <div className="line bg-skin"></div>
                    <div className="line bg-skin"></div>
                    <div className="line bg-skin"></div>
                </div>
                {/* Barre de recherche */}
                <div
                    className={`search-bar absolute top-16 right-0 bg-white text-black w-64 transition-transform duration-300 ${isSearchOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-auto md:bg-transparent md:text-white`}
                >
                    <input
                        type="text"
                        placeholder="Ramen"
                        className="w-full p-2"
                    />
                </div>
            </div>
            {/* Menu mobile qui s'affiche ou se cache selon l'état isMenuOpen */}
            <div
                className={`mobile-menu absolute top-0 right-0 mt-16 bg-dark-red w-64 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
