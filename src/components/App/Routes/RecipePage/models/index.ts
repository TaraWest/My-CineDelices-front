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

interface IDishType {
    id: number;
    name: string;
}

interface IMovie {
    id: number;
    name: string;
    picture: string;
    Category: ICategory;
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
    Movie: IMovie;
    DishType: IDishType;
    Preparations: IPreparation[];
    Ingredient: IIngredients[];
    User: IUser;
}

export interface Iquantity {
    numberPart: number | null;
    textPart: string | null;
}

export interface IIngredientsList {
    id: number;
    name: string;
    quantity: Iquantity | undefined;
}
