import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilPage.css';
import { fetchUser, updateUser } from './services';
import { IUser } from './models';
import axios from 'axios';

function ProfilePage() {
    // State de données de notre utilisateur
    const [userData, setUserData] = useState<IUser | null>(null);
    // State pour le formulaire qui sera par défault pas éditable
    const [editForm, setEditForm] = useState(false);

    // On met à jour les champs du formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }
        setUserData({ ...userData, [name]: value }); 
    };

    //On mettra la bdd a jour
await function handleSubmit (event) =>{
    event.preventDefault()
    updateUser(userData: IUser | null)
}

    // On déclanche la fonction au chargelent de la page
    useEffect(() => {
        fetchUser()
            .then((data) => {
                return setUserData(data);
            })
            .catch((error) => {
                return error;
            });
    }, []);
    console.log(userData);
    if (!userData)
        return <div>Le navire coule et tu es seul dans la mer...</div>;

    return (
        <div className="main-profil-container">
            <div className="left-menu">
                <Link to="/">Mes Recettes</Link>
                <Link to="/">Mes Informations personnelles</Link>
            </div>
            <div className="perso-info">
                {/* fonction a créer dans services ou pas ?: fetch put ou post a voir */}
                <form onSubmit={handleSubmit}></form>
                <label htmlFor="prenom">Prénom</label>
                <input
                    type="text"
                    id="prenom"
                    name="prénom"
                    value={userData.first_name}
                    onChange={handleInputChange}
                    disabled={!editForm}
                />
                <label htmlFor="nom">Nom</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={userData.last_name}
                    onChange={handleInputChange}
                    disabled={!editForm}
                />
                <label htmlFor="pseudo">Pseudo</label>
                <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={userData.username}
                    onChange={handleInputChange}
                    disabled={!editForm}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email_address}
                    onChange={handleInputChange}
                    disabled={!editForm}
                />
            </div>
            <div className="my-recepies"></div>
        </div>
    );
}

export default ProfilePage;
