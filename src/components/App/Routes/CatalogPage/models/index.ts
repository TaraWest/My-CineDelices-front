export interface Recipe {
    id: number;
    name: string;
    picture: string;
}

export interface Movie {
    id: number;
    name: string;
    picture: string;
}

export type Recipes = Recipe[];
export type Movies = Movie[];

// nom de la recette;
// nom du film;
// image du film;
// image de la recette;
// id;
