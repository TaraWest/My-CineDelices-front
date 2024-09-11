import { IRecipe } from '../models';

export const getInputsRecipeForm = (data: IRecipe) => [
    {
        tag: 'input',
        label: 'Nom de la recette',
        name: 'name',
        type: 'text',
        value: data.name,
    },
    {
        tag: 'input',
        label: 'Temps de préparation (en minutes)',
        name: 'total_duration',
        type: 'number',
        // placeholder: 'En minutes',
        value: data.total_duration,
    },
    {
        tag: 'input',
        label: 'Image associée à la recette',
        name: 'picture',
        type: 'file',
        accept: 'images/*',
        // placeholder: '50MB max!',
    },
    {
        tag: 'select',
        label: 'Difficulté',
        name: 'difficulty',
        option: [{ name: 'Facile' }, { name: 'Moyen' }, { name: 'Difficile' }],
        value: data.difficulty,
    },
    {
        tag: 'select',
        label: 'Type de plat',
        name: 'DishType',
        option: [
            { id: '1', name: 'Boisson' },
            { id: '2', name: 'Plat' },
            { id: '3', name: 'Dessert' },
            { id: '4', name: 'Entrée' },
        ],
        value: data.DishType.name,
    },
    {
        tag: 'textarea',
        label: 'Anecdote',
        name: 'anecdote',
        value: data.anecdote,
    },
];
