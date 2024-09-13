import axios from 'axios';
import { IUserAuth } from '../../@types/authenticate';

export function getUserData(): Promise<IUserAuth | null> {
    return axios
        .get('http://localhost:3000/me', {
            withCredentials: true,
        })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            return error;
        });
    //End of checkAuth
}
