import { IForm, IInputsForm } from '../models';

export const getInputsRecipeForm = (state) => [
    {
        label: 'Nom de la recette',
        name: 'name',
        type: 'text',
        value: state,
    },
    {
        label: 'Image associée à la recette',
        name: 'picture',
        type: 'file',
        value: state,
    },
    {
        label: 'Temps de préparation',
        name: 'total_duration',
        type: 'number',
        placeholder: 'En minutes',
        value: state,
    },
    {
        label: 'type de plat ',
        name: 'email_address',
        type: 'email',
        value: state.email_address,
    },
    {
        label: 'Mot de Passe',
        name: 'password',
        type: 'password',
        value: state.password,
    },
    {
        label: 'Entrez à nouveau votre mot de passe',
        name: 'passwordConfirm',
        type: 'password',
        value: state.passwordConfirm,
    },
];
