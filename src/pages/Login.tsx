import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingContext } from "../contexts/Loading/LoadingContext";
import { useInput } from "../custom-hooks/use-input";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { login, putAccessToken } from "../utils/network-data";
import Swal from "sweetalert2";

type LoginProps = {
    setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>,
}

export function Login({ setIsAuthenticate }: LoginProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setIsLoading } = useContext(LoadingContext);
    const { theme } = useContext(ThemeContext);
    const [email, emailChangeHandler] = useInput('');
    const [password, passwordChangeHandler] = useInput('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            Swal.fire({
                icon: 'warning',
                title: t('warning'),
                text: t('allInputEmpty'),
                theme: theme,
            });
            return;
        }

        setIsLoading(true);
        const response = await login({ email: email, password: password });
        setIsLoading(false);

        if (response.error) {
            Swal.fire({
                icon: 'warning',
                title: t('warning'),
                text: response.message as string,
                theme: theme,
            });
        } else {
            setIsAuthenticate(true);
            putAccessToken(response.data!.accessToken);
            navigate('/');
        }
    }

    return (
        <div className="h-[80dvh] flex justify-center items-center">
            <div className="w-full max-w-sm p-8 border rounded shadow-md bg-white dark:bg-gray-900/50 dark:border-white">
                <h1 className="text-center">{t('login')}</h1>
                <form onSubmit={submitHandler} className="mt-16 flex flex-col gap-8">
                    <input
                        type="email"
                        name="email"
                        aria-label="email"
                        value={email}
                        placeholder="Email"
                        onChange={emailChangeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
                    />

                    <div className="relative">
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            name="password"
                            aria-label={t('password')}
                            value={password}
                            placeholder={t('password')}
                            onChange={passwordChangeHandler}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 dark:text-white"
                        />
                        <button
                            type="button"
                            aria-label={t('showPassword')}
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                            <i className={`fa-solid ${isShowPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">{t('submit')}</button>

                    <Link to={'/register'} className="underline text-sm text-center text-blue-400 hover:text-blue-700">{t('directRegister')}</Link>
                </form>
            </div>
        </div>
    );
}