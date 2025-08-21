import { useEffect, useState } from "react";
import { getLanguage, putLanguage } from "../../utils/personalization";
import i18next from "i18next";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState(() => getLanguage());

    useEffect(() => {
        putLanguage(language);
        i18next.changeLanguage(language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
