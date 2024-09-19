import React, { useState } from 'react';
import { UserInfoFormProps } from '../models';
import InputField from './InputField';
import UpdatePassword from './UpdatePassword';

const UserInfoForm: React.FC<UserInfoFormProps> = ({
    firstName,
    lastName,
    userName,
    email,
    editForm,
    onChange,
    onSubmit,
    setEditForm,
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!editForm) {
            // Active le mode édition si on n'est pas déjà en mode édition
            setEditForm(true);
        } else {
            // Si on est déjà en mode édition, soumettre le formulaire
            onSubmit(e as any); // Simule un événement de soumission
        }
    };
    const [seeUpdatePassword, setSeeUpdatePassword] = useState(false);

    function seeModal() {
        setSeeUpdatePassword(!seeUpdatePassword);
    }

    return (
        <form className="flex m-4 flex-col" onSubmit={onSubmit}>
            <InputField
                label="Prénom"
                type="text"
                name="first_name"
                value={firstName}
                onChange={onChange}
                disabled={!editForm}
            />
            <InputField
                label="Nom"
                type="text"
                name="last_name"
                value={lastName}
                onChange={onChange}
                disabled={!editForm}
            />
            <InputField
                label="Pseudo"
                type="text"
                name="username"
                value={userName}
                onChange={onChange}
                disabled={!editForm}
            />
            <InputField
                label="Email"
                type="email"
                name="email_adress"
                value={email}
                onChange={onChange}
                disabled={!editForm}
            />
            <button className="button-link" type="button" onClick={handleClick}>
                {editForm ? 'Enregistrer les modifications' : 'Modifier'}
            </button>
            <button className="button-link" type="button" onClick={seeModal}>
                Modifier mon mot de passe
            </button>
            {seeUpdatePassword && <UpdatePassword />}
        </form>
    );
};

export default UserInfoForm;
