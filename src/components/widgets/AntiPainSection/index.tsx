'use client';

import clsx from 'clsx';

/* ═══════════════════════════════════ Data ═══════════════════════════════════ */

const RISKS = [
    { title: 'Митниця', copy: 'Затримки під час митного оформлення', consequence: 'зсув термінів доставки', kpi: 'Критична точка маршруту' },
    { title: 'Склади', copy: 'Простої під час зберігання', consequence: 'збільшення вартості логістики', kpi: 'Додаткові витрати' },
    { title: 'Перевізники', copy: 'Збої під час перевезень', consequence: 'ризики для доставки', kpi: 'Людський фактор' },
    { title: 'Документи', copy: 'Помилки в документах', consequence: 'зупинка вантажів', kpi: 'Блокування на етапі оформлення' },
    { title: 'Комунікація', copy: 'Відсутність координації', consequence: 'втрата контролю', kpi: 'Немає єдиного відповідального' },
] as const;

const IMPACTS = [
    'зриви поставок',
    'втрати часу і грошей',
    'проблеми з клієнтами',
    'ручний контроль процесу',
] as const;

/* ═══════════════════════════════ Pill Badge ═════════════════════════════════ */

function PillLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2.5 rounded-full border border-onlan-black/18 bg-white/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] backdrop-blur-[10px]">
            <span className="size-2 shrink-0 rounded-full bg-onlan-lime" aria-hidden />
            {children}
        </span>
    );
}

/* ═══════════════════════════════ Component ══════════════════════════════════ */

export function AntiPainSection() {
    return (
        <section
            className="relative overflow-hidden bg-onlan-white py-16 md:py-[84px] md:pb-24"
            aria-labelledby="anti-pain-heading"
        >
            {/* Subtle grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(13,13,13,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.35), transparent 92%)',
                    WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.35), transparent 92%)',
                }}
                aria-hidden
            />

            <div className="container relative z-10 mx-auto w-full">

                {/* ═══════════ HEADER ═══════════ */}
                <PillLabel>Ризики</PillLabel>

                <header className="mb-8 mt-6">
                    <h2
                        id="anti-pain-heading"
                        className="max-w-[720px] text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-onlan-black"
                    >
                        Де бізнес <span className="text-onlan-blue">втрачає контроль</span>
                        <br className="hidden sm:block" />
                        {' '}у міжнародній логістиці
                    </h2>

                    <p className="mt-2 max-w-[520px] text-[0.95rem] leading-relaxed text-onlan-blue/60">
                        На доставку впливають десятки факторів&nbsp;&mdash; і більшість із них не контролюються системами.
                    </p>
                </header>

                {/* ═══════════ RISK CARDS ═══════════ */}
                <div className="mb-12 grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                    {RISKS.map((card, i) => {
                        const isCenter =
                            i === RISKS.length - 1 && RISKS.length % 2 === 1;
                        const isActive = i === 0;

                        return (
                            <article
                                key={card.title}
                                className={clsx(
                                    'group relative rounded-[28px] border bg-white/72 p-6 backdrop-blur-[14px]',
                                    'transition-all duration-250 ease-out',
                                    'hover:-translate-y-1.5 hover:border-red-400 hover:shadow-[0_26px_56px_rgba(11,16,39,0.1)]',
                                    isActive
                                        ? 'border-onlan-blue/36 shadow-[0_0_0_1px_rgba(44,53,140,0.16),0_24px_50px_rgba(20,28,78,0.08)]'
                                        : 'border-onlan-blue/14 shadow-[0_20px_50px_rgba(11,16,39,0.06)]',
                                    isCenter && 'sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-9px)]',
                                )}
                            >
                                {/* Category */}
                                <div className="mb-4 flex items-center gap-2">
                                    <span
                                        className="size-2.5 shrink-0 rounded-full bg-onlan-lime shadow-[0_0_0_6px_rgba(201,222,0,0.12)]"
                                        aria-hidden
                                    />
                                    <h3 className="text-[0.85rem] font-semibold text-onlan-blue">
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Problem → consequence */}
                                <p className="text-[1.08rem] leading-[1.42] tracking-[-0.02em] text-onlan-black sm:max-w-[92%]">
                                    {card.copy}{' '}
                                    <span className="font-bold text-onlan-blue" aria-hidden>&rarr;</span>{' '}
                                    <span className="sr-only">— наслідок: </span>
                                    {card.consequence}
                                </p>

                                {/* KPI badge */}
                                <div className="mt-[18px] inline-flex items-center gap-2 rounded-full bg-onlan-blue/8 px-3 py-[7px] text-[0.78rem] font-semibold text-onlan-blue/60 transition-all duration-250 group-hover:opacity-100">
                                    <span className="text-base leading-none text-onlan-lime" aria-hidden>&bull;</span>
                                    {card.kpi}
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* ═══════════ IMPACT PANEL ═══════════ */}
                <div
                    className="relative rounded-[30px] border border-onlan-black/8 bg-linear-to-b from-white/72 to-white/86 p-5 shadow-[0_20px_50px_rgba(11,16,39,0.06)] backdrop-blur-[14px] md:p-7"
                >
                    {/* Dashed inner border */}
                    <div
                        className="pointer-events-none absolute inset-3 rounded-[20px] border border-dashed border-onlan-blue/14 md:inset-[18px]"
                        aria-hidden
                    />

                    {/* Impact header */}
                    <div className="relative z-10 mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 md:mb-[22px]">
                        <div>
                            <PillLabel>Наслідки</PillLabel>
                            <h3 className="mt-3 text-[1.35rem] font-bold leading-[1.15] tracking-[-0.03em] text-onlan-black">
                                Для бізнесу це означає:
                            </h3>
                        </div>

                        <p className="max-w-[330px] text-[0.96rem] leading-[1.45] text-onlan-blue/60">
                            Точки ризику швидко перетворюються на втрату маржі, дедлайнів і довіри клієнта.
                        </p>
                    </div>

                    {/* Impact grid */}
                    <div className="relative z-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                        {IMPACTS.map((text) => (
                            <div
                                key={text}
                                className="min-h-[112px] rounded-[22px] border border-onlan-black/8 bg-white/72 p-4 transition-all duration-220 hover:-translate-y-1 hover:border-onlan-lime/40 hover:bg-white"
                            >
                                <div
                                    className="mb-3.5 flex size-7 items-center justify-center rounded-full bg-onlan-lime text-[0.95rem] font-extrabold text-onlan-black shadow-[0_10px_20px_rgba(201,222,0,0.2)]"
                                    aria-hidden
                                >
                                    ✕
                                </div>
                                <p className="text-[0.98rem] leading-[1.35] text-onlan-black/90">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
