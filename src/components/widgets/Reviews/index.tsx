'use client';

import { useCallback, useState } from 'react';
import { LogoSection } from '@/assets/icons/LogoSection';

const REVIEWS: {
    text: string;
    name: string;
    role: string;
    imageSrc: string;
}[] = [
    {
        text: 'Ми шукали логістичного партнера, який розуміє наші внутрішні процеси та може адаптуватися під них.З OnLan ми це отримали: перевезення проходять чітко, а комунікація — на високому рівні.',
        name: 'Олександр',
        role: 'CEO виробничої компанії (Київ)',
        imageSrc: 'https://picsum.photos/seed/onlan-review-igor/160/160',
    },
    {
        text: 'Працюємо з OnLan понад два роки. Логісти завжди на зв’язку, оперативно реагують на зміни та знаходять рішення навіть у складних ситуаціях.',
        name: 'Іванна',
        role: 'Керівниця відділу логістики (Одеса)',
        imageSrc: 'https://picsum.photos/seed/onlan-review-olena/160/160',
    },
    {
        text: 'Партнер, який забезпечує своєчасну доставку як для комплектуючих, так і для готової продукції. Надійне рішення для нашого бізнесу.',
        name: 'Марина',
        role: 'Керівниця логістичного відділу (Київ)',
        imageSrc: 'https://picsum.photos/seed/onlan-review-olena/160/160',
    },
    {
        text: 'Співпрацюємо більше року — маршрути чітко сплановані, є прозорість на всіх етапах і якісний супровід. Усе працює стабільно.',
        name: 'Ігор',
        role: 'Перевізник (Луцьк)',
        imageSrc: 'https://picsum.photos/seed/onlan-review-olena/160/160',
    },
];

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
    return (
        <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            {dir === 'left' ? (
                <path d="M15 18l-6-6 6-6" />
            ) : (
                <path d="M9 18l6-6-6-6" />
            )}
        </svg>
    );
}

export function Reviews() {
    const [index, setIndex] = useState(0);
    const total = REVIEWS.length;
    const current = REVIEWS[index]!;

    const goPrev = useCallback(() => {
        setIndex((i) => (i - 1 + total) % total);
    }, [total]);

    const goNext = useCallback(() => {
        setIndex((i) => (i + 1) % total);
    }, [total]);

    return (
        <section className="relative isolate w-full overflow-visible py-10 md:py-14 lg:py-20" aria-labelledby="reviews-heading">
            <div
                className="pointer-events-none absolute inset-0 z-0 flex select-none items-end justify-start"
                aria-hidden
            >
                <LogoSection className="absolute top-0 left-0 w-full max-w-full shrink-0 opacity-40 md:w-[500px]" />
            </div>

            <div className="relative z-10 container mx-auto flex flex-col items-start px-4">
                <div className="flex items-center justify-start gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            відгуки
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex w-full flex-col gap-10 lg:mt-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
                    <div className="max-w-xl shrink-0 lg:w-[42%]">
                        <h2
                            id="reviews-heading"
                            className="text-left text-2xl font-bold leading-tight text-onlan-black md:text-3xl lg:text-[56px] lg:leading-[1.1]"
                        >
                            Що про нас говорять
                            <br />
                            наші клієнти
                        </h2>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-6 sm:flex-row sm:items-start sm:gap-4 md:gap-6">
                        <span
                            className="select-none font-bold leading-none text-onlan-blue [font-size:clamp(4rem,18vw,130px)]"
                            aria-hidden
                        >
                            &ldquo;
                        </span>

                        <div className="min-w-0 flex-1">
                            <blockquote className="border-none p-0">
                                <p
                                    key={current.text}
                                    className="text-base font-medium leading-relaxed text-onlan-black md:text-lg"
                                >
                                    {current.text}
                                </p>
                            </blockquote>

                            <div className="mt-8 flex items-center gap-4">
                                <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-onlan-lavender bg-onlan-lavender/30 md:size-16">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={current.imageSrc}
                                        alt=""
                                        width={64}
                                        height={64}
                                        className="size-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-lg font-bold text-onlan-black md:text-xl">{current.name}</p>
                                    <p className="mt-0.5 text-sm text-onlan-blue md:text-base">{current.role}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-onlan-blue text-onlan-blue transition-colors hover:bg-onlan-lavender focus:outline-none focus-visible:ring-2 focus-visible:ring-onlan-blue focus-visible:ring-offset-2 md:size-12"
                                    aria-label="Попередній відгук"
                                >
                                    <ChevronIcon dir="left" />
                                </button>
                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="inline-flex size-11 items-center justify-center rounded-full border border-onlan-blue text-onlan-blue transition-colors hover:bg-onlan-lavender focus:outline-none focus-visible:ring-2 focus-visible:ring-onlan-blue focus-visible:ring-offset-2 md:size-12"
                                    aria-label="Наступний відгук"
                                >
                                    <ChevronIcon dir="right" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
