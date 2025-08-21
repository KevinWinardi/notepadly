import { useNavigate } from "react-router-dom";
import type { Note } from "../utils/type";
import Swal from "sweetalert2";
import { archiveNote, deleteNote, unarchiveNote } from "../utils/network-data";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { LoadingContext } from "../contexts/Loading/LoadingContext";

type MenuButtonNoteProps = {
    note: Note,
}

export function MenuButtonNote({ note }: MenuButtonNoteProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const { setIsLoading } = useContext(LoadingContext);

    async function handleDeleteNote(): Promise<void> {
        const confirmation = await Swal.fire({
            icon: 'question',
            title: t('confirmation'),
            text: t('confirmationDeleteMessage'),
            showDenyButton: true,
            confirmButtonText: t('yes'),
            denyButtonText: t('no'),
            theme: theme,
        });

        if (confirmation.isConfirmed) {
            setIsLoading(true);
            const result = await deleteNote(note.id);
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
                    text: t('successDeleteNote'),
                    toast: true,
                    position: 'top-right',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    theme: theme,
                });
                navigate('/');
            }
        }
    }

    async function handleMoveNote(): Promise<void> {
        setIsLoading(true);
        const result = await (note.archived ? unarchiveNote(note.id) : archiveNote(note.id));
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
                text: t(note.archived ? 'successUnarchiveNote' : 'successArchiveNote'),
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                theme: theme,
            });
            navigate('/');
        }
    }

    return (
        <div className="flex justify-between items-center mb-4 ">
            <button onClick={() => navigate('/')} title="Back" className="btn btn-secondary">
                <i className="fa-solid fa-arrow-left"></i> {t('back')}
            </button>

            <div className="flex gap-4">
                <button title={note.archived ? t('unarchive') : t('archive')} onClick={handleMoveNote} className="btn btn-warning">
                    <i className="fa-solid fa-box-archive"></i> {note.archived ? t('unarchive') : t('archive')}
                </button>
                <button title={t('delete')} onClick={handleDeleteNote} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i> {t('delete')}
                </button>
            </div>
        </div>
    );
}