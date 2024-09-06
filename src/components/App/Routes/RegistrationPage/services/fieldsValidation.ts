import { IValidation } from '../models';

export function passwordValidation(
    password: string,
    passwordConfirm: string,
    passwordRef: React.RefObject<HTMLInputElement | null>,
    passwordConfirmRef: React.RefObject<HTMLInputElement | null>,
): IValidation {
    if (!password || !passwordConfirm) {
        if (passwordRef.current !== null) {
            passwordRef.current.style.border = '4px solid orange';
        }
        if (passwordConfirmRef.current !== null) {
            passwordConfirmRef.current.style.border = '4px solid orange';
        }
        return {
            isValid: false,
            message: 'Veuillez renseigner tous les champs obligatoires',
        };
    }
    if (password !== passwordConfirm) {
        if (passwordRef.current !== null) {
            passwordRef.current.style.border = '4px solid orange';
        }
        if (passwordConfirmRef.current !== null) {
            passwordConfirmRef.current.style.border = '4px solid orange';
        }
        return {
            isValid: false,
            message:
                'Les mots de passe ne correspondent pas. Veuillez vérifier que le mot de passe et la confirmation soient identiques.',
        };
    } else {
        //Remise à zéro du state error en cas de correction

        if (passwordRef.current !== null) {
            passwordRef.current.style.border = '';
        }
        if (passwordConfirmRef.current !== null) {
            passwordConfirmRef.current.style.border = '';
        }
        return { isValid: true };
    }
}

export function isUsernameEmpty(
    userName: string,
    usernameRef: React.RefObject<HTMLInputElement | null>,
): IValidation {
    if (!userName) {
        if (usernameRef.current !== null) {
            usernameRef.current.style.border = '4px solid orange';
        }

        return {
            isValid: false,
            message: 'Veuillez renseigner tous les champs obligatoires',
        };
    } else {
        if (usernameRef.current !== null) {
            usernameRef.current.style.border = '';
        }

        return { isValid: true };
    }
}

export function isEmailEmpty(
    email: string,
    emailRef: React.RefObject<HTMLInputElement | null>,
): IValidation {
    if (!email) {
        if (emailRef.current !== null) {
            emailRef.current.style.border = '4px solid orange';
        }
        return {
            isValid: false,
            message: 'Veuillez renseigner tous les champs obligatoires',
        };
    } else if (email && validateEmailFormat(email)) {
        if (emailRef.current !== null) {
            emailRef.current.style.border = '';
        }

        return { isValid: true };
    } else {
        return {
            isValid: false,
            message: "Problème dans le format de l'adresse mail",
        };
    }
}

export function validateEmailFormat(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
