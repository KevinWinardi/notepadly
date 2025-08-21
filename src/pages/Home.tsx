import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { useTranslation } from "react-i18next";
import { LoadingContext } from "../contexts/Loading/LoadingContext";
import { ThemeContext } from "../contexts/Theme/ThemeContext";
import { useDebounce } from "../custom-hooks/use-debounce";
import { Card } from "../components/Card";
import { getActiveNotes, getArchivedNotes } from "../utils/network-data";
import type { Note } from "../utils/type"
import Swal from "sweetalert2";

type HomeProps = {
    isArchivedMode: boolean,
}

export function Home({ isArchivedMode }: HomeProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { setIsLoading } = useContext(LoadingContext);
    const { theme } = useContext(ThemeContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const rawTitleQuery: string = searchParams.get('title') ?? '';
    const debouncedTitleQuery = useDebounce(rawTitleQuery, 1000);
    const [showNotes, setShowNotes] = useState<Note[]>([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function getNotesHandle(): Promise<void> {
            setIsLoading(true);

            const result = await (isArchivedMode ? getArchivedNotes() : getActiveNotes());
            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: t('fail'),
                    text: result.message as string,
                    theme: theme,
                })
            }

            if (!isMounted) return;

            setShowNotes((result.data ?? []).filter(
                item => item.title.toLowerCase().includes(debouncedTitleQuery.toLowerCase())
            ).reverse());

            setIsLoading(false);
            setFetched(true)
        }

        getNotesHandle();

        return () => { isMounted = false; };
    }, [isArchivedMode, debouncedTitleQuery]);

    if (!fetched) return null;

    return (
        <>
            <div className="flex gap-4 mb-8 p-2 shadow border rounded dark:border-white">
                <button>
                    <i className="fa-solid fa-magnifying-glass dark:text-white"></i>
                </button>
                <input type="text" name="search" value={rawTitleQuery ?? ''}
                    onChange={(e) => setSearchParams({ title: e.target.value })}
                    placeholder={t('searchNotes')}
                    className="w-full outline-none dark:text-white" />
            </div>

            <div className="flex gap-4 justify-center mb-4">
                <Link to={'/'} className={`btn ${!isArchivedMode ? 'btn-primary' : 'btn-secondary'}`}>{t('active')}</Link>
                <Link to={'/archived'} className={`btn ${isArchivedMode ? 'btn-primary' : 'btn-secondary'}`}>{t('archived')}</Link>
            </div>

            {showNotes.length
                ?
                (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {
                                showNotes.map(note => (
                                    <Card key={note.id} note={note}></Card>
                                ))
                            }
                        </div>
                    </div>
                )
                :
                (
                    <NotFound message={t('emptyNotes')} buttonBackToHome={false}></NotFound>
                )
            }

            <button title={t('addNote')} onClick={() => navigate('/add-note')} className="btn btn-bottom-right btn-primary">
                <i className="fa-solid fa-add"></i>
            </button>
        </>
    );
}