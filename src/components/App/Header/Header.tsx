import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSearch,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import './header.scss';
import { useAuthContext } from '../Context/useAuthContext';

function Header() {
    // If the burger menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // If the search bar is open or closed
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Function to toggle the burger menu state
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // menu closed
    const closeMenu = () => setIsMenuOpen(false);

    // Function to toggle the search bar state
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    const { userAuth, isAuth } = useAuthContext();

    useEffect(() => {
        if (isDesktop) {
            setIsSearchOpen(true);
        } else {
            setIsSearchOpen(false);
        }
    }, [isDesktop]);

    console.log(userAuth);
    console.log(isAuth);

    return (
        <div className="header flex justify-between items-center p-5 bg-dark-red text-white border-b-2 relative">
            {/* logo Container */}
            <div className="logo-container text-skin">
                {/* Link to home page */}
                <Link to="/" className="logo-link">
                    <span className="highlight">C</span>iné
                    <span className="highlight">D</span>élices
                </Link>
            </div>

            {userAuth && <div>Bienvenue {userAuth.username}</div>}

            {/* Icons and links container */}
            <div className="link-container flex items-center space-x-4 relative ml-2 text-skin ">
                {/* User Icon*/}
                {(!isSearchOpen || isDesktop) && (
                    <Link to="/connexion" className="user-icon block py-2">
                        <div className="icon cursor-pointer ">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </Link>
                )}
                {/* recipes icon */}
                {(!isSearchOpen || isDesktop) && (
                    <Link
                        to="/catalogue"
                        className=" user-icon flex items-center"
                    >
                        {/* Display icon on small screens */}

                        <FontAwesomeIcon
                            icon={faUtensils}
                            className="block sm:hidden"
                        />

                        {/* text visible on screens larger than 500px */}
                        <Link
                            to="/catalogue"
                            className="hidden sm:block cursor-pointer"
                        >
                            <button>Recettes</button>
                        </Link>
                    </Link>
                )}
                {/* Search Bar */}
                {isSearchOpen && (
                    <div
                        className={`search-bar top-16 right-0 bg-skin text-black w-64 transition-transform duration-300 md:block md:relative md:w-auto md:bg-transparent md:text-skin`}
                    >
                        {/*Search Bar component*/}
                        <SearchBar />
                    </div>
                )}
                {/* Search icon - hidden on larger screens */}
                <div
                    className={`icon cursor-pointer md:hidden`}
                    onClick={toggleSearch}
                >
                    <FontAwesomeIcon icon={faSearch} />
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
                <div className="mobile-menu bg-dark-red  ${isDesktop ? 'w-1/2' : 'w-full'} absolute">
                    {/* burger menu links */}
                    <div className="p-4">
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
                            to="/connexion"
                            className="block py-2"
                            onClick={closeMenu}
                        >
                            Connexion
                        </Link>
                        <Link
                            to="/inscription"
                            className="block py-2"
                            onClick={closeMenu}
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
