import { IForm, TFormAction } from '../models';

export function formRealTimeValidation(
    state: IForm,
    dispatch: React.Dispatch<TFormAction>,
): boolean {
    let isValid = true;

    if (
        (state.username.trim().length < 2 || state.username.trim() === '') &&
        state.username.trim().length > 0
    ) {
        dispatch({
            type: 'SET_ERROR',
            field: 'username',
            error: "Veuillez entrer un nom d'utilisateur d'au moins deux caractères",
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'username',
            error: '',
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        (!emailRegex.test(state.email_address) || state.email_address === '') &&
        state.email_address.length > 0
    ) {
        dispatch({
            type: 'SET_ERROR',
            field: 'email_address',
            error: 'Veuillez entrer une adresse mail valide',
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'email_address',
            error: '',
        });
    }
    if (
        (state.password.trim().length < 6 || state.password === '') &&
        state.password.length > 0
    ) {
        dispatch({
            type: 'SET_ERROR',
            field: 'password',
            error: "Veuillez entrer un mot de passe d'au moins six caractères",
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'password',
            error: '',
        });
    }
    if (
        state.passwordConfirm.length > 0 &&
        state.passwordConfirm !== state.password
    ) {
        dispatch({
            type: 'SET_ERROR',
            field: 'passwordConfirm',
            error: 'Veuillez entrer des mots de passe identiques',
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'passwordConfirm',
            error: '',
        });
    }
    console.log(isValid);

    return isValid;
}

export function formOnSubmitValidation(
    state: IForm,
    dispatch: React.Dispatch<TFormAction>,
): boolean {
    let isValid = true;

    if (state.username.trim().length < 2 || state.username.trim() === '') {
        dispatch({
            type: 'SET_ERROR',
            field: 'username',
            error: "Veuillez entrer un nom d'utilisateur d'au moins deux caractères",
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'username',
            error: '',
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(state.email_address) || state.email_address === '') {
        dispatch({
            type: 'SET_ERROR',
            field: 'email_address',
            error: 'Veuillez entrer une adresse mail valide',
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'email_address',
            error: '',
        });
    }
    if (state.password.trim().length < 6 || state.password === '') {
        dispatch({
            type: 'SET_ERROR',
            field: 'password',
            error: "Veuillez entrer un mot de passe d'au moins six caractères",
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'password',
            error: '',
        });
    }
    if (state.passwordConfirm !== state.password) {
        dispatch({
            type: 'SET_ERROR',
            field: 'passwordConfirm',
            error: 'Veuillez entrer des mots de passe identiques',
        });
        isValid = false;
    } else {
        dispatch({
            type: 'SET_ERROR',
            field: 'passwordConfirm',
            error: '',
        });
    }
    console.log(isValid);

    return isValid;
}
