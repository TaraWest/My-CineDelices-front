export interface IMovie {
    id: number | null;
    name: string | null;
    picture: string | null;
    category_id: number | null;
}

export interface IUser {
    id: number | null;
}

export interface IRecipe {
    id: number | null;
    name: string | null;
    difficulty: string | null;
    picture: string | null;
    total_duration: number | null;
    anecdote: string | null;
    is_checked: boolean;
    movie: IMovie | null;
    user_id: IUser | null;
}
