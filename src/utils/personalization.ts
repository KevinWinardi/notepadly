function getTheme(): 'light' | 'dark' {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
        return theme;
    }
    return 'dark';
}

function putTheme(theme: 'light' | 'dark'): void {
    return localStorage.setItem('theme', theme);
}

function getLanguage(): 'en' | 'id' {
    const language = localStorage.getItem('language');
    if (language === 'en' || language === 'id') {
        return language;
    }
    return 'en';
}

function putLanguage(language: 'en' | 'id'): void {
    return localStorage.setItem('language', language);
}

export {
    getTheme,
    putTheme,
    getLanguage,
    putLanguage,
}