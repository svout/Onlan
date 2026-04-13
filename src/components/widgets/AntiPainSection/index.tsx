'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Elements } from '@/components/elements';
import { Link } from '@/lib/router';
import { LogoSection } from '@/assets/icons/LogoSection';

/* ═══════════════════════════════════ Data ═══════════════════════════════════ */

const CHAIN_NODES = [
    { id: 'customs', icon: 'customs', title: 'Митниця', description: 'Затримки через перевірки та оформлення', badge: 'Delay' },
    { id: 'warehouse', icon: 'warehouse', title: 'Склади', description: 'Простої та неузгодженість процесів', badge: 'Risk' },
    { id: 'carrier', icon: 'carrier', title: 'Перевізники', description: 'Людський фактор і збої в дорозі', badge: 'Error' },
    { id: 'comms', icon: 'comms', title: 'Комунікація', description: 'Відсутність контролю між учасниками', badge: 'Delay' },
    { id: 'docs', icon: 'docs', title: 'Документи', description: 'Помилки перед відправкою', badge: 'Error' },
] as const;

const TRANSITION_LINE =
    'Саме на цьому принципі побудована робота OnLan — повний контроль логістичного ланцюга та відповідальність за кожен етап доставки.';

/* ═══════════════════════════════ Icons (stroke, currentColor — OnLan palette) ═════════════════════════════════ */

type ChainIconName = (typeof CHAIN_NODES)[number]['icon'];

