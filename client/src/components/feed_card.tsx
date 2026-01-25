import {Link} from "wouter";
import {useTranslation} from "react-i18next";
import {timeago} from "../utils/timeago";
import {HashTag} from "./hashtag";
import {useMemo} from "react";

export function FeedCard({ id, title, avatar, draft, listed, top, summary, hashtags, createdAt, updatedAt }:
    {
        id: string, avatar?: string,
        draft?: number, listed?: number, top?: number,
        title: string, summary: string,
        hashtags: { id: number, name: string }[],
        createdAt: Date, updatedAt: Date
    }) {
    const { t } = useTranslation()
    return useMemo(() => (
        <>
            <Link href={`/feed/${id}`} target="_blank" className="block w-full rounded-lg bg-w my-4 p-6 duration-200 border border-neutral-200 dark:border-neutral-800 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 group transition-all">
                {avatar &&
                    <div className="flex flex-row items-center mb-4 rounded-lg overflow-clip border border-neutral-100 dark:border-neutral-800">
                        <img src={avatar} alt=""
                            className="object-cover object-center w-full max-h-96 hover:scale-105 transition-transform duration-500" />
                    </div>}
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white text-pretty overflow-hidden mb-2 group-hover:text-theme transition-colors">
                    {title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm text-neutral-500 dark:text-neutral-400">
                    <span title={new Date(createdAt).toLocaleString()}>
                        {createdAt === updatedAt ? timeago(createdAt) : t('feed_card.published$time', { time: timeago(createdAt) })}
                    </span>
                    {createdAt !== updatedAt &&
                        <span title={new Date(updatedAt).toLocaleString()}>
                            {t('feed_card.updated$time', { time: timeago(updatedAt) })}
                        </span>
                    }
                    {draft === 1 && <span className="text-neutral-400">{t("draft")}</span>}
                    {listed === 0 && <span className="text-neutral-400">{t("unlisted")}</span>}
                    {top === 1 && <span className="text-theme font-medium">
                        {t('article.top.title')}
                    </span>}
                </div>
                <p className="text-pretty overflow-hidden text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {summary}
                </p>
                {hashtags.length > 0 &&
                    <div className="flex flex-row flex-wrap justify-start gap-2">
                        {hashtags.map(({ name }, index) => (
                            <HashTag key={index} name={name} />
                        ))}
                    </div>
                }

            </Link>
        </>
    ), [id, title, avatar, draft, listed, top, summary, hashtags, createdAt, updatedAt])
}