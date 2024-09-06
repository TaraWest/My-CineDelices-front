import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss';
import { IError } from './models';
import { handleRegistration } from './services';
import {
    passwordValidation,
    isEmailEmpty,
    isUsernameEmpty,
    validateEmailFormat,
} from './services/fieldsValidation';
function RegistrationPage() {
    const [error, setError] = useState<IError | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('');

    const [userName, setUserName] = useState<string>('');
    const [userNameError, setUserNameError] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [passwordConfirmError, setPasswordConfirmError] =
        useState<string>('');

    const navigate = useNavigate();
    const inputFocusRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //On enpêche le comportement par défaut du bouton type submit
        event.preventDefault();

        //Vérification de la conformité entre le mot de passe et sa vérification, et affichage de l'erreur correspondante

        const validationResult = passwordValidation(
            password,
            passwordConfirm,
            passwordRef,
            passwordConfirmRef,
        );
        if (!validationResult.isValid && validationResult.message) {
            setError({ message: validationResult.message });
            return;
        } else {
            if (error) {
                setError(null);
            }
        }

        //Vérification des champs obligatoires à remplir, qui complète le 'required' des input concernés
        const usernameFieldValidationResult = isUsernameEmpty(
            userName,
            usernameRef,
        );
        if (
            !usernameFieldValidationResult.isValid &&
            usernameFieldValidationResult.message
        ) {
            setError({ message: usernameFieldValidationResult.message });
            return;
        } else {
            if (error) {
                setError(null);
            }
        }

        const emailFieldValidationResult = isEmailEmpty(email, emailRef);
        if (
            !emailFieldValidationResult.isValid &&
            emailFieldValidationResult.message
        ) {
            setError({ message: emailFieldValidationResult.message });
            return;
        } else {
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

        console.log(dataToSend);

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

                break;
            case 'email_address':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);

                break;
            case 'passwordConfirm':
                setPasswordConfirm(e.target.value);

                break;
        }
    };

    useEffect(() => {
        //Confirmation en temps réel des conditions du remplissage de l'input Nom d'utilisateur

        if (userName && userName.length === 1) {
            setUserNameError(
                "Le nom d'utilisateur doit comporter au moins 2 caractères",
            );
        } else {
            setUserNameError('');
        }

        //Confirmation en temps réel des conditions du remplissage de l'input email

        if (email && !validateEmailFormat(email)) {
            setEmailError("L'adresse mail doit avoir un format valide ");
        } else {
            setEmailError('');
        }

        //Confirmation en temps réel des conditions du remplissage de l'input password

        if (password && password.length > 0 && password.length < 6) {
            setPasswordError(
                'Le mot de passe doit comporter au moins 6 caractères',
            );
        } else {
            setPasswordError('');
        }

        //Confirmation en temps réel des conditions du remplissage de l'input de passwordConfirm

        if (
            passwordConfirm &&
            passwordConfirm.length > 0 &&
            password !== passwordConfirm
        ) {
            setPasswordConfirmError(
                'Les mots de passe doivent être identiques',
            );
        } else {
            setPasswordConfirmError('');
        }
    }, [password, passwordConfirm, userName, email]);

    //Focus sur l'input name au chargement de la page
    useEffect(() => {
        if (inputFocusRef.current) {
            inputFocusRef.current.focus();
        }
    }, []);

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
                        ref={inputFocusRef}
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
                        ref={usernameRef}
                        className="form-input"
                        type="text"
                        name="username"
                        onChange={handleChangeInput}
                        // onBlur={handleBlur}
                        required
                    />
                    {userNameError !== '' && <div>{userNameError}</div>}
                </label>
                <label className="form-label">
                    Adresse mail *
                    <input
                        ref={emailRef}
                        className="form-input"
                        type="email"
                        name="email_address"
                        onChange={handleChangeInput}
                        // onBlur={handleBlur}
                        required
                    />
                    {emailError !== '' && <div>{emailError}</div>}
                </label>
                <label className="form-label">
                    Mot de passe *
                    <input
                        ref={passwordRef}
                        className="form-input"
                        type="password"
                        name="password"
                        onChange={handleChangeInput}
                        // onBlur={handleBlur}
                        required
                    />
                    {passwordError !== '' && <div>{passwordError}</div>}
                </label>
                <label className="form-label">
                    Entrez à nouveau <br />
                    le mot de passe *
                    <input
                        ref={passwordConfirmRef}
                        className="form-input"
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChangeInput}
                        // onBlur={handleBlur}
                        required
                    />
                    {passwordConfirmError !== '' && (
                        <div>{passwordConfirmError}</div>
                    )}
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
