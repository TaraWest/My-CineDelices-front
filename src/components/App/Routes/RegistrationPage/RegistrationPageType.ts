export interface IError {
    message: string;
}

export interface IDataForm {
    email_address: string;
    first_name: string | null;
    last_name: string | null;
    password: string;
    username: string;
}
