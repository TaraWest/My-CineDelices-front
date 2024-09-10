import { useState } from 'react';
import './LoginPage.scss';
import { IError } from './models';
import { ILogin } from './models';
import { Link } from 'react-router-dom';
function LoginPage() {
    const [error, setError] = useState<IError | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Récupération des données du formulaire
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);

        // Destructuration pour avoir chaque propriété de data dans une constante
        const { email_address, password } = data;

        // Vérification des champs obligatoires
        if (!email_address || !password) {
            setError({
                message: 'Veuillez renseigner tous les champs obligatoires',
            });
            return;
        } else {
            // Remise à zéro du state error en cas de correction
            if (error) {
                setError(null);
            }
        }

        // Retypage des données pour correspondre à notre interface ILoginData
        function retypeFormData(data: { [key: string]: FormDataEntryValue }) {
            const typedData = {
                email_address: data.email_address as string,
                password: data.password as string,
            };
            return typedData;
        }
        const typedData = retypeFormData(data);

        // Envoie des données dans une fonction à part qui communique avec l'API.
        await handleLogin(typedData);
    }

    async function handleLogin(data: ILogin) {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Doit être ici, en dehors des headers
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);

            setError({
                message: 'Problème de serveur, veuillez réessayer plus tard',
            });
            throw new Error("Problème dans la connexion de l'utilisateur");
        }

        const message = await response.json();
        console.log(message);
    }

    return (
        <div className="login-page-container">
            <h1 className="login-page-title">Connexion</h1>
            <form className="login-form" onSubmit={handleSubmit}>
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
                {error && (
                    <div className="error-container">{error.message}</div>
                )}
                <button className="form-button">Se connecter</button>
            </form>
            <div className="flex flex-col items-center">
                <p>Pas encore inscrit?</p>
                <Link to="/inscription" className="my-1em">
                    Inscrivez vous!
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
