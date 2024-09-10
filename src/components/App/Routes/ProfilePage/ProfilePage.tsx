import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilPage.css';
import { fetchUser, updateUser } from './services';
import { IUser } from './models';

function ProfilePage() {
    // State de données de notre utilisateur
    const [userData, setUserData] = useState<IUser | null>(null);

    //State for the tab
    // false : "mes recettes"
    // true : "informations personnelles"
    const [switchTab, setSwitchTab] = useState(true);

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

    console.log(userData);

    return (
        <div className="flex m-2 flex-row">
            <div className="flex m-4 flex-col">
                <button
                    onClick={() => setSwitchTab(!switchTab)}
                    className={`px-4 py-2 rounded ${
                        switchTab
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-black'
                    }`}
                >
                    Mes Recettes
                </button>
                <button
                    onClick={() => setSwitchTab(!switchTab)}
                    className={`px-4 py-2 rounded ${
                        switchTab
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-black'
                    }`}
                >
                    Mes Informations personnelles
                </button>
            </div>
            <div className="flex m-4 flex-col sm:flex-row">
                <form className="flex m-4 flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="text"
                        id="prenom"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="nom">Nom</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="text"
                        id="nom"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="text"
                        id="pseudo"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="email"
                        id="email"
                        name="email_adress"
                        value={userData.email_address}
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />

                    <button type="submit" onClick={handleSubmit}>
                        {editForm
                            ? 'Enregistrer les modifications'
                            : 'Modifier'}
                    </button>
                </form>
            </div>
            <div className="my-recepies"></div>
        </div>
    );
}

export default ProfilePage;
