'use client';

import clsx from 'clsx';
import type { IconType } from 'react-icons';
import {
    HiOutlineBuildingOffice2,
    HiOutlineChatBubbleLeftRight,
    HiOutlineClipboardDocumentCheck,
    HiOutlineDocumentText,
    HiOutlineTruck,
} from 'react-icons/hi2';
import Title from '@/components/elements/Title';

const RISK_CARD_ICON_CLASS =
    'size-8 shrink-0 text-onlan-blue md:size-9 [&>path]:stroke-[1.5]';

const RISK_CARDS: { Icon: IconType; title: string; text: string }[] = [
    {
        Icon: HiOutlineClipboardDocumentCheck,
        title: 'Митниця',
        text: 'Затримки через перевірки та оформлення',
    },
    {
        Icon: HiOutlineBuildingOffice2,
        title: 'Склади',
        text: 'Простої та неузгодженість процесів',
    },
    {
        Icon: HiOutlineTruck,
        title: 'Перевізники',
        text: 'Людський фактор і збої в дорозі',
    },
    {
        Icon: HiOutlineChatBubbleLeftRight,
        title: 'Комунікація',
        text: 'Відсутність контролю між учасниками',
    },
    {
        Icon: HiOutlineDocumentText,
        title: 'Документи',
        text: 'Помилки та відсутність перевірки перед відправкою',
    },
];

const BODY_PARAGRAPHS = [
    'На митниці, на складах і в дорозі все вирішують люди — і саме там виникають затримки, помилки та ризики.',
    'Тому в логістиці важливі не тільки маршрути, а зв’язки, досвід і швидка реакція.',
    'Коли вантаж важливий для бізнесу, потрібен не просто перевізник — а команда, яка контролює процес і бере відповідальність.',
] as const;

