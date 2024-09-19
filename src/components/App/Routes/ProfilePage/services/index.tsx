import { toast } from 'react-toastify';
import axios from 'axios';
import { IUser } from '../models';

export async function fetchUser() {
    try {
        const response = await axios.get('http://localhost:3000/me', {
            // cookies in the req
            withCredentials: true,
        });
        toast.success(response.data.message);
        // handle error with a toast
        if (response.status === 404) {
            toast.error('Utilisateur non trouvé.');
        } else if (response.status === 401) {
            toast.error("Vous n'êtes pas connecté. Veuillez vous connecter.");
        } else {
            // Other errors
            toast.error('Une erreur est survenue. Veuillez réessayer.');
        }
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
        if (response.status === 200) {
            toast.success(response.data.message);
        }
        // handle error with a toast
        else if (response.status === 404) {
            toast.error('Utilisateur non trouvé.');
        } else if (response.status === 500) {
            toast.error('Erreur interne du serveur.');
        } else {
            // Other errors
            toast.error('Une erreur est survenue. Veuillez réessayer.');
        }
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

export async function fetchDeleteRecipe(id: number): Promise<any> {
    try {
        const response = await axios.delete(
            `http://localhost:3000/recipes/${id}`,
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de la recette', error);
    }
}
