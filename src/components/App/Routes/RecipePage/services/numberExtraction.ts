export function extractNumber(text: string) {
    const match = text.match(/^(\d+)?(.*)$/);
    if (match) {
        const numberPart = match[1] ? parseInt(match[1], 10) : null;
        const textPart = match[2].trim();

        if (numberPart !== null && textPart) {
            return { numberPart, textPart }; // Cas nombre + texte
        } else if (numberPart !== null) {
            return numberPart; // Cas uniquement nombre
        } else {
            return textPart; // Cas uniquement texte
        }
    }
}
