import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import './header.scss';
import { useAuthContext } from '../Context/Authentification/useAuthContext';
import AddRecipeModal from '../Routes/CatalogPage/components/modal';

function Header() {
    // If the burger menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // If the search bar is open or closed
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navigate = useNavigate();

    // Function to toggle the burger menu state
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // menu closed
    const closeMenu = () => setIsMenuOpen(false);

    // modal is open or closed
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle the search bar state
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    const { userAuth } = useAuthContext();

    // redirection link if user is authentificated
    const handleInscriptionClick = () => {
        if (userAuth?.username) {
            navigate('/profil/me');
        } else {
            navigate('/inscription');
        }
    };

    return (
        <div className="header flex justify-between items-center p-5 bg-dark-red text-white border-b-2 relative">
            {/* logo Container */}
            <div className="logo-container text-skin">
                {/* Link to home page */}
                <Link to="/" className="logo-link" onClick={closeMenu}>
                    <span className="highlight">C</span>iné
                    <span className="highlight">D</span>élices
                </Link>
            </div>
            {/*show this message when user is authentificated*/}
            {userAuth?.username && (
                <div className="userAuth absolute left-1/2 top-16 transform -translate-x-1/2 text-center">
                    Bienvenue {userAuth.username} !
                </div>
            )}
            {/* Icons and links container */}
            <div className="link-container flex items-center space-x-4 relative ml-2 text-skin ">
                {/* User Icon*/}
                {(!isSearchOpen || isDesktop) && (
                    <Link
                        to={userAuth?.username ? '/profil/me' : '/connexion'}
                        className="user-icon block py-2"
                    >
                        <div
                            className="icon cursor-pointer "
                            onClick={closeMenu}
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </Link>
                )}
                {/* add recipes icon */}
                {(!isSearchOpen || isDesktop) && (
                    <Link
                        to="/catalogue"
                        className=" presentation-list-item"
                        onClick={closeMenu}
                    >
                        {/* Display icon on small screens */}

                        <FontAwesomeIcon
                            icon={faPlus}
                            className="block sm:hidden"
                        />

                        {/* text visible on screens larger than 500px */}
                        <Link
                            to="/connexion"
                            className="hidden sm:block cursor-pointer"
                            onClick={closeMenu}
                        >
                            <button>Ajoute ta recette</button>
                        </Link>
                    </Link>
                )}
                {/* Search Bar */}
                {isSearchOpen && (
                    <div
                        className={`search-bar top-16 right-0 bg-white text-gray-700 w-full max-w-md mx-auto p-2 shadow-md  flex items-center md:w-auto md:bg-transparent md:text-skin`}
                        onClick={closeMenu}
                    >
                        {/*Search Bar component*/}
                        <SearchBar />
                    </div>
                )}
                {/* Search icon */}
                <div onClick={toggleSearch}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="cursor-pointer"
                    />
                </div>

                {/* Burger Menu  */}
                <div
                    className="burger-menu flex flex-col cursor-pointer"
                    onClick={toggleMenu}
                >
                    <div className="line bg-skin"></div>
                    <div className="line bg-skin"></div>
                    <div className="line bg-skin"></div>
                </div>
            </div>

            {/* Mobile menu - shown/hidden based on isMenuOpen state */}
            {isMenuOpen && (
                <div
                    className={`mobile-menu bg-dark-red ${isDesktop ? 'w-1/2' : 'w-full'} absolute text-align-center`}
                >
                    {/* burger menu links */}
                    <div className="p-4" style={{ textAlign: 'center' }}>
                        <Link to="/" className="block py-2" onClick={closeMenu}>
                            Accueil
                        </Link>
                        <Link
                            to="/catalogue"
                            className="block py-2"
                            onClick={closeMenu}
                        >
                            Catalogue
                        </Link>
                        <Link
                            to={
                                userAuth?.username ? '/profil/me' : '/connexion'
                            }
                            className="block py-2"
                            onClick={closeMenu}
                        >
                            Connexion
                        </Link>
                        <Link
                            to={
                                userAuth?.username
                                    ? '/profil/me'
                                    : '/inscription'
                            }
                            className="block py-2"
                            onClick={handleInscriptionClick}
                        >
                            Inscription
                        </Link>
                        <Link
                            to="/inscription"
                            className="block py-2"
                            onClick={closeMenu}
                        >
                            Proposer une recette
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
