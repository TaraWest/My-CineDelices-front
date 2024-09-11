export const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'UPDATE_INGREDIENT':
            return {
                ...state,
                Ingredient: state.Ingredient.map((key, index) =>
                    index === action.index
                        ? { ...key, [action.field]: action.value }
                        : key,
                ),
            };
        case 'UPDATE_PREPARATION':
            return {
                ...state,
                Preparations: state.Preparations.map((key, index) =>
                    index === action.index
                        ? { ...key, [action.field]: action.value }
                        : key,
                ),
            };
        default:
            return state;
    }
};
