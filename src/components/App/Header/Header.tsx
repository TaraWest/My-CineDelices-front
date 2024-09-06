import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faUtensils,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
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
            {/* Conteneur du logo */}
            <div className="logo-container">
                {/* Lien vers la page d'accueil */}
                <Link to="/" className="text-2xl font-bold ">
                    CinéDélices
                </Link>
            </div>

            {/* Conteneur des icônes et des liens */}
            <div className="link-container flex items-center space-x-4 relative  ">
                {/* Icône utilisateur */}
                <Link to="/connexion" className="block py-2">
                    <div className="icon cursor-pointer ">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </Link>

                {/* Icône pour ajouter une recette */}
                <div className="icon flex items-center">
                    {/* Affichage de l'icône sur petits écrans */}

                    <FontAwesomeIcon
                        icon={faUtensils}
                        className="block sm:hidden"
                    />

                    {/* Texte "Ajouter une recette" visible sur les écrans de plus de 500px */}
                    <Link
                        to="/catalogue"
                        className="hidden sm:block cursor-pointer"
                    >
                        <button>Les Recettes</button>
                    </Link>
                </div>
                {/* Barre de recherche */}
                <div
                    className={`search-bar absolute top-16 right-0 bg-white text-black w-64 transition-transform duration-300 ${isSearchOpen ? 'block' : 'hidden'} md:block md:relative md:w-auto md:bg-transparent md:text-white`}
                >
                    <input
                        type="text"
                        placeholder="Ratatouille"
                        className="w-full p-2"
                    />
                </div>
                {/* Icône de recherche - cachée sur les grands écrans */}
                <div
                    className={`icon cursor-pointer md:hidden ${isSearchOpen ? 'hidden' : 'block'}`}
                    onClick={toggleSearch}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </div>

                {/* Menu burger  */}
                <div
                    className="burger-menu flex flex-col cursor-pointer"
                    onClick={toggleMenu}
                >
                    {/* Trois lignes du menu burger */}
                    <div className="line bg-skin"></div>
                    <div className="line bg-skin"></div>
                    <div className="line bg-skin"></div>
                </div>
            </div>

            {/* Menu mobile - affiché/caché instantanément selon l'état */}
            <div
                className={`mobile-menu absolute top-0 right-0 mt-16 bg-dark-red w-64 ${isMenuOpen ? 'block' : 'hidden'}`}
            >
                {/* Liens du menu mobile */}
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
