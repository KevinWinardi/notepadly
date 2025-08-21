import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type NotFoundProps = {
    message: string,
    buttonBackToHome: boolean,
}

export function NotFound({ message, buttonBackToHome }: NotFoundProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-4 justify-center items-center min-h-[75dvh]">
            <h1>{message}</h1>
            <button hidden={!buttonBackToHome} className="btn btn-primary" onClick={() => navigate('/')}>{t('backToHome')}</button>
        </div>
    );
}