import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilPage.css';
import { fetchUser, updateUser } from './services';
import { IUser } from './models';

function ProfilePage() {
    // State de données de notre utilisateur
    const [userData, setUserData] = useState<IUser | null>(null);
    // State pour le formulaire qui sera par défault pas éditable
    const [editForm, setEditForm] = useState(false);

    function ChangeUserData (){
        const [firstName, setFirstName] = useState<string>("");
        const [lastName, setLastName] = useState<string>("");
        const [userName, setUserName] = useState<string>("");
        const [email, setEmail] = useState<string>("");
        
    };





    // // State de mise à jour de donnée utilisateur
    // const [formData, setFormData] = useState({
    //     first_name: '',
    //     last_name:'',
    //     username:'',
    //     email_adress:'',
    // })

    // // On met à jour les champs du formulaire
    // function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    //     const { name, value }=e.target.value;
    //     setUserData({ ...userData, [name]: value });
    // };

    function handleSubmit(event) {
    if (editForm = false) {
    // 
        setEditForm=true
    }
    // On mettra la bdd a jour
    event.preventDefault()
    updateUser(userData: IUser | null)
    }}


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
                <form onSubmit={handleSubmit}>
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
                </form>
            </div>
            <div className="my-recepies"></div>
        </div>
    );
}

export default ProfilePage;
