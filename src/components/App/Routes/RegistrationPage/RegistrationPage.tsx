import { useState } from 'react';
import './RegistrationPage.scss';
import { IDataForm, IError } from './RegistrationPageType';
function RegistrationPage() {
    const [error, setError] = useState<IError | null>(null);
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        console.log(event);

        event.preventDefault();
        console.log('soumission formulaire');
        const formData = new FormData(event.currentTarget);
        console.log(formData);

        const data = Object.fromEntries(formData);
        console.log(data);

        const { password, passwordVerification, username, email_address } =
            data;

        if (password !== passwordVerification) {
            setError({
                message:
                    'Les mots de passe ne correspondent pas. Veuillez vérifier que le mot de passe et la confirmation soient identiques.',
            });
            return;
        } else {
            if (error) {
                setError(null);
            }
        }

        if (!username || !email_address || !password || !passwordVerification) {
            setError({
                message: 'Veuillez renseigner tous les champs obligatoires',
            });
            console.log('erreur déclenchée');
            return;
        } else {
            if (error) {
                setError(null);
            }
        }

        handleRegistration(data);

        console.log(data);
    }

    async function handleRegistration(data: IDataForm) {
        console.log(data);
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
                        name="first_name"
                    />
                </label>
                <label className="form-label">
                    Prénom
                    <input
                        className="form-input"
                        type="text"
                        name="last_name"
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
