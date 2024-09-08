import { useEffect, useReducer, useRef /*useState*/ } from 'react';
// import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss';
// import { IError } from './models';
import { handleRegistration } from './services';
// import {
//     passwordValidation,
//     isEmailEmpty,
//     isUsernameEmpty,
// validateEmailFormat,
// } from './services/fieldsValidation';
import { Link } from 'react-router-dom';
import { IForm, TFormAction } from './models';
function RegistrationPage() {
    //Mise en place d'un reducer pour gérer l'ensemble des états liés au formulaire
    const initialState: IForm = {
        last_name: '',
        first_name: '',
        username: '',
        email_address: '',
        password: '',
        passwordConfirm: '',
        last_nameError: '',
        first_nameError: '',
        usernameError: '',
        email_addressError: '',
        passwordError: '',
        passwordConfirmError: '',
        errorOnSubmit: '',
        message: '',
    };

    const formReducer = (state: IForm, action: TFormAction) => {
        switch (action.type) {
            case 'SET_FIELD':
                return {
                    ...state,
                    [action.field]: action.value,
                };
            case 'SET_ERROR':
                return {
                    ...state,
                    [`${action.field}Error`]: action.error,
                };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(formReducer, initialState);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: 'SET_FIELD',
            field: event.target.name,
            value: event.target.value,
        });
        dispatch({
            type: 'SET_ERROR',
            field: event.target.name,
            error: '',
        });
    }

    // const [error, setError] = useState<IError | null>(null);
    // const [message, setMessage] = useState<string | null>(null);
    // const [lastName, setLastName] = useState<string>('');

    // const [firstName, setFirstName] = useState<string>('');

    // const [userName, setUserName] = useState<string>('');
    // const [userNameError, setUserNameError] = useState<string>('');

    // const [email, setEmail] = useState<string>('');
    // const [emailError, setEmailError] = useState<string>('');

    // const [password, setPassword] = useState<string>('');
    // const [passwordError, setPasswordError] = useState<string>('');

    // const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    // const [passwordConfirmError, setPasswordConfirmError] =
    //     useState<string>('');

    // const navigate = useNavigate();
    const inputFocusRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //On enpêche le comportement par défaut du bouton type submit
        event.preventDefault();

        //Vérification de la conformité entre le mot de passe et sa vérification, et affichage de l'erreur correspondante

        // const validationResult = passwordValidation(
        //     password,
        //     passwordConfirm,
        //     passwordRef,
        //     passwordConfirmRef,
        // );
        // if (!validationResult.isValid && validationResult.message) {
        //     setError({ message: validationResult.message });
        //     return;
        // } else {
        //     if (error) {
        //         setError(null);
        //     }
        // }

        //Vérification des champs obligatoires à remplir, qui complète le 'required' des input concernés
        // const usernameFieldValidationResult = isUsernameEmpty(
        //     userName,
        //     usernameRef,
        // );
        // if (
        // !usernameFieldValidationResult.isValid &&
        //     usernameFieldValidationResult.message
        // ) {
        //     setError({ message: usernameFieldValidationResult.message });
        //     return;
        // } else {
        //     if (error) {
        //         setError(null);
        //     }
        // }

        // const emailFieldValidationResult = isEmailEmpty(email, emailRef);
        // if (
        //     !emailFieldValidationResult.isValid &&
        //     emailFieldValidationResult.message
        // ) {
        //     setError({ message: emailFieldValidationResult.message });
        //     return;
        // } else {
        //     if (error) {
        //         setError(null);
        //     }
        // }

        //Envoie des données dans une fonction à part qui communique avec l'API.
        const dataToSend = {
            first_name: state.first_name,
            last_name: state.last_name,
            username: state.username,
            email_address: state.email_address,
            password: state.password,
        };

        console.log(dataToSend);

        if (formValidation()) {
            const response = await handleRegistration(dataToSend);
            console.log(response);
        } else {
            console.log(state.usernameError);
            console.log(state.email_addressError);
            console.log(state.passwordError);
            console.log(state.passwordConfirmError);
        }

        // if (response.status === 201) {
        //     setMessage(response.data.message);
        //     console.log(message);

        //     navigate('/');
        // }
        // {
        //     setError({
        //         message:
        //             "Problème lors de l'inscription, vérifiez le remplissage des données",
        //     });
        // }

        console.log(dataToSend);
        //Fin de la fonction handleSubmit
    }
    // Fonction de validation des conditions du formulaire
    function formValidation(): boolean {
        let isValid = true;

        if (state.username.trim().length < 2 || state.username.trim() === '') {
            dispatch({
                type: 'SET_ERROR',
                field: 'username',
                error: "Veuillez entrer un nom d'utilisateur d'au moins deux caractères",
            });
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailRegex.test(state.email_address) ||
            state.email_address === ''
        ) {
            dispatch({
                type: 'SET_ERROR',
                field: 'email_address',
                error: 'Veuillez entrer une adresse mail valide',
            });
            isValid = false;
        }
        if (state.password.trim().length < 6 || state.password === '') {
            dispatch({
                type: 'SET_ERROR',
                field: 'password',
                error: "Veuillez entrer un mot de passe d'au moins six caractères",
            });
            isValid = false;
        }
        if (
            state.passwordConfirm !== state.password ||
            state.passwordConfirm === ''
        ) {
            dispatch({
                type: 'SET_ERROR',
                field: 'passwordConfirm',
                error: 'Veuillez entrer des mots de passe identiques',
            });
            isValid = false;
        }
        console.log(isValid);

        return isValid;
    }

    // Gestion des champs controlés
    // const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     switch (e.target.name) {
    //         case 'last_name':
    //             setLastName(e.target.value);

    //             break;
    //         case 'first_name':
    //             setFirstName(e.target.value);

    //             break;
    //         case 'username':
    //             setUserName(e.target.value);

    //             break;
    //         case 'email_address':
    //             setEmail(e.target.value);
    //             break;
    //         case 'password':
    //             setPassword(e.target.value);

    //             break;
    //         case 'passwordConfirm':
    //             setPasswordConfirm(e.target.value);

    //             break;
    //     }
    // };

    // useEffect(() => {
    //     //Confirmation en temps réel des conditions du remplissage de l'input Nom d'utilisateur

    //     if (userName && userName.length === 1) {
    //         setUserNameError(
    //             "Le nom d'utilisateur doit comporter au moins 2 caractères",
    //         );
    //     } else {
    //         setUserNameError('');
    //     }

    //     //Confirmation en temps réel des conditions du remplissage de l'input email

    //     if (email && !validateEmailFormat(email)) {
    //         setEmailError("L'adresse mail doit avoir un format valide ");
    //     } else {
    //         setEmailError('');
    //     }

    //     //Confirmation en temps réel des conditions du remplissage de l'input password

    //     if (password && password.length > 0 && password.length < 6) {
    //         setPasswordError(
    //             'Le mot de passe doit comporter au moins 6 caractères',
    //         );
    //     } else {
    //         setPasswordError('');
    //     }

    //     //Confirmation en temps réel des conditions du remplissage de l'input de passwordConfirm

    //     if (
    //         passwordConfirm &&
    //         passwordConfirm.length > 0 &&
    //         password !== passwordConfirm
    //     ) {
    //         setPasswordConfirmError(
    //             'Les mots de passe doivent être identiques',
    //         );
    //     } else {
    //         setPasswordConfirmError('');
    //     }
    // }, [password, passwordConfirm, userName, email]);

    //Focus sur l'input name au chargement de la page
    useEffect(() => {
        if (inputFocusRef.current) {
            inputFocusRef.current.focus();
        }
    }, []);

    return (
        <div className="register-page-container">
            <h1 className="my-2em pt-2em">Inscription</h1>
            <p className="mt-2em mb-0.5em text-center">
                * Indique un champs obligatoire
            </p>
            <form
                className="mb-2em flex flex-col items-center text-center gap-2em"
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
                        value={state.last_name}
                    />
                </label>
                <label className="form-label">
                    Prénom
                    <input
                        className="form-input"
                        type="text"
                        name="first_name"
                        onChange={handleChangeInput}
                        value={state.first_name}
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
                        value={state.username}
                        // onBlur={handleBlur}
                        required
                    />
                    {state.usernameError !== '' && (
                        <div>{state.usernameError}</div>
                    )}
                </label>
                <label className="form-label">
                    Adresse mail *
                    <input
                        ref={emailRef}
                        className="form-input"
                        type="email"
                        name="email_address"
                        onChange={handleChangeInput}
                        value={state.email_address}
                        // onBlur={handleBlur}
                        required
                    />
                    {state.email_addressError !== '' && (
                        <div>{state.email_addressError}</div>
                    )}
                </label>
                <label className="form-label">
                    Mot de passe *
                    <input
                        ref={passwordRef}
                        className="form-input"
                        type="password"
                        name="password"
                        onChange={handleChangeInput}
                        value={state.password}
                        // onBlur={handleBlur}
                        required
                    />
                    {state.passwordError !== '' && (
                        <div>{state.passwordError}</div>
                    )}
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
                        value={state.passwordConfirm}
                        // onBlur={handleBlur}
                        required
                    />
                    {state.passwordConfirmError !== '' && (
                        <div>{state.passwordConfirmError}</div>
                    )}
                </label>
                {state.errorOnSubmit && (
                    <div className="w-4/5 text-center">
                        {state.errorOnSubmit}
                    </div>
                )}
                <button className="form-button">S'inscrire</button>
            </form>
            <div className="flex flex-col items-center">
                <p>Déjà inscrit?</p>
                <Link to="/connexion" className="my-1em">
                    connectez vous!
                </Link>
            </div>
        </div>
    );
}

export default RegistrationPage;
