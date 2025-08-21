import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { getTheme, putTheme } from "../../utils/personalization";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(() => getTheme());

    useEffect(() => {
        putTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }
        }>
            {children}
        </ThemeContext.Provider>
    );
}
