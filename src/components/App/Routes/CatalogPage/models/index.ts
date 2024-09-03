export interface Recipe {
    id: number;
    name: string;
    picture: string;
    movie_id: number | null;
}

export interface Movie {
    id: number;
    name: string;
    picture: string;
}

export type Recipes = Recipe[];
export type Movies = Movie[];
