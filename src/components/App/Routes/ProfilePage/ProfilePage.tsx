import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { fetchUser, updateUser } from './services';
import { IUser } from './models';
import './ProfilPage.css';

function ProfilePage() {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const navigate = useNavigate();
    // State de données de notre utilisateur
    const [userData, setUserData] = useState<IUser | null>(null);

    //State for the tab
    // false : "mes recettes"
    // true : "informations personnelles"
    const [switchTab, setSwitchTab] = useState(true);

    // The form is not editable by default
    const [editForm, setEditForm] = useState(false);

    // update user's data
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    function handleNavigate() {
        navigate('/connexion');
    }

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
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setUserName(data.username);
                setEmail(data.email_address);
                return;
            })

            .catch((error) => {
                return error;
            });
    }, []);

    // On gère le cas où il n'y a pas d'utilisateur trouvé
    if (!userData)
        return (
            <div className="justify-center flex h-160">
                <div className="flex flex-col max-w-xs m-6 items-center ">
                    <p>Merci de vous connecter pour accéder à cette page</p>
                    <button onClick={handleNavigate} className="mt-30">
                        Connectez vous!
                    </button>
                </div>
            </div>
        );

    console.log(userData);
    console.log(firstName);

    return (
        <div className={`flex m-2 ${isDesktop ? 'flex-row' : 'flex-col'}`}>
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
                        value={
                            firstName === userData.first_name
                                ? userData.first_name
                                : firstName
                        }
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="nom">Nom</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="text"
                        id="nom"
                        name="last_name"
                        value={
                            firstName === userData.last_name
                                ? userData.last_name
                                : lastName
                        }
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="pseudo">Pseudo</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="text"
                        id="pseudo"
                        name="username"
                        value={
                            firstName === userData.username
                                ? userData.username
                                : userName
                        }
                        onChange={handleInputChange}
                        disabled={!editForm}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        className="m-4 text-center bg-transparent"
                        type="email"
                        id="email"
                        name="email_adress"
                        value={
                            firstName === userData.email_address
                                ? userData.email_address
                                : email
                        }
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
