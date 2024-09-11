import axios from 'axios';
import { IUser } from '../models';

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
    try {
        const response = await axios.post('http://localhost:3000/users', {
            // On inclut les cookies dans la requête
            withCredentials: true,
            data: {
                last_name: userUpdateData.last_name,
                first_name: userUpdateData.first_name,
                username: userUpdateData.username,
                email_address: userUpdateData.email_address,
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            'Erreur lors de la récupération des données utilisateur',
            error,
        );
    }
}
