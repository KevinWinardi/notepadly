import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { LoadingContext } from "../contexts/Loading/LoadingContext";
import { getUserLogged, removeAccessToken } from "../utils/network-data";
import { type UserProfile } from "../utils/type";
import { NotFound } from "./NotFound";
import Swal from "sweetalert2";

type ProfileProps = {
    setIsAuthenticate: React.Dispatch<React.SetStateAction<boolean>>,
}

export function Profile({ setIsAuthenticate }: ProfileProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [fetched, setFetched] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function getProfileHandle(): Promise<void> {
            setIsLoading(true);
            const result = await getUserLogged();
            if (!isMounted) return;
            setIsLoading(false);
            setFetched(true);

            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: t('fail'),
                    text: result.message as string,
                    theme: theme,
                });
            } else {
                setProfile(result.data);
            }
        }

        getProfileHandle();

        return () => { isMounted = false; };
    }, []);

    async function logoutHandle(): Promise<void> {
        const confirmation = await Swal.fire({
            icon: 'question',
            title: t('confirmation'),
            text: t('confirmationLogout'),
            showDenyButton: true,
            confirmButtonText: t('yes'),
            denyButtonText: t('no'),
            theme: theme,
        })

        if (confirmation.isConfirmed) {
            setIsAuthenticate(false);
            removeAccessToken();
            navigate('/login');
        }
    }

    if (!fetched) return null;

    if (!profile) return <NotFound message={t('profileNotFound')} buttonBackToHome={true}></NotFound>

    return (
        <div className="h-[75dvh]">
            <button className="btn btn-secondary self-start" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i> {t('back')}
            </button>

            <div className="h-full flex flex-col justify-center items-center gap-8">
                <div className="w-3/4 max-w-sm flex flex-col justify-center items-center p-4 border rounded-2xl shadow-md bg-white dark:bg-gray-900/50 dark:border-white">
                    <h1 className="text-center mb-8">{t('profile')}</h1>
                    <img src={`https://ui-avatars.com/api/?name=${profile?.name.slice(0, 1)}`} alt="Profile? image"
                        className="mb-4 border rounded-full"
                    />
                    <p className="text-2xl font-bold dark:text-white">{profile?.name}</p>
                    <p className="font-semibold text-gray-500">{profile?.email}</p>
                </div>

                <button className="btn btn-danger" onClick={logoutHandle}>
                    <i className="fa-solid fa-right-to-bracket -scale-x-100"></i> {t('logout')}
                </button>
            </div>
        </div>
    );
}