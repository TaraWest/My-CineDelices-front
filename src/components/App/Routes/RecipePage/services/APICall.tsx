import axios from 'axios';
import {
    axiosGetInstance,
    axiosLoggedGetInstance,
    axiosLoggedPostInstance,
} from '../../../services/generalAxiosInstance';
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

export function fetchLikesNumber(id: number): Promise<number> {
    return axiosGetInstance
        .get(`/likes/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function putOneLike(recipeId: number, userId: number) {
    console.log('putOneLike déclenchée');

    return axiosLoggedPostInstance
        .post(`/likes/${recipeId}`, { userId: userId })
        .then((response) => {
            // console.log(response.status);

            return response.status;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function deleteOneLike(recipeId: number, userId: number) {
    console.log('deleteOneLike déclenchée');

    return axios
        .delete(`http://localhost:3000/likes/${recipeId}/${userId}`, {
            withCredentials: true,
        })
        .then((response) => {
            // console.log(response.status);

            return response.status;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function checkUserLikedIt(
    recipeId: number,
    userId: number,
): Promise<{ userLikedIt: boolean }> {
    return axiosLoggedGetInstance
        .get(`/likes/${recipeId}/${userId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
