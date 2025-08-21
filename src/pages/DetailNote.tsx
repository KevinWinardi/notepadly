import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/network-data";
import type { Note } from "../utils/type";
import { NotFound } from "./NotFound";
import { MenuButtonNote } from "../components/MenuButtonNote";
import { LoadingContext } from "../contexts/Loading/LoadingContext";
import { useTranslation } from "react-i18next";
import { showFormattedDate } from "../utils/format-date";

export function DetailNote() {
    const { t } = useTranslation();
    const { id = '' } = useParams();
    const [note, setNote] = useState<Note | null>(null);
    const { setIsLoading } = useContext(LoadingContext);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function getNoteHandle(): Promise<void> {
            setIsLoading(true);

            const response = await getNote(id);

            if (!isMounted) return;

            setNote(response.data);

            setFetched(true);
            setIsLoading(false);
        }

        getNoteHandle();

        return () => { isMounted = false; };
    }, []);

    if (!fetched) return null;

    if (!note) return <NotFound message={t('noteNotFound')} buttonBackToHome={true}></NotFound>;

    return (
        <>
            <MenuButtonNote note={note}></MenuButtonNote>

            <div className="border rounded p-4 min-h-[75dvh] dark:border-white">
                <h1 className="mb-2 break-words whitespace-normal">{note.title}</h1>
                <hr />
                <p className="mt-2 text-gray-500 dark:text-gray-400">{t('createdAt') + ' ' + showFormattedDate(note.createdAt)}</p>

                <div className="mt-4">
                    {
                        note.body.split('\n').map((text, idx) => (
                            <p key={idx} className="break-words whitespace-normal dark:text-white">{text}</p>
                        ))
                    }
                </div>
            </div>
        </>
    )

}