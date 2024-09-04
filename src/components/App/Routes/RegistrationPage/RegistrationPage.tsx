import './RegistrationPage.scss';
function RegistrationPage() {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        console.log(event);

        event.preventDefault();
        console.log('soumission formulaire');
        const formData = new FormData(event.currentTarget);
        console.log(formData);

        const data = Object.fromEntries(formData);
const {password, password-verification} = data
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
                        name="email"
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
                        name="password-verification"
                        required
                    />
                </label>
                <button className="form-button">S'inscrire</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
