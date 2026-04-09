'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-router';
import { Elements } from '@elements/index.ts';
import WhyChooseUsImage from '@images/WhyChooseUs.jpg';
import Title from '@/components/elements/Title';

const reasons: { num: string; lines: string[] }[] = [
    { num: '01', lines: ['Контроль на кожному етапі'] },
    { num: '02', lines: ['Перевірка документів до відправки'] },
    { num: '03', lines: ['Пряма комунікація з усіма учасниками'] },
    { num: '04', lines: ['Оперативне реагування в дорозі'] },
    { num: '05', lines: ['Прозорість для клієнта'] },
    { num: '06', lines: ['Комплексний супровід доставки'] },
];

const columnLeftNums = new Set(['01', '03', '05']);
const columnLeft = reasons.filter((r) => columnLeftNums.has(r.num));
const columnRight = reasons.filter((r) => !columnLeftNums.has(r.num));

function useCountUp(target: number, active: boolean, durationMs = 2000) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) {
            return;
        }
        let start: number | null = null;
        let raf = 0;
        const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

        const tick = (now: number) => {
            if (start === null) {
                start = now;
            }
            const t = Math.min((now - start) / durationMs, 1);
            setValue(Math.round(easeOutCubic(t) * target));
            if (t < 1) {
                raf = requestAnimationFrame(tick);
            }
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, target, durationMs]);

    return value;
}

function WhyChooseUsStats() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) {
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActive(true);
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const clientsPct = useCountUp(99, active);
    const cargoPct = useCountUp(98, active);

    return (
        <div
            ref={wrapRef}
            className="mt-10 flex w-full flex-col items-end gap-3 overflow-x-hidden md:mt-14"
        >
            {/* Верхня смуга довша; обидві прижаті до правого краю екрана, без container */}
            <div
                className="ml-auto flex w-[90%] flex-col gap-3 rounded-l-2xl py-4 pl-5 pr-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:pl-8 sm:pr-8 md:py-5 lg:pl-10 lg:pr-12"
                style={{ backgroundColor: '#D5E82D' }}
            >
                <span
                    className="text-[122px] font-bold tabular-nums leading-none text-onlan-blue"
                    aria-live="polite"
                >
                    {clientsPct}%
                </span>
                <p className="max-w-2xl text-left text-base font-semibold text-onlan-blue sm:text-lg md:text-[60px]">
                    Задоволених клієнтів
                </p>
            </div>

            <div
                className="ml-auto flex w-[85%] flex-col gap-4 rounded-l-2xl py-4 pl-5 pr-5 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:pl-8 sm:pr-8 md:gap-16 md:py-5 lg:gap-20 lg:pl-10 lg:pr-12"
                style={{ backgroundColor: '#2D368B' }}
            >
                <span
                    className="shrink-0 text-[122px] font-bold tabular-nums leading-none text-onlan-lime"
                    aria-live="polite"
                >
                    {cargoPct}%
                </span>
                <p className="max-w-2xl min-w-0 flex-1 pl-2 text-left text-base font-semibold text-onlan-lime sm:pl-6 sm:text-lg md:pl-10 md:text-[60px] lg:pl-14">
                    Вантажів проходить без затримок
                </p>
            </div>
        </div>
    );
}

function ReasonItem({ item }: { item: (typeof reasons)[number] }) {
    return (
        <li className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <span
                className="shrink-0 font-bold tabular-nums leading-none text-onlan-blue text-[clamp(2.75rem,9vw,122px)] lg:text-[122px]"
                aria-hidden
            >
                {item.num}
            </span>
            <div className="min-w-0 flex-1 text-[clamp(1rem,2.5vw,24px)] font-semibold leading-snug text-onlan-black lg:text-[24px]">
                {item.lines.map((line, i) => (
                    <span key={`${item.num}-${i}`} className={i > 0 ? 'mt-1 block' : 'block'}>
                        {line}
                    </span>
                ))}
            </div>
        </li>
    );
}

export const WhyChooseUsSection = () => {
    return (
        <section className="w-full py-10" aria-labelledby="why-choose-heading">
            <div className="container mx-auto flex flex-col items-start px-4">
                <div className="flex items-center justify-start gap-2">
                    <div className="w-2 h-2 bg-onlan-lime rounded-full"></div>
                    <div className="py-2 px-4 border border-onlan-black rounded-full">
                        <p className="w-full text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            Переваги
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex w-full flex-col gap-10 md:mt-8 md:flex-row md:items-stretch md:gap-10 lg:gap-14">
                    <div className=" rounded-2xl">
                        <Image
                            src={WhyChooseUsImage}
                            alt="Автотранспорт для доставки вантажів ONLAN"
                            width={500}
                            height={500}
                            className=" rounded-2xl object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                        />
                    </div>
                    <div className="">
                        <Title
                            id="why-choose-heading"
                            title="Як ми вирішуємо ці проблеми"
                            type="h1"
                            className="mt-2 w-full min-w-0 max-w-none text-left text-xl! font-bold! leading-snug! text-onlan-black md:mt-3 md:text-2xl! lg:text-[60px]!"
                        />
                        <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12">
                            <ul className="flex flex-col gap-10 md:gap-12" role="list">
                                {columnLeft.map((item) => (
                                    <ReasonItem key={item.num} item={item} />
                                ))}
                            </ul>
                            <ul className="flex flex-col gap-10 md:gap-12" role="list">
                                {columnRight.map((item) => (
                                    <ReasonItem key={item.num} item={item} />
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 md:mt-12">
                            <Link to="/demo" className="inline-flex w-full sm:w-auto">
                                <Elements.Button
                                    variant="primary"
                                    size="md"
                                    className="h-12 w-full justify-center whitespace-nowrap sm:w-auto lg:h-14 lg:px-9"
                                >
                                    <span className="text-base font-semibold md:text-lg">Розрахувати вартість →</span>
                                </Elements.Button>
                            </Link>
                        </div>
                    </div>


                </div>
            </div>

            <WhyChooseUsStats />
        </section>
    );
};
