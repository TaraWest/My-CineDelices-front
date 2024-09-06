import axiosInstance from './axiosInstance';
import { IDataForm } from '../models';

export function handleRegistration(data: IDataForm) {
    return axiosInstance.post('/register', data).then((response) => {
        return response.data;
    });
}
