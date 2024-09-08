import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss';
import { handleRegistration } from './services';

import { Link } from 'react-router-dom';
import {
    formRealTimeValidation,
    formOnSubmitValidation,
} from './services/formValidation';
import { formReducer, initialState } from './services/FormReducer';
function RegistrationPage() {
    //Mise en place d'un reducer pour gérer l'ensemble des états liés au formulaire

    const [state, dispatch] = useReducer(formReducer, initialState);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: 'SET_FIELD',
            field: event.target.name,
            value: event.target.value,
        });
    }

    const navigate = useNavigate();
    const inputFocusRef = useRef<HTMLInputElement | null>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //On enpêche le comportement par défaut du bouton type submit
        event.preventDefault();

        if (!formOnSubmitValidation(state, dispatch)) {
            return;
        }

        //Envoie des données dans une fonction à part qui communique avec l'API.
        const dataToSend = {
            first_name: state.first_name,
            last_name: state.last_name,
            username: state.username,
            email_address: state.email_address,
            password: state.password,
        };

        console.log(dataToSend);

        try {
            const response = await handleRegistration(dataToSend);
            console.log(response.status);
            if (response.status === 201) {
                dispatch({
                    type: 'SET_FIELD',
                    field: 'message',
                    value: 'Inscription réussie, connectez vous!',
                });
                navigate('/');
            } else if (response.status === 400) {
                dispatch({
                    type: 'SET_ERROR',
                    field: 'errorOnSubmit',
                    error: "Problème lors de la soumission du formulaire, vérifiez que les données entrée respectent les conditions. L'adresse mail est peut être déjà utilisée",
                });
            } else if (response.status === 500) {
                console.log('bien arrivé ici');

                dispatch({
                    type: 'SET_FIELD',
                    field: 'errorOnSubmit',
                    value: 'Problème dans le traitement du formulaire, rééssayez un peu plus tard.',
                });
            }
        } catch (error) {
            console.log('Erreur lors de la soumission du formulaire', error);
            dispatch({
                type: 'SET_FIELD',
                field: 'errorOnSubmit',
                value: 'Problème lors de la soumission du formulaire, rééssayez un peu plus tard.',
            });
        }

        //Fin de la fonction handleSubmit
    }

    //Focus sur l'input name au chargement de la page
    useEffect(() => {
        if (inputFocusRef.current) {
            inputFocusRef.current.focus();
        }
    }, []);

    //Vérification des entrées de chaque input en temps réel, et affichage des conditions de remplissage en temps réel jusqu'à ce que les conditions soient remplies et uniquement si un caractère a été entré
    //J'ignore l'avertissement de ESLint qui me fait tomber dans une boucle infinie même avec un useCallBack. Mes variables ne changeront pas.
    useEffect(() => {
        formRealTimeValidation(state, dispatch);
    }, [
        state.email_address,
        state.username,
        state.password,
        state.passwordConfirm,
    ]);
    console.log(state.errorOnSubmit);

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
                </label>
                {state.usernameError !== '' && <div>{state.usernameError}</div>}
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
                </label>
                {state.email_addressError !== '' && (
                    <div>{state.email_addressError}</div>
                )}
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
                </label>
                {state.passwordError !== '' && <div>{state.passwordError}</div>}
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
                </label>
                {state.passwordConfirmError !== '' && (
                    <div>{state.passwordConfirmError}</div>
                )}
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
