import { createContext } from "react";

type LanguageContextType = {
    language: 'en' | 'id',
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'id'>>,
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
})

