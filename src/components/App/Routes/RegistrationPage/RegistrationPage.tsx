import { useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.scss';
import { handleRegistration } from './services/handleRegistration';

import { Link } from 'react-router-dom';
import { formOnSubmitValidation } from './services/formValidation';
import { formReducer, initialState } from './services/FormReducer';
import InputComponent from './component/InputComponent';
import { IInputsForm } from './models';
import { getInputsForm } from './services/formFieldsConfig';
function RegistrationPage() {
    //Mise en place d'un reducer pour gérer l'ensemble des états liés au formulaire

    const [state, dispatch] = useReducer(formReducer, initialState);
    const inputsForm = getInputsForm(state);

    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch({
            type: 'SET_FIELD',
            field: event.target.name,
            value: event.target.value,
        });
    }

    const navigate = useNavigate();
    const inputFocusRef = useRef<HTMLInputElement | null>(null);

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
                navigate('/connexion');
            } else if (response.status === 400) {
                dispatch({
                    type: 'SET_ERROR',
                    field: 'errorOnSubmit',
                    error: "Problème lors de la soumission du formulaire, vérifiez que les données entrée respectent les conditions. L'adresse mail est peut être déjà utilisée",
                });
            } else if (response.status === 500) {
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

    console.log(state);

    return (
        <div className="register-page-container">
            <h1 className="my-2em pt-2em">Inscription</h1>
            <p className="mt-2em mb-0.5em text-center">
                * Indique un champs obligatoire
            </p>
            <form
                className=" flex flex-col items-center text-center mb-2em"
                onSubmit={handleSubmit}
            >
                {inputsForm.map((input: IInputsForm) => {
                    return (
                        <InputComponent
                            key={input.name}
                            input={input}
                            handleChangeInput={handleChangeInput}
                            password={state.password}
                            passwordConfirm={state.passwordConfirm}
                        ></InputComponent>
                    );
                })}

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
