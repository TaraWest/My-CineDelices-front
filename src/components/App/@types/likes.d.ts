import { ReactNode } from 'react';

export interface ILikesContext {
    userLikedIt: boolean;
    setUserLikedIt: React.Dispatch<React.SetStateAction<boolean>>;
    likesNumber: number;
    setLikesNumber: React.Dispatch<React.SetStateAction<number>>;
    recipeId: number | null;
    setRecipeId: React.Dispatch<React.SetStateAction<number | null>>;
    handleLikeRecipeButton: () => void;
}

export interface ILikesContextProviderType {
    children: ReactNode;
}
