import axios from 'axios';
import { IUser } from '../models';

export async function fetchUser() {
    await axios
        .get('http://localhost:3000/me', {
            // On inclut les cookies dans la requête
            withCredentials: true,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error(
                'Erreur lors de la récupération des données utilisateur',
                error,
            );
        });
}

export async function updateUser(userUpdateData: IUser) {
    await axios.post('', {
        // On inclut les cookies dans la requête
        withCredentials: true,
        data: {
            last_name: userUpdateData.last_name,
            first_name: userUpdateData.first_name,
            username: userUpdateData.username,
            email_address: userUpdateData.email_address,
        },
    });
}
