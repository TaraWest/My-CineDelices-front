interface IIngredients {
    id: number;
    name: string;
    quantity: string;
}

interface IPreparation {
    id: number;
    description: string;
    step_position: number;
}

interface IType {
    id: number;
    name: string;
}

interface IMovie {
    id: number;
    name: string;
    picture: string;
    category: ICategory;
}

interface ICategory {
    id: number;
    name: string;
}

interface IUser {
    id: number;
    username: string;
}

export interface IRecipe {
    id: number;
    name: string;
    picture: string | undefined;
    total_duration: number;
    anecdote: string | null;
    difficulty: string;
    is_checked: boolean;
    movie: IMovie;
    type: IType;
    preparation: IPreparation[];
    ingredients: IIngredients[];
    user: IUser;
}
