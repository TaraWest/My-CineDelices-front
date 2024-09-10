import { useState } from 'react';
import './header.scss';

interface Recipes {
    value: string;
    label: string;
}

// Composant SearchBar
/* variable d'état options qui est un tableau d'objets, chacun ayant les propriétés value et label de type chaîne de caractères. setOptions est la fonction qui permet de modifier ce tableau d'options.*/
const SearchBar: React.FC = () => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>(
        [],
    );
    // l'option selectionné par l'utilisateur
    const [selectedOption, setSelectedOption] = useState(null);

    // Fonction pour chercher les options depuis l'API
    const fetchOptions = async (inputValue: string) => {
        if (!inputValue) return [];
        try {
            const response = await fetch(
                `http://localhost:3000/recipes=${inputValue}`,
            );
            const data = await response.json();
            // Transformer les résultats en format compatible avec react-select
            return data.map((item: { name: string }) => ({
                value: item.name,
                label: item.name,
            }));
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            return [];
        }
    };

    // Fonction qui est déclenchée lorsqu'on tape dans la barre de recherche
    const handleInputChange = async (inputValue: string) => {
        const newOptions = await fetchOptions(inputValue);
        setOptions(newOptions);
    };

    const handleChange = (selectedOption: Recipes | null) => {
        setSelectedOption(selectedOption);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            onInputChange={handleInputChange}
            options={options}
            placeholder="Search for a recipe..."
            isClearable
            isSearchable
        />
    );
};

export default SearchBar;
