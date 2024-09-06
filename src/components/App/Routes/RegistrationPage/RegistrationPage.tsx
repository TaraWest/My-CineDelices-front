import { useState } from 'react';
import './RegistrationPage.scss';
import { IError } from './models';
import { handleRegistration } from './services';
import { useNavigate } from 'react-router-dom';
function RegistrationPage() {
    const [error, setError] = useState<IError | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);

    const navigate = useNavigate();
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //On enpêche le comportement par défaut du bouton type submit
        event.preventDefault();

        // //On récupère les données du formulaire et on les stocke dans data
        // const formData = new FormData(event.currentTarget);

        // const data = Object.fromEntries(formData);
        // console.log(data);

        // //Destructuration pour avoir chaque propriété de data dans une constante
        // const { password, passwordConfirm, username, email_address } = data;

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

        // //Retypage des données du formulaire qui sont de type FormDataEntryValue en données
        // function retypeFormData(data: { [key: string]: FormDataEntryValue }) {
        //     const typedData = {
        //         email_address: data.email_address as string,
        //         first_name: (data.first_name as string) || null,
        //         last_name: (data.last_name as string) || null,
        //         password: data.password as string,
        //         username: data.username as string,
        //     };
        //     return typedData;
        // }
        // const typedData = retypeFormData(data);

        //Envoie des données dans une fonction à part qui communique avec l'API.
        const dataToSend = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            email_address: email,
            password,
        };
        handleRegistration(dataToSend);

        navigate('/');

        console.log(dataToSend);
        //Fin de la fonction handleSubmit
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e?.target.name) {
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
                        required
                    />
                </label>
                <label className="form-label">
                    Adresse mail *
                    <input
                        className="form-input"
                        type="email"
                        name="email_address"
                        onChange={handleChangeInput}
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
                        required
                    />
                </label>
                <label className="form-label">
                    Entrez à nouveau <br />
                    le mot de passe *
                    <input
                        className="form-input"
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChangeInput}
                        required
                    />
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
