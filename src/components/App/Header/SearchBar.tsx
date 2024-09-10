import { useState, useEffect } from 'react';
import './header.scss';
import Autosuggest from 'react-autosuggest';
import { Recipe } from '../Routes/CatalogPage/models';
import { useNavigate } from 'react-router-dom';

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

/* Composant SearchBar
/* variable d'état options qui est un tableau d'objets, chacun ayant les propriétés value et label de type chaîne de caractères. setOptions est la fonction qui permet de modifier ce tableau d'options.*/
const SearchBar: React.FC = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<Recipe[]>([]);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetRecipes = async () => {
            const recipes = await fetchRecipes();
            setAllRecipes(recipes);
        };

        fetchAndSetRecipes();
    }, []);

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        const filteredSuggestions = allRecipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(value.toLowerCase()),
        );
        setSuggestions(filteredSuggestions);
    };

    const onSuggestionSelected = (
        event: React.SyntheticEvent,
        { suggestion }: { suggestion: Recipe },
    ) => {
        setValue(suggestion.name);
        navigate(`/recette/${suggestion.id}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const selectedRecipe = allRecipes.find(
                (recipe) => recipe.name.toLowerCase() === value.toLowerCase(),
            );
            if (selectedRecipe) {
                navigate(`/recipes/${selectedRecipe.id}`); // Redirection lorsque "Enter" est pressé
            }
        }
    };

    const inputProps = {
        placeholder: 'Ratatouille',
        value,
        onChange: (
            event: React.ChangeEvent<HTMLInputElement>,
            { newValue }: { newValue: string },
        ) => setValue(newValue),
        onKeyDown: handleKeyDown, // Gérer l'appui sur "Enter"
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
            inputProps={inputProps}
        />
    );
};
export default SearchBar;
