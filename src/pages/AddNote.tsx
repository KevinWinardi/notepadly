import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { LoadingContext } from "../contexts/Loading/LoadingContext";
import { addNote } from "../utils/network-data";
import Swal from "sweetalert2";

export function AddNote() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        function resize(element: HTMLTextAreaElement | null): void {
            if (element) {
                element.style.height = 'auto';
                element.style.height = `${element.scrollHeight}px`;
            }
        }
        resize(titleRef.current);
        resize(bodyRef.current);
    }, [body, title]);

    async function handleSaveNote(): Promise<void> {
        if (!title.trim() || !body.trim()) {
            Swal.fire({
                icon: 'warning',
                title: t('warning'),
                text: t('titleBodyEmpty'),
                theme: theme,
            })
            return;
        }

        setIsLoading(true);
        const result = await addNote({ title: title, body: body });
        setIsLoading(false);

        if (result.error) {
            Swal.fire({
                'icon': 'error',
                title: t('fail'),
                text: result.message as string,
                theme: theme,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: t('success'),
                text: t('successAddNote'),
                toast: true,
                position: 'top-right',
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true,
                theme: theme,
            });
            navigate('/');
        }
    }

    return (
        <>
            <button onClick={() => navigate(-1)} title={t('back')} className="btn btn-secondary">
                <i className="fa-solid fa-arrow-left"></i> {t('back')}
            </button>

            <div>
                <div className="min-h-[40dvh] mt-4 border rounded p-4 dark:border-white">
                    <textarea ref={titleRef} rows={1} value={title}
                        onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)}
                        placeholder={t('titleNote')} aria-label={t('titleNote')}
                        className="w-full mb-2 overflow-y-hidden text-4xl font-extrabold outline-none resize-none dark:text-white">
                    </textarea>
                    <hr className="dark:text-white" />
                    <textarea ref={bodyRef} value={body} onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                        placeholder={t('bodyNote')} aria-label={t('bodyNote')}
                        className="w-full mt-4 overflow-y-hidden outline-none resize-none dark:text-white">
                    </textarea>
                </div>

                <button title={t('addNote')} className="btn btn-primary btn-bottom-right" onClick={handleSaveNote}>
                    <i className={`fa-solid fa-check`}></i>
                </button>
            </div>
        </>
    );
}