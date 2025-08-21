import { getLanguage } from "./personalization";

export function showFormattedDate(date: string) {
    const options: object = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString(`${getLanguage()}-${getLanguage().toUpperCase()}`, options);
};