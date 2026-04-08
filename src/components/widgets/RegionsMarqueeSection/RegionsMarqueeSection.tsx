const REGIONS = [
    'Китай',
    'Турція',
    'Кавказ',
    'Близька Азія',
    'Європа',
    'США',
    'Велика Британія',
] as const;

/** Відстань між назвами регіонів */
const BETWEEN_REGIONS = 'gap-x-10 md:gap-x-14 lg:gap-x-16';
/** Від крапки до слова всередині одного пункту */
const DOT_TO_LABEL = 'gap-x-2.5 md:gap-x-3';
const STRIP_END_PAD = 'pr-12 md:pr-16 lg:pr-20';

function MarqueeStrip({ idSuffix }: { idSuffix: 'a' | 'b' }) {
    return (
        <ul
            className={`flex shrink-0 items-center ${BETWEEN_REGIONS} ${STRIP_END_PAD}`}
            aria-hidden={idSuffix === 'b'}
        >
            {REGIONS.map((label) => (
                <li
                    key={`${idSuffix}-${label}`}
                    className={`flex shrink-0 items-center ${DOT_TO_LABEL}`}
                >
                    <span className="select-none text-onlan-lime" aria-hidden>
                        ●
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.12em] text-onlan-blue md:text-base">
                        {label}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export function RegionsMarqueeSection() {
    return (
        <section
            className="relative w-full overflow-hidden border-y border-onlan-lavender/45 bg-onlan-white"
            aria-label="Напрямки доставки"
        >
            {/* Вертикальні відступи як у контентних блоків сайту */}
            <div className="relative py-8 md:py-10 lg:py-12">
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 z-1 w-14 bg-linear-to-r from-onlan-white to-transparent md:w-20 lg:w-24"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-1 w-14 bg-linear-to-l from-onlan-white to-transparent md:w-20 lg:w-24"
                    aria-hidden
                />

                <div className="relative overflow-hidden">
                    <div className="regions-marquee-track flex w-max">
                        <MarqueeStrip idSuffix="a" />
                        <MarqueeStrip idSuffix="b" />
                    </div>
                </div>
            </div>
        </section>
    );
}
