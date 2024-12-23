import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from '../../Context/Authentification/useAuthContext';
import { getUserRecipes, updateUser, fetchDeleteRecipe } from './services';
import RecepiesTab from './components/RecepiesTab';
import UserInfoForm from './components/UserInfoForm';
import { IRecipe, IUser } from './models';
import { toast } from 'react-toastify';
// import sendEmailNotification from './components/emailUpdate';

function ProfilePage() {
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
    const navigate = useNavigate();

    //States from context authentification
    const { userAuth } = useAuthContext();

    //State for user's recipies
    const [recipies, setRecipies] = useState<IRecipe[]>([]);

    //State for the tab
    // 1 : "mes recettes"
    // 2 : "informations personnelles"
    const [switchTab, setSwitchTab] = useState(1);

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
            // send email if email changed
            // if (
            //     userAuth &&
            //     userAuth?.email_address !== null &&
            //     userAuth?.email_address !== email
            // ) {
            //     sendEmailNotification(userAuth.email_address, email);
            // }
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
                updateUser(dataToSend)
                    .then(() => {
                        toast.success(
                            'Vos informations ont été mises à jour avec succès.',
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(
                            'Une erreur est survenue. Veuillez réessayer.',
                        );
                    });
                // set input disable
                setEditForm(false);
            }
        }
    }

    // if user is connected, put his datas into states to be able to update them
    useEffect(() => {
        if (userAuth) {
            setFirstName(userAuth.first_name || '');
            setLastName(userAuth.last_name || '');
            setUserName(userAuth.username || '');
            setEmail(userAuth.email_address || '');

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
            <div className="flex justify-center items-center h-[calc(100vh-300px)]">
                <div className="flex flex-col max-w-xs m-6">
                    <h4>Merci de vous connecter pour accéder à cette page</h4>
                    <button onClick={handleNavigate} className="button-link">
                        Connectez vous !
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
                    onClick={() => setSwitchTab(1)}
                    className={`px-4 py-2 rounded bg-dark-red text-skin ${
                        switchTab === 1 ? 'text-skin underline' : 'text-skin'
                    }`}
                >
                    Mes Recettes
                </button>
                <button
                    onClick={() => setSwitchTab(2)}
                    className={`px-4 py-2 rounded bg-dark-red text-skin ${
                        switchTab === 2 ? 'text-skin underline' : 'text-skin'
                    }`}
                >
                    Mes Informations personnelles
                </button>
            </div>

            {/* here the tab "Mes Informations personnelles" */}
            <div
                className={`${switchTab === 2 ? 'flex justify-center items-center m-4 flex-col sm:flex-row' : 'hidden'}`}
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
                className={`${switchTab === 1 ? 'flex m-4 flex-col sm:flex-row' : 'hidden'}`}
            >
                <RecepiesTab
                    recipies={recipies}
                    handleDeleteRecipe={handleDeleteRecipe}
                    setRecipies={setRecipies}
                />
            </div>
        </div>
    );
}

export default ProfilePage;
