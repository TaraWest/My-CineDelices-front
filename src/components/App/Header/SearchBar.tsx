import { useState, useEffect } from 'react';
import './header.scss';
import { Recipe } from '../Routes/CatalogPage/models';
import { useNavigate } from 'react-router-dom';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';

const fetchRecipes = async () => {
    try {
        const response = await fetch('http://localhost:3000/recipes');
        const data = await response.json();
        return data.map((item: { id: string; name: string }) => ({
            id: item.id,
            name: item.name,
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};
// component SearchBar
const SearchBar: React.FC = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<Recipe[]>([]);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    //Permet de naviguer vers d'autres pages
    const navigate = useNavigate();
    // Récupération des recettes
    useEffect(() => {
        const fetchAndSetRecipes = async () => {
            const recipes = await fetchRecipes();
            setAllRecipes(recipes);
        };

        fetchAndSetRecipes();
    }, []);
    // Gestion de la récupération des suggestions basées sur la valeur entrée
    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        const filteredSuggestions = allRecipes.filter((recipe) =>
            recipe.name.toLowerCase().startsWith(value.toLowerCase()),
        );
        setSuggestions(filteredSuggestions);
    };

    // Gestion de la sélection d'une suggestion
    const onSuggestionSelected = (
        _: React.FormEvent<HTMLInputElement>,
        data: SuggestionSelectedEventData<Recipe>,
    ) => {
        setValue(data.suggestion.name);
        navigate(`/recette/${data.suggestion.id}`);
    };

    // Gestion de l'event pour aller sur la page de la recette
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const selectedRecipe = allRecipes.find(
                (recipe) => recipe.name.toLowerCase() === value.toLowerCase(),
            );
            if (selectedRecipe) {
                navigate(`/recipes/${selectedRecipe.id}`);
            }
        }
    };
    // Propriétés pour l'input de la barre de recherche
    const inputProps: Autosuggest.InputProps<Recipe> = {
        placeholder: 'Ratatouille',
        value,
        onChange: (
            _: React.FormEvent<HTMLElement>,
            { newValue }: Autosuggest.ChangeEvent,
        ) => {
            setValue(newValue);
        },
        onKeyDown: handleKeyDown,
    };

    return (
        <Autosuggest
            //Un tableau d'objets Recipe qui représente les suggestions à afficher
            suggestions={suggestions}
            // Fonction appelée lorsque Autosuggest demande des suggestions
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={onSuggestionSelected}
            //Fonction qui retourne la valeur de la suggestion. Ici, elle retourne le nom de la recette pour qu'il soit utilisé comme texte dans l'input.
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
            inputProps={inputProps}
        />
    );
};
export default SearchBar;