function ChainNodeIcon({ name, className }: { name: ChainIconName; className?: string }) {
    const cn = clsx('size-7 shrink-0 md:size-8', className);
    const svg = { className: cn, viewBox: '0 0 32 32', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' } as const;
    const stroke = {
        stroke: 'currentColor',
        strokeWidth: 2,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    };

    switch (name) {
        case 'customs':
            return (
                <svg {...svg} aria-hidden>
                    <path d="M16 3L27 8.5V15.5C27 22.5 22 28 16 29.5C10 28 5 22.5 5 15.5V8.5L16 3Z" {...stroke} />
                    <path d="M12 16L15 19L21 13" {...stroke} opacity={0.5} />
                </svg>
            );
        case 'warehouse':
            return (
                <svg {...svg} aria-hidden>
                    <path d="M4 14L16 6L28 14" {...stroke} />
                    <path d="M7 13V26H25V13" {...stroke} />
                    <path d="M13 26V19H19V26" {...stroke} opacity={0.5} />
                </svg>
            );
        case 'carrier':
            return (
                <svg {...svg} aria-hidden>
                    <path d="M3 18V10H20V18" {...stroke} />
                    <path d="M20 12H25L29 18V23H27" {...stroke} />
                    <path d="M3 23H5" {...stroke} />
                    <circle cx="9" cy="23" r="3" {...stroke} opacity={0.5} />
                    <circle cx="23" cy="23" r="3" {...stroke} opacity={0.5} />
                    <path d="M12 23H20" {...stroke} />
                </svg>
            );
        case 'comms':
            return (
                <svg {...svg} aria-hidden>
                    <path d="M8 10H4V22L8 19H18V10H14" {...stroke} />
                    <path d="M14 6H28V18H24L20 21V18H14V6Z" {...stroke} opacity={0.5} />
                </svg>
            );
        case 'docs':
            return (
                <svg {...svg} aria-hidden>
                    <path d="M8 4H20L26 10V28H8V4Z" {...stroke} />
                    <path d="M20 4V10H26" {...stroke} />
                    <path d="M13 16H21" {...stroke} opacity={0.5} />
                    <path d="M13 20H18" {...stroke} opacity={0.5} />
                </svg>
            );
    }
}

/* ═══════════════════════════════ Component ══════════════════════════════════ */

export function AntiPainSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);
    const [hoveredChain, setHoveredChain] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-onlan-white py-16 md:py-20 lg:py-24"
            aria-labelledby="anti-pain-heading"
        >
            {/* Branding watermark — top-right (z-0 so content z-10 paints above; opacity-100 overrides LogoSection default opacity-40) */}
            <div
                className="pointer-events-none absolute right-[-120px] rotate-12 top-[-60px] z-0 flex justify-end"
                aria-hidden
            >
                <LogoSection className="h-auto w-[200px] rotate-[-10deg] text-onlan-blue/35 md:w-[280px] lg:w-[640px]" />
            </div>

            <div className="container relative z-10 mx-auto">

                {/* ═══════════ PILL ═══════════ */}
                <div className="flex items-center justify-start gap-2">
                    <div className="size-2 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            Ризики
                        </p>
                    </div>
                </div>

                {/* ═══════════ HEADER ═══════════ */}
                <header
                    className={clsx(
                        'mt-6 transition-all duration-700 ease-out md:mt-8',
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                    )}
                >
                    <h2
                        id="anti-pain-heading"
                        className="max-w-3xl text-xl font-bold leading-snug text-onlan-black md:text-2xl lg:text-[60px] lg:leading-[1.1]"
                    >
                        У логістиці вирішує не лише маршрут&nbsp;&mdash;{' '}
                        <span className="text-onlan-blue">вирішує контроль процесу</span>
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-onlan-black/60 md:mt-4 md:text-base">
                        На доставку впливають десятки факторів&nbsp;&mdash; і більшість із них не контролюються системами.
                    </p>
                </header>

                {/* ═══════════ SUPPLY CHAIN FLOW ═══════════ */}
                <div
                    className="relative mt-10 md:mt-14"
                    onMouseEnter={() => setHoveredChain(true)}
                    onMouseLeave={() => setHoveredChain(false)}
                >
                    {/* Desktop: horizontal chain with connecting line */}
                    <div className="hidden lg:block">
                        {/* Flow line behind cards */}
                        <div className="absolute left-0 right-0 top-1/2 z-0 h-px -translate-y-1/2">
                            <div
                                className={clsx(
                                    'h-full w-full transition-all duration-500',
                                    hoveredChain ? 'bg-red-400/50' : 'bg-onlan-lavender',
                                )}
                            />
                            {/* Animated pulse on hover */}
                            {hoveredChain && (
                                <div className="absolute inset-0 animate-pulse bg-linear-to-r from-transparent via-red-400/30 to-transparent" />
                            )}
                        </div>

                        <div className="relative z-10 grid grid-cols-5 gap-4">
                            {CHAIN_NODES.map((node, i) => (
                                <ChainCard
                                    key={node.id}
                                    node={node}
                                    index={i}
                                    visible={visible}
                                    chainHovered={hoveredChain}
                                />
                            ))}
                        </div>

                        {/* Arrow connectors */}
                        <div className="absolute left-0 right-0 top-1/2 z-5 flex -translate-y-1/2 justify-around px-[calc(20%-2rem)]">
                            {[0, 1, 2, 3].map((i) => (
                                <span
                                    key={i}
                                    className={clsx(
                                        'text-lg transition-colors duration-300',
                                        hoveredChain ? 'text-red-400' : 'text-onlan-lavender',
                                    )}
                                    aria-hidden
                                >
                                    →
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tablet / mobile: zig-zag vertical chain */}
                    <div className="lg:hidden">
                        <div className="flex flex-col gap-4">
                            {CHAIN_NODES.map((node, i) => (
                                <div key={node.id} className="flex items-stretch gap-4">
                                    {/* Vertical line + dot */}
                                    <div className="flex w-6 shrink-0 flex-col items-center">
                                        <div
                                            className={clsx(
                                                'size-3 shrink-0 rounded-full border-2 transition-colors duration-300',
                                                hoveredChain
                                                    ? 'border-red-400 bg-red-400/20'
                                                    : 'border-onlan-blue bg-onlan-lavender',
                                            )}
                                        />
                                        {i < CHAIN_NODES.length - 1 && (
                                            <div
                                                className={clsx(
                                                    'w-px flex-1 transition-colors duration-300',
                                                    hoveredChain ? 'bg-red-400/40' : 'bg-onlan-lavender',
                                                )}
                                            />
                                        )}
                                    </div>

                                    <ChainCard
                                        node={node}
                                        index={i}
                                        visible={visible}
                                        chainHovered={hoveredChain}
                                        mobile
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══════════ CTA ═══════════ */}
                <div
                    className={clsx(
                        'mt-10 transition-all duration-700 ease-out md:mt-14',
                        visible ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-6 opacity-0',
                    )}
                >
                    <Link to="/#why-choose" className="inline-flex w-full sm:w-auto">
                        <Elements.Button
                            variant="primary"
                            size="md"
                            className="h-12 w-full justify-center whitespace-nowrap sm:w-auto lg:h-14 lg:px-9"
                        >
                            <span className="text-base font-semibold md:text-lg">
                                Як OnLan вирішує ці ризики →
                            </span>
                        </Elements.Button>
                    </Link>
                </div>

                {/* ═══════════ TRANSITION LINE ═══════════ */}

            </div>
        </section>
    );
}

/* ═══════════════════════════════ Chain Card ═════════════════════════════════ */

type ChainNode = (typeof CHAIN_NODES)[number];

function ChainCard({
    node,
    index,
    visible,
    chainHovered,
    mobile,
}: {
    node: ChainNode;
    index: number;
    visible: boolean;
    chainHovered: boolean;
    mobile?: boolean;
}) {
    const delay = index * 100;

    return (
        <article
            className={clsx(
                'group relative flex flex-col rounded-2xl border bg-onlan-white p-5 transition-all duration-300',
                mobile ? 'mb-0 flex-1' : '',
                chainHovered
                    ? 'border-red-400/50 shadow-[0_0_16px_rgba(248,113,113,0.12)]'
                    : 'border-onlan-lavender shadow-card hover:border-onlan-blue/30 hover:shadow-[0_4px_20px_rgba(44,53,140,0.1)]',
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0',
            )}
            style={{
                transitionDelay: visible ? `${delay}ms` : '0ms',
            }}
        >
            {/* Badge */}
            <span
                className={clsx(
                    'absolute right-4 top-4 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider transition-colors duration-300',
                    chainHovered
                        ? 'bg-red-50 text-red-500'
                        : 'bg-onlan-lavender/50 text-onlan-blue/60',
                )}
            >
                {node.badge}
            </span>

            {/* Icon */}
            <span
                className={clsx(
                    'text-onlan-blue transition-transform duration-300',
                    chainHovered && 'animate-[shake_0.4s_ease-in-out]',
                )}
            >
                <ChainNodeIcon name={node.icon} />
            </span>

            {/* Title */}
            <h3 className="mt-3 text-base font-bold text-onlan-black md:text-lg">
                {node.title}
            </h3>

            {/* Description */}
            <p className="mt-1.5 text-sm leading-snug text-onlan-black/60">
                {node.description}
            </p>

            {/* Disruption indicator on hover */}
            <div
                className={clsx(
                    'pointer-events-none absolute inset-0 rounded-2xl border-2 transition-opacity duration-300',
                    chainHovered
                        ? 'border-red-400/30 opacity-100'
                        : 'border-transparent opacity-0',
                )}
                aria-hidden
            />
        </article>
    );
}
