import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/style.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import './assets/fontawesome/css/all.min.css'
import { ThemeProvider } from './contexts/Theme/ThemeProvider.tsx';
import { LanguageProvider } from './contexts/Language/LanguageProvider.tsx';
import { LoadingProvider } from './contexts/Loading/LoadingProvider.tsx';
import './utils/i18n.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LanguageProvider>
            <ThemeProvider>
                <LoadingProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </LoadingProvider>
            </ThemeProvider>
        </LanguageProvider>
    </StrictMode>,
)
