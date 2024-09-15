import { createContext, useEffect, useState } from 'react';
import { ILikesContext, ILikesContextProviderType } from '../../@types/likes';
import {
    checkUserLikedIt,
    deleteOneLike,
    fetchLikesNumber,
    putOneLike,
} from '../services/LikesAPI';
import { useAuthContext } from '../Authentification/useAuthContext';

const defaultContext: ILikesContext = {
    userLikedIt: false,
    setUserLikedIt: () => {},
    handleLikeRecipeButton: () => {},
    likesNumber: 0,
    setLikesNumber: () => {},
    recipeId: null,
    setRecipeId: () => {},
};

export const LikesContext = createContext<ILikesContext>(defaultContext);

export const LikesProvider = ({ children }: ILikesContextProviderType) => {
    const [userLikedIt, setUserLikedIt] = useState<boolean>(false);
    const [likesNumber, setLikesNumber] = useState<number>(0);
    const { isAuth, userAuth } = useAuthContext();
    const [recipeId, setRecipeId] = useState<number | null>(null);

    const userId = userAuth?.id;

    function handleLikeRecipeButton() {
        console.log(!userLikedIt);

        if (!userLikedIt) {
            // décencher la fonction d'ajout de like
            console.log('action de like déclenchée');
            console.log(userLikedIt);

            if (isAuth && userId && recipeId) {
                putOneLike(recipeId, userId).then((result) => {
                    console.log(result);

                    if (result === 201) {
                        setUserLikedIt(true);
                        console.log(result);
                    }
                    return;
                });
            } else {
                console.log('il faut se connecter pour pouvoir liker!');
            }
        } else if (userLikedIt) {
            // déclencher la fonction pour enlever le like
            if (isAuth && userId && recipeId) {
                deleteOneLike(recipeId, userId).then((result) => {
                    console.log(result);

                    if (result === 204) {
                        setUserLikedIt(false);
                        console.log(userLikedIt);
                    }
                    return;
                });
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        console.log(userLikedIt);
        // Load the number of likes for this recipe after data fetched
        if (recipeId) {
            fetchLikesNumber(recipeId)
                .then((result) => {
                    setLikesNumber(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        // si le user a déjà liké la recette, setUserLikedIt sur true
        if (recipeId && userId) {
            checkUserLikedIt(recipeId, userId).then((result) => {
                console.log(result.userLikedIt);

                setUserLikedIt(result.userLikedIt);
            });
        }
    }, [recipeId, userLikedIt, userId]);

    return (
        <LikesContext.Provider
            value={{
                userLikedIt,
                setUserLikedIt,
                handleLikeRecipeButton,
                likesNumber,
                setLikesNumber,
                recipeId,
                setRecipeId,
            }}
        >
            {children}
        </LikesContext.Provider>
    );
};
