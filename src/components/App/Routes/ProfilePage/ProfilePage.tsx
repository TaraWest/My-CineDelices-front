import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getUserRecipes, updateUser } from './services';
import { IRecipe, IUser } from './models';
import './ProfilPage.css';
import RecepiesTab from './components/RecepiesTab';
import UserInfoForm from './components/UserInfoForm';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import { fetchDeleteRecipe } from './services';

function ProfilePage() {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const navigate = useNavigate();
    // State for user's personnel data
    // const [userData, setUserData] = useState<IUser | null>(null);

    //States from context authentification
    const { userAuth } = useAuthContext();

    //State for user's recipies
    const [recipies, setRecipies] = useState<IRecipe[]>([]);

    //State for the tab
    // 1 : "mes recettes"
    // 2 : "informations personnelles"
    const [switchTab, setSwitchTab] = useState('1');

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

    function handleDeleteRecipe(recipeId: number) {
        fetchDeleteRecipe(recipeId).then(() => {
            getUserRecipes() // Fetch updated list after deletion
                .then((data) => {
                    setRecipies(data);
                    return;
                })
                .catch((error) => {
                    return error;
                });
        });
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (editForm === false) {
            // set inputs editables
            setEditForm(true);
        } else {
            if (userAuth && userAuth.id) {
                // on submitForm if editForm=true
                const dataToSend: IUser = {
                    id: userAuth.id,
                    first_name: firstName,
                    last_name: lastName,
                    username: userName,
                    email_address: email,
                };
                console.log('log de data to send', dataToSend);
                // fetch and update user info
                updateUser(dataToSend);
                // set input disable
                setEditForm(false);
            }
        }
    }

    // is user is connected, put his datas into states to be able to update them
    useEffect(() => {
        if (
            userAuth &&
            userAuth.first_name &&
            userAuth.last_name &&
            userAuth.username &&
            userAuth.email_address
        ) {
            setFirstName(userAuth.first_name);
            setLastName(userAuth.last_name);
            setUserName(userAuth.username);
            setEmail(userAuth.email_address);

            getUserRecipes()
                .then((data) => {
                    setRecipies(data);
                    return;
                })

                .catch((error) => {
                    return error;
                });
        }
    }, [userAuth]);

    if (!userAuth) {
        return (
            <div className="justify-center flex h-160">
                <div className="flex flex-col max-w-xs m-6 items-center ">
                    <h4>Merci de vous connecter pour accéder à cette page</h4>
                    <button onClick={handleNavigate} className="button-link">
                        Connectez vous!
                    </button>
                </div>
            </div>
        );
    }
    // console.log('recettes enregistrés en state:', recipies);

    return (
        <div className={`flex m-2 ${isDesktop ? 'flex-row' : 'flex-col'}`}>
            <div className="flex m-4 flex-col">
                <button
                    onClick={() => setSwitchTab('1')}
                    className={`px-4 py-2 rounded ${
                        switchTab
                            ? 'bg-transparent text-white'
                            : 'bg-dark-red text-skin'
                    }`}
                >
                    Mes Recettes
                </button>
                <button
                    onClick={() => setSwitchTab('2')}
                    className={`px-4 py-2 rounded ${
                        switchTab
                            ? 'bg-dark-red text-skin'
                            : 'bg-transparent text-white'
                    }`}
                >
                    Mes Informations personnelles
                </button>
            </div>

            {/* here the tab "Mes Informations personnelles" */}
            <div
                className={`${switchTab === '2' ? 'flex justify-center items-center m-4 flex-col sm:flex-row' : 'hidden'}`}
            >
                <UserInfoForm
                    firstName={firstName}
                    lastName={lastName}
                    userName={userName}
                    email={email}
                    // password={password}
                    editForm={editForm}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    setEditForm={setEditForm}
                />
            </div>

            {/* here the tab "mes recettes" */}
            <div
                className={`${switchTab === '1' ? 'flex m-4 flex-col sm:flex-row' : 'hidden'}`}
            >
                <RecepiesTab
                    recipies={recipies}
                    handleDeleteRecipe={handleDeleteRecipe}
                />
            </div>
        </div>
    );
}

export default ProfilePage;
