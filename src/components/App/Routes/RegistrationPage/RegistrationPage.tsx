import { useState } from 'react';
import './RegistrationPage.scss';
import { IDataForm, IError } from './models';
function RegistrationPage() {
    const [error, setError] = useState<IError | null>(null);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        //On enpêche le comportement par défaut du bouton type submit
        event.preventDefault();

        //On récupère les données du formulaire et on les stocke dans data
        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData);
        console.log(data);

        //Destructuration pour avoir chaque propriété de data dans une constante
        const { password, passwordVerification, username, email_address } =
            data;

        //Vérification de la conformité entre le mot de passe et sa vérification, et affichage de l'erreur correspondante
        if (password !== passwordVerification) {
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
        if (!username || !email_address || !password || !passwordVerification) {
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

        //Retypage des données du formulaire qui sont de type FormDataEntryValue en données
        function retypeFormData(data: { [key: string]: FormDataEntryValue }) {
            const typedData = {
                email_address: data.email_address as string,
                first_name: (data.first_name as string) || null,
                last_name: (data.last_name as string) || null,
                password: data.password as string,
                username: data.username as string,
            };
            return typedData;
        }
        const typedData = retypeFormData(data);

        //Envoie des données dans une fonction à part qui communique avec l'API.
        await handleRegistration(typedData);

        console.log(data);
        //Fin de la fonction handleSubmit
    }

    async function handleRegistration(data: IDataForm) {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);

            setError({
                message: 'Problème de serveur, veuillez réessayer plus tard',
            });
            throw new Error(
                "Problème dans l'inscription du nouvel utilisateur",
            );
        }
        const message = await response.json();
        console.log(message);
    }

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
                    />
                </label>
                <label className="form-label">
                    Prénom
                    <input
                        className="form-input"
                        type="text"
                        name="first_name"
                    />
                </label>
                <label className="form-label">
                    Nom d'utilisateur *
                    <input
                        className="form-input"
                        type="text"
                        required
                        name="username"
                    />
                </label>
                <label className="form-label">
                    Adresse mail *
                    <input
                        className="form-input"
                        type="email"
                        name="email_address"
                        required
                    />
                </label>
                <label className="form-label">
                    Mot de passe *
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        required
                    />
                </label>
                <label className="form-label">
                    Entrez à nouveau <br />
                    le mot de passe *
                    <input
                        className="form-input"
                        type="password"
                        name="passwordVerification"
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
