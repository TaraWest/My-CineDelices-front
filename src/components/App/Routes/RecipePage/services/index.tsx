import axiosGetInstance from './axiosInstance';
import { IRecipe } from '../models';

export function fetchRecipe(id: number): Promise<IRecipe | { error: string }> {
    return axiosGetInstance
        .get(`/Recipes/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return {
                error:
                    error.message ||
                    'Une erreur est survenue lors du chargement de la recette',
            };
        });
}
