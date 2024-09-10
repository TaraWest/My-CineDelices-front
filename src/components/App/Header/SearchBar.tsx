/*import { useState } from 'react';
import Select from 'react-select';
import './header.scss';

// Composant SearchBar
const SearchBar: React.FC = () => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>(
        [],
    );
    const [selectedOption, setSelectedOption] = useState(null);

    // Fonction pour chercher les options depuis l'API
    const fetchOptions = async (inputValue: string) => {
        if (!inputValue) return [];
        try {
            const response = await fetch(`/api/search?q=${inputValue}`);
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

    return (
        <div className="searchbar">
            <Select
                options={options}
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                onInputChange={handleInputChange}
                placeholder="Search for a fruit..."
                className="basic-single"
                classNamePrefix="select"
                isClearable
            />
        </div>
    );
};

export default SearchBar;*/
