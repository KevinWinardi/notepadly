import { createContext } from "react";

type ThemeContextType = {
    theme: 'light' | 'dark',
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    setTheme: () => { },
});

