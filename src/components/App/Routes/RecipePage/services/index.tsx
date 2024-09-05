export async function fetchRecipe(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/Recipes/${id}`);
        console.log(id);

        if (!response.ok) {
            console.log('erreur dans la récupération de la recette');
            return;
        }

        const data = await response.json();
        console.log('then/success', data);

        return data;
    } catch (error) {
        console.log(error);
    }
}
