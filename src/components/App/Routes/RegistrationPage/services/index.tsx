import axiosPostInstance from './axiosInstance';
import { IDataForm } from '../models';

export function handleRegistration(data: IDataForm) {
    return axiosPostInstance
        .post('/register', data)
        .then((response) => {
            console.log(response);

            return response;
        })
        .catch((error) => {
            console.error("erreur lors de l'enregistrement", error);
            return error;
        });
}
