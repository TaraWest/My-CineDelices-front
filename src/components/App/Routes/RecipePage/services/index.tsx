import axios from 'axios';

export function fetchRecipe(id: number) {
    return axios
        .get(`http://localhost:3000/Recipes/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
