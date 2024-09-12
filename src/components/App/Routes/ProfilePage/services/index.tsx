import axios from 'axios';
import { IRecipe, IUser } from '../models';

export async function fetchUser() {
    try {
        const response = await axios.get('http://localhost:3000/me', {
            // On inclut les cookies dans la requête
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}

export async function updateUser(userUpdateData: IUser) {
    console.log('log dans la fonction update', userUpdateData);

    try {
        const response = await axios.put(
            'http://localhost:3000/me',
            {
                // User data to update
                id: userUpdateData.id,
                last_name: userUpdateData.last_name,
                first_name: userUpdateData.first_name,
                username: userUpdateData.username,
                email_address: userUpdateData.email_address,
            },
            {
                // include cookies
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}

export async function getUserRecipes() {
    try {
        const response = await axios.get('http://localhost:3000/user/recipes', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}
