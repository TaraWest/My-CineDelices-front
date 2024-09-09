export interface IError {
    message: string;
}

export interface IValidation {
    isValid: boolean;
    message?: string;
}

export interface IForm {
    last_name: string;
    first_name: string;
    username: string;
    email_address: string;
    password: string;
    passwordConfirm: string;
    last_nameError: string;
    first_nameError: string;
    usernameError: string;
    email_addressError: string;
    passwordError: string;
    passwordConfirmError: string;
    errorOnSubmit: string;
    message: string;
}

export type TFormAction =
    | { type: 'SET_FIELD'; field: string; value: string }
    | { type: 'SET_ERROR'; field: string; error: string }
    | { type: 'RESET' };

export interface IDataForm {
    last_name: string | null;
    first_name: string | null;
    username: string;
    email_address: string;
    password: string;
}

export interface IInputRefs {
    usernameRef: React.MutableRefObject<HTMLInputElement | null>;
    emailRef: React.MutableRefObject<HTMLInputElement | null>;
    passwordRef: React.MutableRefObject<HTMLInputElement | null>;
    passwordConfirmRef: React.MutableRefObject<HTMLInputElement | null>;
}
