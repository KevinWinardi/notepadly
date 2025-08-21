import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingContext } from "../contexts/Loading/LoadingContext";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { useInput } from "../custom-hooks/use-input";
import { register } from "../utils/network-data";
import Swal from "sweetalert2";

export function Register() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setIsLoading } = useContext(LoadingContext);
    const { theme } = useContext(ThemeContext);
    const [name, nameChangeHandler] = useInput('');
    const [email, emailChangeHandler] = useInput('');
    const [password, passwordChangeHandler] = useInput('');
    const [passwordConfirmation, passwordConfirmationChangeHandler] = useInput('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] = useState(false);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim()) {
            Swal.fire({
                icon: 'warning',
                title: t('warning'),
                text: t('allInputEmpty'),
                theme: theme,
            });
            return;
        }

        if (password !== passwordConfirmation) {
            Swal.fire({
                icon: 'warning',
                title: t('warning'),
                text: t('passwordNotMatch'),
                theme: theme,
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire({
                icon: 'warning',
                title: t('warning'),
                text: t('passwordMinLength'),
                theme: theme,
            });
            return;
        }

        setIsLoading(true);
        const result = await register({ name: name, email: email, password: password })
        setIsLoading(false);

        if (result.error) {
            Swal.fire({
                icon: 'error',
                title: t('fail'),
                text: result.message as string,
                theme: theme,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: t('success'),
                text: t('successRegister'),
                theme: theme,
            });
            navigate('/login');
        }
    }

    return (
        <div className="h-[75dvh] flex justify-center items-center">
            <div className="w-full max-w-sm p-8 border rounded shadow-md bg-white dark:bg-gray-900/50 dark:border-white">
                <h1 className="text-center">{t('register')}</h1>
                <form onSubmit={submitHandler} className="mt-16 flex flex-col gap-8">
                    <input
                        type="text"
                        name="name"
                        aria-label={t('name')}
                        value={name}
                        placeholder={t('name')}
                        onChange={nameChangeHandler}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-white"
                    />

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

                    <div className="relative">
                        <input
                            type={isShowPasswordConfirmation ? 'text' : 'password'}
                            name="password"
                            aria-label={t('passwordConfirmation')}
                            value={passwordConfirmation}
                            placeholder={t('passwordConfirmation')}
                            onChange={passwordConfirmationChangeHandler}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 dark:text-white"
                        />
                        <button
                            type="button"
                            aria-label={t('showPassword')}
                            onClick={() => setIsShowPasswordConfirmation(!isShowPasswordConfirmation)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                            <i className={`fa-solid ${isShowPasswordConfirmation ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">{t('submit')}</button>

                    <Link to={'/login'} className="underline text-sm text-center text-blue-400 hover:text-blue-700">{t('directLogin')}</Link>
                </form>
            </div>
        </div>
    )
}