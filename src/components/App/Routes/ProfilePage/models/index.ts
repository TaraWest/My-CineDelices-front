export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email_address: string;
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