export function AntiPainSection() {
    return (
        <section
            className="relative isolate w-full overflow-hidden bg-onlan-white py-14 md:py-20 lg:py-24"
            aria-labelledby="anti-pain-heading"
        >
            {/* Фон: м’які плями + сітка */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                aria-hidden
                
            />
            <div
                className="pointer-events-none absolute -right-[20%] -top-[30%] h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-onlan-lavender/50 blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -bottom-[40%] -left-[15%] h-[min(70vw,380px)] w-[min(70vw,380px)] rounded-full bg-onlan-lime/25 blur-3xl"
                aria-hidden
            />

            <div className="container relative mx-auto px-4">
                {/* Вступ: заголовок зліва + «сходинки» тексту справа */}
                <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="flex items-center justify-start gap-2">
                            <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                            <div className="rounded-full border border-onlan-black bg-onlan-white/90 px-4 py-2 backdrop-blur-sm">
                                <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                                    Реальність логістики
                                </p>
                            </div>
                        </div>

                        <Title
                            id="anti-pain-heading"
                            title="Логістика — це не система. Це люди, які приймають рішення"
                            type="h2"
                            className="mt-6 text-balance text-onlan-black md:mt-8 lg:sticky lg:top-28 lg:max-w-[min(100%,22rem)] xl:max-w-none"
                        />
                    </div>

                    <div className="relative lg:col-span-7 xl:col-span-8">
                        <div
                            className="absolute -left-2 top-3 hidden h-[calc(100%-1rem)] w-1 rounded-full bg-linear-to-b from-onlan-lime via-onlan-blue to-onlan-lavender lg:block"
                            aria-hidden
                        />
                        <div className="space-y-4 lg:space-y-5 lg:pl-8">
                            {BODY_PARAGRAPHS.map((text, i) => (
                                <p
                                    key={i}
                                    className={clsx(
                                        'rounded-2xl border border-onlan-black/10 bg-onlan-white/85 p-5 text-base font-medium leading-relaxed text-onlan-blue/90 shadow-sm backdrop-blur-sm md:p-6 md:text-lg',
                                        i === 0 && 'lg:translate-x-0',
                                        i === 1 && 'lg:translate-x-0',
                                        i === 2 && 'lg:translate-x-0',
                                    )}
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Callout: зсув + «брутальна» тінь лаймом */}
                <div className="relative mt-12 md:mt-16 lg:mt-20">
                    <div
                        className="absolute -left-1 top-8 hidden h-16 w-3 rounded-full bg-onlan-lime md:block lg:left-0"
                        aria-hidden
                    />
                    <div className="relative max-w-4xl md:pl-6 lg:max-w-5xl">
                        <div className="rounded-2xl bg-onlan-blue p-6 text-onlan-white shadow-[6px_6px_0_0] shadow-onlan-lime md:rounded-3xl md:p-9 md:shadow-[10px_10px_0_0]">
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-onlan-lime">
                                Підхід OnLan
                            </p>
                            <p className="mt-3 text-base font-medium leading-relaxed md:mt-4 md:text-lg">
                                Саме тому ми будуємо логістику навколо контролю, комунікації та відповідальності
                                на кожному етапі. На цьому принципі працює OnLan — повний контроль ланцюга
                                поставок і відповідальність за кожен етап доставки.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Блок ризиків */}
                <div className="relative mt-20 md:mt-24 lg:mt-28">
                    <div className="absolute left-0 top-0 h-px w-24 bg-onlan-black md:w-32" aria-hidden />
                    <div className="pt-10 md:flex md:items-end md:justify-between md:gap-10 md:pt-12">
                        <Title
                            title="Основні ризики доставки — поза маршрутом"
                            type="h3"
                            className="max-w-xl text-balance text-onlan-black md:max-w-2xl"
                        />
                        <p className="mt-4 max-w-md text-base font-medium leading-snug text-onlan-blue/85 md:mt-0 md:text-right md:text-lg lg:shrink-0">
                            На доставку впливають десятки факторів — і більшість із них не контролюються
                            системами
                        </p>
                    </div>

                    {/* Мобільний: вертикальна лінія зліва */}
                    <div className="relative mt-12 md:hidden">
                        <div
                            className="absolute left-[0.65rem] top-2 bottom-2 w-px bg-onlan-blue/20"
                            aria-hidden
                        />
                        <ul className="space-y-6">
                            {RISK_CARDS.map((card) => {
                                const { Icon } = card;
                                return (
                                    <li key={card.title} className="relative flex gap-4 pl-10">
                                        <span
                                            className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border-2 border-onlan-blue bg-onlan-white"
                                            aria-hidden
                                        >
                                            <span className="size-2 rounded-full bg-onlan-lime" />
                                        </span>
                                        <div className="min-w-0 w-full max-w-xs rounded-2xl border border-onlan-black/15 bg-onlan-white/90 p-4">
                                            <Icon className={RISK_CARD_ICON_CLASS} aria-hidden />
                                            <h4 className="mt-2 text-base font-semibold text-onlan-black">{card.title}</h4>
                                            <p className="mt-1 text-sm font-medium text-onlan-blue/85">{card.text}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Планшет+: зигзаг від центральної осі */}
                    <div className="relative mt-14 hidden md:block">
                        <div
                            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-onlan-lime/40 via-onlan-lavender to-onlan-blue/30"
                            aria-hidden
                        />
                        <ul className="space-y-10 lg:space-y-12">
                            {RISK_CARDS.map((card, i) => {
                                const isLeft = i % 2 === 0;
                                const { Icon } = card;
                                return (
                                    <li
                                        key={card.title}
                                        className={clsx(
                                            'relative flex items-center',
                                            isLeft ? 'justify-end pr-[calc(50%+1.25rem)]' : 'justify-start pl-[calc(50%+1.25rem)]',
                                        )}
                                    >
                                        <span
                                            className="absolute left-1/2 z-10 flex size-4 -translate-x-1/2 rounded-full border-[3px] border-onlan-white bg-onlan-lime shadow-md ring-2 ring-onlan-blue/40"
                                            aria-hidden
                                        />
                                        <div
                                            className={clsx(
                                                'w-80 shrink-0 rounded-2xl border-2 border-onlan-black/10 bg-onlan-white p-5 shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-onlan-blue/30 hover:shadow-lg lg:p-6',
                                            )}
                                        >
                                            <Icon className={RISK_CARD_ICON_CLASS} aria-hidden />
                                            <h4 className="mt-2 text-lg font-semibold text-onlan-black lg:mt-3 lg:text-xl">
                                                {card.title}
                                            </h4>
                                            <p className="mt-2 text-sm font-medium leading-snug text-onlan-blue/85 md:text-base">
                                                {card.text}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
