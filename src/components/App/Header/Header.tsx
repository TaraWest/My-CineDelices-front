import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSearch,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

import './header.scss';
import { useAuthContext } from '../Context/Authentification/useAuthContext';

function Header() {
    // If the burger menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // If the search bar is open or closed
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // menu closed
    const closeMenu = () => setIsMenuOpen(false);

    // Function to toggle the search bar state
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    const { userAuth, handleLogout } = useAuthContext();

    // redirection link if user is authentificated
    const handleInscriptionClick = () => {
        if (userAuth?.username) {
            navigate('/profil/me');
        } else {
            navigate('/inscription');
        }
    };

    // function to close burger menu after logout
    const logout = () => {
        handleLogout();
        closeMenu();
    };

    return (
        <div className="header relative flex justify-between items-center p-5 bg-dark-red  border-b-2">
            {/* logo Container */}
            <div className="logo-container text-skin">
                {/* Link to home page */}
                <Link to="/" className="logo-link" onClick={closeMenu}>
                    <span className="highlight">C</span>iné
                    <span className="highlight">D</span>élices
                </Link>
            </div>
            {/*show this message when user is authentificated*/}
            {userAuth?.username && isDesktop && (
                <div
                    // className={`absolute left-1/2 top-16 transform -translate-x-3/4 text-center text-skin`}
                    className="text-center text-skin font-semibold text-xl"
                >
                    Bienvenue {userAuth.username} !
                </div>
            )}
            {/* Icons and links container */}
            <div className="link-container flex items-center space-x-4 relative ml-2 text-skin ">
                {/* User Icon*/}

                <Link
                    to={userAuth?.username ? '/profil/me' : '/connexion'}
                    className="user-icon block py-2"
                >
                    <div
                        className="text-xl cursor-pointer "
                        onClick={closeMenu}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </Link>

                {/* recipes icon */}
                {!isDesktop && (
                    <Link
                        to={'/catalogue'}
                        className=" user-icon"
                        onClick={closeMenu}
                    >
                        <FontAwesomeIcon icon={faUtensils} className="block" />
                    </Link>
                )}

                {/* text visible on screens larger than 500px */}
                {isDesktop && (
                    <Link
                        to={'/catalogue'}
                        className="sm:block button-link"
                        onClick={closeMenu}
                    >
                        Recettes
                    </Link>
                )}

                {/* Search Bar */}
                {isSearchOpen && (
                    <div
                        className={
                            isDesktop ? 'search-bar' : 'search-bar-mobile'
                        }
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
                    id="toggleMenu"
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
                    id="toggleMenu"
                    className={`mobile-menu bg-dark-red absolute right-0 top-24 ${isDesktop ? 'w-1/3' : 'w-full'}   h-screen transition-transform duration-300 ease-in-out`}
                >
                    {userAuth?.username && (
                        <div
                            className={` text-center text-visited-link text-base w-full mt-1em m-0.5 px-0.5`}
                        >
                            Connecté en tant que <br /> {userAuth.username} !
                        </div>
                    )}
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

                        {!userAuth && (
                            <div>
                                <Link
                                    to="/connexion"
                                    className="block py-2"
                                    onClick={closeMenu}
                                >
                                    Connexion
                                </Link>
                                <Link
                                    to="/inscription"
                                    className="block py-2"
                                    onClick={handleInscriptionClick}
                                >
                                    Inscription
                                </Link>
                            </div>
                        )}

                        {/* Link to admin page */}
                        {userAuth?.role_id === 1 && (
                            <Link
                                to="http://localhost:3000/admin"
                                className="block py-2 text-visited-link"
                                onClick={closeMenu}
                            >
                                Admin
                            </Link>
                        )}
                        {/* Link to profil page */}
                        {userAuth?.username && (
                            <Link
                                to="/profil/me"
                                className="block py-2 text-visited-link"
                                onClick={closeMenu}
                            >
                                Mon Profil
                            </Link>
                        )}
                        {/* logout */}
                        {userAuth?.username && (
                            <button
                                className="block text-center font-body underline text-visited-link w-full mt-0 "
                                onClick={logout}
                            >
                                Déconnexion
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
