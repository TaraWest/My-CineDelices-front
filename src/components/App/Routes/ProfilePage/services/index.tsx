import axios from 'axios';

export function fetchUser() {
    axios
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
