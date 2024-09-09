import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './components/App/Routes/HomePage/HomePage';

import RecipePage from './components/App/Routes/RecipePage/RecipePage';
import Header from './components/App/Header/Header';
import Footer from './components/App/Footer/Footer';
import RegistrationPage from './components/App/Routes/RegistrationPage/RegistrationPage';
import LoginPage from './components/App/Routes/LoginPage/LoginPage';
// import ProfilePage from './components/App/Routes/ProfilePage/ProfilePage';
import { CatalogPage } from './components/App/Routes/CatalogPage/CatalogPage';

function App() {
    //si besoin d'écrire ici, communiquer avant pour évitr des doublons dans les noms des variables, toujours mettre un commentaire pour expliquer ce qu'on fait
    return (
        <div className="app">
            {<Header />}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogue" element={<CatalogPage />} />
                <Route path="/recette/:id" element={<RecipePage />} />
                <Route path="/inscription" element={<RegistrationPage />} />
                <Route path="/connexion" element={<LoginPage />} />
                {/* <Route path="/profil/:id" element={<ProfilePage />} /> */}
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
