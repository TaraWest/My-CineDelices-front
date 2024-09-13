//contexte authentification ici

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { ILogin } from '../Routes/LoginPage/models';
import {
    IAuthenticateContext,
    IAuthenticateContextProviderType,
    IUserAuth,
} from '../@types/authenticate';
import { useNavigate } from 'react-router-dom';

const defaultAuth: IUserAuth = {
    first_name: null,
    last_name: null,
    username: null,
    email_address: null,
};

const defaultContext: IAuthenticateContext = {
    userAuth: defaultAuth,
    setUserAuth: () => {},
    isAuth: false,
    setIsAuth: () => {},
    handleLogin: async () => {},
    handleLogout: async () => {},
};

export const AuthenticateContext =
    createContext<IAuthenticateContext>(defaultContext);

// state
export const AuthProvider = ({
    children,
}: IAuthenticateContextProviderType) => {
    const [userAuth, setUserAuth] = useState<IUserAuth | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [getData, setGetData] = useState<boolean>(false);

    const navigate = useNavigate();
    //  Check if user is authitified in a loading or reloading of a page
    useEffect(() => {
        function getUserData() {
            return axios
                .get('http://localhost:3000/me', {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.status === 200) {
                        setIsAuth(true);
                        setUserAuth(response.data);
                        return true;
                    }
                })
                .catch((error) => {
                    setUserAuth(null);
                    setIsAuth(false);
                    return error;
                });
            //End of checkAuth
        }
        if (getData) {
            getUserData();
        }
    }, [getData]);

    // set the isAuth state true

    async function handleLogin(data: ILogin) {
        return axios
            .post('http://localhost:3000/login', data, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            .then((response) => {
                if (response.status !== 200) {
                    return response.data;
                }
                setIsAuth(true);
                setGetData(true);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                navigate('/catalogue');
            });

        //End of handeLogin
    }

    /* logout */

    async function handleLogout(): Promise<void> {
        return axios
            .post(
                'http://localhost:3000/logout',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )
            .then((response) => {
                if (response.status === 200) {
                    setUserAuth(null);
                    return response.data;
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                navigate('/');
            });
    }

    return (
        <AuthenticateContext.Provider
            value={{
                userAuth,
                setUserAuth,
                handleLogin,
                handleLogout,
                isAuth,
                setIsAuth,
            }}
        >
            {children}
        </AuthenticateContext.Provider>
    );
};
