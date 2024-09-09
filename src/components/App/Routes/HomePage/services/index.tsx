import axios from 'axios';

export function fetchOneRandom() {
    return axios
        .get('http://localhost:3000/recipes/randomOne')
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
}
