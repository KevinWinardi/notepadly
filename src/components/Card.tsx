import { Link } from "react-router-dom";
import type { Note } from "../utils/type";
import { showFormattedDate } from "../utils/format-date";
import { useTranslation } from "react-i18next";

type CardProps = {
    note: Note
}

export function Card({ note }: CardProps) {
    const { t } = useTranslation();

    return (
        <Link to={`/detail-note/${note.id}`} className="border rounded shadow p-4 transition hover:opacity-75 hover:scale-95 dark:border-white dark:shadow-white">
            <h3>{note.title}</h3>
            <div className="mb-2 line-clamp-3">
                {
                    note.body.split('\n').map((text, idx) => (
                        <p key={idx} className="dark:text-white">{text}</p>
                    ))
                }
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">{t('createdAt') + ' ' + showFormattedDate(note.createdAt)}</p>
        </Link>
    );
}