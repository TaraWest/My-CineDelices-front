import { useState } from 'react';
import { updateUser } from '../services';
import InputField from './InputField';

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Fonction pour mettre à jour les mots de passe
    const updatePassword = async () => {
        // Vérifie si les deux nouveaux mots de passe sont identiques
        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        // Si les mots de passe correspondent, lance la mise à jour
        try {
            const response = await updateUser({
                password: newPassword,
            });

            if (response.status === 204) {
                setError(''); // Réinitialiser l'erreur
                // Gérer la réussite de la mise à jour, par ex. afficher un toast
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour du mot de passe', err);
            setError('Erreur lors de la mise à jour du mot de passe');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <InputField
                label="Ancien mot de passe"
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={false}
            />
            <InputField
                label="Nouveau mot de passe"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={false}
            />
            <InputField
                label="Confirmer le nouveau mot de passe"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={false}
            />

            {/* Affiche le message d'erreur si nécessaire */}
            {error && <p className="text-red-500">{error}</p>}

            <button
                onClick={updatePassword}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] rounded-lg w-full md:w-32 h-12 flex items-center justify-center hover:bg-[#59041b]"
            >
                Modifier
            </button>
        </div>
    );
}

export default UpdatePassword;
