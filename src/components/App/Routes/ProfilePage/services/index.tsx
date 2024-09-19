import axios from 'axios';
import { toast } from 'react-toastify';
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
    try {
        const response = await axios.put(
            'http://localhost:3000/me',
            {
                // User data to update
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
        if (response.status === 204) {
            toast.success('Vos informations ont été mises à jour avec succès.');
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
        toast.error(
            'Une erreur est survenue lors de la récupération de vos données, veuillez revenir plus tard',
        );
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
        toast.error(
            'Une erreur est survenue lors de la suppression de votre recette',
        );
        console.error('Erreur lors de la suppression de la recette', error);
    }
}

export async function UpdatePassword(): Promise<any> {
    try {
        const response = await axios.put('');
    } catch (error) {}
}
