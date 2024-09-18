import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import ReactDOM from 'react-dom';
import './header.scss';
import { useAuthContext } from '../Context/Authentification/useAuthContext';
import AddRecipeModal from '../Routes/CatalogPage/components/modal';
import { Recipes } from '../Routes/CatalogPage/models';

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

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

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

    // modal add recipes
    const handleAddRecipe = (newRecipe: Recipes) => {
        console.log('Nouvelle recette ajoutée :', newRecipe);
    };

    return (
        <div className="header relative flex justify-between items-center p-5 bg-dark-red text-white border-b-2 relative">
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
                    <div
                        className=" user-icon presentation-list-item"
                        onClick={toggleModal}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="block sm:hidden"
                        />
                    </div>
                )}
                {/* modal with React Portal */}
                {isModalOpen &&
                    ReactDOM.createPortal(
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <AddRecipeModal onAddRecipe={handleAddRecipe} />
                        </div>,
                        document.getElementById('modal-root')!,
                    )}

                {/* text visible on screens larger than 500px */}
                <Link
                    to={userAuth?.username ? '/catalogue' : '/connexion'}
                    className="hidden sm:block cursor-pointer"
                    onClick={closeMenu}
                >
                    <AddRecipeModal onAddRecipe={handleAddRecipe} />
                </Link>

                {/* Search Bar */}
                {isSearchOpen && (
                    <div
                        className={`search-bar top-20 right-0 bg-white text-gray-700 w-full max-w-md mx-auto p-2 shadow-md  flex items-center md:w-auto md:bg-transparent md:text-skin`}
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
                    className={`mobile-menu bg-dark-red ${isDesktop ? 'w-1/2' : 'w-full'} absolute text-center`}
                >
                    {userAuth?.username && (
                        <div
                            className={` text-center text-visited-link text-base w-full mt-1em`}
                        >
                            Connecté en tant que {userAuth.username} !
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
                        <Link
                            to="/inscription"
                            className="block py-2 text-visited-link"
                            onClick={closeMenu}
                        >
                            Proposer une recette
                        </Link>
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
                        {/* logout */}
                        {userAuth?.username && (
                            <button
                                className="underline font-body text-visited-link text-center block text-left w-full mt-0"
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
