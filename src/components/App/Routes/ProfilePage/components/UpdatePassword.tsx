import { useState } from 'react';
import { updatePassword } from '../services';
import InputField from './InputField';
import { toast } from 'react-toastify';

interface UpdatePasswordProps {
    seeModal: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ seeModal }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordUpdate = async () => {
        seeModal();
        console.log('first step');

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            console.log('password not the same');
            toast.error('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await updatePassword(
                oldPassword,
                newPassword,
                confirmPassword,
            );

            if (response && response.status === 204) {
                setError(''); // Clear error
                toast.success(
                    'Votre mot de passe a été mis à jour avec succès.',
                );
                console.log('user updated');
            } else if (response && response.status === 400) {
                toast.error('Mot de passe incorrect');
            } else if (response && response.status === 404) {
                toast.error('Utilisateur non trouvé.');
            } else {
                toast.error('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour du mot de passe', err);
            toast.error('Erreur lors de la mise à jour du mot de passe');
            seeModal(); // Close the modal
            console.log('error');
        }
    };

    return (
        <div className="fixed inset-0 p-8 flex flex-col bg-dark-red  items-center justify-center items-center z-50">
            <p>Modification du mot de passe</p>
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

            {error && <p className="text-red-500">{error}</p>}
            <div className="flex space-x-4">
                <button
                    onClick={handlePasswordUpdate}
                    className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] rounded-lg w-full md:w-32 h-12 flex items-center justify-center hover:bg-[#59041b]"
                >
                    Modifier
                </button>
                <button
                    onClick={seeModal}
                    className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] rounded-lg w-full md:w-32 h-12 flex items-center justify-center hover:bg-[#59041b]"
                >
                    Annuler
                </button>
            </div>
        </div>
    );
};

export default UpdatePassword;
