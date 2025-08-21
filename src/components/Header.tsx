import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { LanguageContext } from "../contexts/Language/LanguageContext";

type HeaderProps = {
    isAuthenticate: boolean,
}

export function Header({ isAuthenticate }: HeaderProps) {
    const { t } = useTranslation();
    const { theme, setTheme } = useContext(ThemeContext);
    const { language, setLanguage } = useContext(LanguageContext);
    const [viewSidebar, setViewSidebar] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node) &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setViewSidebar(false);
            }
        }

        if (viewSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [viewSidebar]);

    return (
        <div className="fixed top-0 w-full flex justify-between items-center z-40 gap-4 px-8 py-4 rounded-b shadow-lg bg-slate-900">
            <Link to={'/'} className="font-bold text-2xl transition hover:opacity-75 text-white transition-transform hover:scale-95">Notepadly</Link>

            <button ref={menuRef} onClick={() => setViewSidebar(!viewSidebar)} className="block sm:hidden cursor-pointer transition-transform hover:scale-90">
                <i className="fa-solid fa-bars text-2xl text-white"></i>
            </button>

            {/* Mobile */}
            <div ref={sidebarRef} className={`flex sm:hidden flex-col justify-between gap-8 absolute top-[66px] right-0 z-50 w-max rounded-s bg-gray-800 transition-transform duration-300 transform ${viewSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col gap-4 px-4 pt-4">
                    {
                        isAuthenticate
                            ? (
                                <Link to={'/profile'} className="flex items-center gap-4 text-white transition-transform hover:scale-95">
                                    <i className="fa-solid fa-circle-user text-xl"></i>
                                    {t('profile')}
                                </Link>
                            )
                            : (
                                <Link to={'/login'} className="btn btn-primary w-full text-center">
                                    <i className="fa-solid fa-right-to-bracket"></i> {t('login')}
                                </Link>
                            )
                    }
                </div>

                <div className="w-full flex justify-between gap-8 p-2 border-t border-white">
                    <button title={t('changeTheme')} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'} p-2 text-xl text-white transition-transform hover:scale-90 cursor-pointer`}></i>
                    </button>

                    <div>
                        <i className={`fi fi-${language == 'en' ? 'gb' : 'id'} mr-2`}></i>
                        <select title={t('changeLanguage')} value={language} onChange={() => setLanguage(language == 'en' ? 'id' : 'en')} className="p-2 border rounded cursor-pointer text-white transition-opacity hover:opacity-75 ">
                            <option value="en" className="text-black bg-white dark:text-white dark:bg-gray-700">
                                English
                            </option>
                            <option value="id" className="text-black bg-white dark:text-white dark:bg-gray-700">
                                Indonesia
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex gap-4 ml-auto">
                <button title={t('changeTheme')} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    <i className={`fa-solid ${theme === 'light' ? 'fa-sun' : 'fa-moon'} p-2 text-xl text-white transition-transform hover:scale-90 cursor-pointer`}></i>
                </button>

                <i className={`fi fi-${language == 'en' ? 'gb' : 'id'}`}></i>
                <select title={t('changeLanguage')} value={language} onChange={() => setLanguage(language == 'en' ? 'id' : 'en')} className="p-2 border rounded cursor-pointer text-white transition-opacity hover:opacity-75 ">
                    <option value="en" className="text-black bg-white dark:text-white dark:bg-gray-700">
                        English
                    </option>
                    <option value="id" className="text-black bg-white dark:text-white dark:bg-gray-700">
                        Indonesia
                    </option>
                </select>

                {
                    isAuthenticate
                        ? (
                            <Link to={'/profile'} title={t('profile')}>
                                <i className="fa-solid fa-circle-user p-2 text-xl text-white transition-transform hover:scale-90"></i>
                            </Link>
                        )
                        : (
                            <Link to={'/login'} className="btn btn-primary">
                                <i className="fa-solid fa-right-to-bracket"></i> {t('login')}
                            </Link>
                        )
                }
            </div>
        </div>
    );
}