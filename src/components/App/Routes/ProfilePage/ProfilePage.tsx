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

    // States de mise à jour des valeurs des inputs
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        switch (e.target.name) {
            case 'first_name':
                setFirstName(e.target.value);
                break;
            case 'last_name':
                setLastName(e.target.value);
                break;
            case 'username':
                setUserName(e.target.value);
                break;
            case 'email_adress':
                setEmail(e.target.value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (editForm === false) {
            // On rend les inputs éditables
            setEditForm(true);
        } else {
            // au submitForm si editForm=true
            const dataToSend: IUser = {
                id: userData?.id,
                first_name: firstName,
                last_name: lastName,
                username: userName,
                email_address: email,
            };
            // On mettra la bdd a jour
            updateUser(dataToSend);
            // Les inputs sont désactivés
            setEditForm(false);
        }
    }

    // On déclanche la fonction au chargement de la page
    useEffect(() => {
        fetchUser()
            .then((data) => {
                setUserData(data);
                return;
            })
            .catch((error) => {
                return error;
            });
    }, []);
    // On gère le cas où il n'y a pas d'utilisateur trouvé
    if (!userData)
        return <div>Le navire coule et tu es seul dans la mer...</div>;
    /*
    - useEffect avec tableau de dépendance vide => charge les données de l'utilisateur et ça les met dans le state userData via setUserData.
    - au clic sur un bouton setEditForm => true, ce qui rend les inputs modifiables
    - dans l'input, handleInputChange sur l'attribut OnChange permet de mettre à jour les states pour chaque input
    - utiliser switch case break comme dans l'exemple d'Alexis
    - Au submit, mettre en place un objet const dataToSend = {
        first_name:firstName
        last
        user
        email
        password
    }
    await fonctionpour mettre à jour la bdd
                ----------------------------------------------------------------------------------
                 - useEffect avec tableau de dépendance vide => charge les données de l'utilisateur et ça les met dans le state userData via setUserData.
    - au clic sur un bouton setEditForm => true, ce qui rend les inputs modifiables
    - dans l'input, handleInputChange sur l'attribut OnChange permet de mettre à jour le userData 
 
    - Au submit 
    await fonctionpour mettre à jour la bdd

*/

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
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        type="text"
                        id="pseudo"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email_adress"
                        value={userData.email_address}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <button></button>
                </form>
            </div>
            <div className="my-recepies"></div>
        </div>
    );
}

export default ProfilePage;
