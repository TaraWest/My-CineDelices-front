import axios from 'axios';
import { ICommentCard } from '../Model/type';

//Fetch les commentaires de la recette
export function fetchComments(
    recipeId: number,
): Promise<ICommentCard[] | null> {
    return axios
        .get(`http://localhost:3000/comment/${recipeId}`)
        .then((response) => {
            return response.data;
        });
}
