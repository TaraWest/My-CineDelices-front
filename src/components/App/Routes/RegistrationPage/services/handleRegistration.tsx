import { axiosLoggedPostInstance } from '../../../services/generalAxiosInstance';
import { IDataForm } from '../models';

export function handleRegistration(data: IDataForm) {
    return axiosLoggedPostInstance
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
