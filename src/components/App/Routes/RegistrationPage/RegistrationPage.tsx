import { useState } from 'react';
import './RegistrationPage.scss';
import { IError } from './models';
import { handleRegistration } from './services';
import { useNavigate } from 'react-router-dom';
function RegistrationPage() {
    const [error, setError] = useState<IError | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);

    const [firstName, setFirstName] = useState<string | null>(null);

    const [userName, setUserName] = useState<string | null>(null);
    const [userNameError, setUserNameError] = useState<string | null>(null);

    const [email, setEmail] = useState<string | null>(null);
    // const [emailError, setEmailError] = useState<string | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState<
        string | null
    >(null);

    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const navigate = useNavigate();
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //On enpêche le comportement par défaut du bouton type submit
        event.preventDefault();

        //Vérification de la conformité entre le mot de passe et sa vérification, et affichage de l'erreur correspondante
        if (password !== passwordConfirm) {
            setError({
                message:
                    'Les mots de passe ne correspondent pas. Veuillez vérifier que le mot de passe et la confirmation soient identiques.',
            });
            return;
        } else {
            //Remise à zéro du state error en cas de correction
            if (error) {
                setError(null);
            }
        }

        //Vérification des champs obligatoires à remplir, qui complète le 'required' des input concernés
        if (!userName || !email || !password || !passwordConfirm) {
            setError({
                message: 'Veuillez renseigner tous les champs obligatoires',
            });
            console.log('erreur déclenchée');
            return;
        } else {
            //Remise à zéro du state error en cas de correction
            if (error) {
                setError(null);
            }
        }

        //Envoie des données dans une fonction à part qui communique avec l'API.
        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            email_address: email,
            password,
        };
        const response = await handleRegistration(dataToSend);
        if (response.status === 201) {
            setMessage(response.data.message);
            console.log(message);

            navigate('/');
        }
        {
            setError({
                message:
                    "Problème lors de l'inscription, vérifiez le remplissage des données",
            });
        }

        console.log(dataToSend);
        //Fin de la fonction handleSubmit
    }
    console.log(focusedInput);
    console.log(userNameError);

    // Gestion des champs controlés
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'last_name':
                setLastName(e.target.value);

                break;
            case 'first_name':
                setFirstName(e.target.value);

                break;
            case 'username':
                setUserName(e.target.value);
                if (
                    userName &&
                    (userName.length === 1 || userName.length === 0)
                ) {
                    setUserNameError(null);
                }

                break;
            case 'email_address':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                if (password && password.length === 5) {
                    setPasswordError(null);
                }

                break;
            case 'passwordConfirm':
                setPasswordConfirm(e.target.value);

                break;
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocusedInput(event.target.name);
    };

    const handleBlur = () => {
        if (userName && userName.length < 2) {
            setUserNameError(
                "Le nom d'utilisateur doit comporter au moins 2 lettres",
            );
        }

        if (password && password.length < 6) {
            setPasswordError(
                "Le nom d'utilisateur doit comporter au moins 6 caractères",
            );
        }
        if (passwordConfirm && passwordConfirm.length < 6) {
            setPasswordConfirmError(
                "Le nom d'utilisateur doit comporter au moins 6 caractères",
            );
        }

        setFocusedInput(null);
    };

    return (
        <div className="register-page-container">
            <h1 className="register-page-title">Inscription</h1>
            <p className="register-page-indication">
                * Indique un champs obligatoire
            </p>
            <form
                className="register-form"
                // action="POST"
                onSubmit={handleSubmit}
            >
                <label className="form-label">
                    Nom
                    <input
                        className="form-input"
                        type="text"
                        name="last_name"
                        onChange={handleChangeInput}
                    />
                </label>
                <label className="form-label">
                    Prénom
                    <input
                        className="form-input"
                        type="text"
                        name="first_name"
                        onChange={handleChangeInput}
                    />
                </label>
                <label className="form-label">
                    Nom d'utilisateur *
                    <input
                        className="form-input"
                        type="text"
                        name="username"
                        onChange={handleChangeInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                    {userNameError && <div>{userNameError}</div>}
                </label>
                <label className="form-label">
                    Adresse mail *
                    <input
                        className="form-input"
                        type="email"
                        name="email_address"
                        onChange={handleChangeInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </label>
                <label className="form-label">
                    Mot de passe *
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        onChange={handleChangeInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                    {passwordError && <div>{passwordError}</div>}
                </label>
                <label className="form-label">
                    Entrez à nouveau <br />
                    le mot de passe *
                    <input
                        className="form-input"
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChangeInput}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                    {passwordConfirmError && <div>{passwordConfirmError}</div>}
                </label>
                {error && (
                    <div className="error-container">{error.message}</div>
                )}
                <button className="form-button">S'inscrire</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
