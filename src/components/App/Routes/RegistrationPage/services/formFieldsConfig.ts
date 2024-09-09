import { IForm, IInputsForm } from '../models';

export const getInputsForm = (state: IForm): IInputsForm[] => [
    {
        label: 'Nom',
        name: 'last_name',
        type: 'text',
        value: state.last_name,
        required: false,
    },
    {
        label: 'Prénom',
        name: 'first_name',
        type: 'text',
        value: state.first_name,
        required: false,
    },
    {
        label: "Nom d'Utilisateur",
        name: 'username',
        type: 'text',
        value: state.username,
        required: true,
    },
    {
        label: 'Adresse Email',
        name: 'email_address',
        type: 'email',
        value: state.email_address,
        required: true,
    },
    {
        label: 'Mot de Passe',
        name: 'password',
        type: 'password',
        value: state.password,
        required: true,
    },
    {
        label: 'Entrez à nouveau votre mot de passe',
        name: 'passwordConfirm',
        type: 'password',
        value: state.passwordConfirm,
        required: true,
    },
];
