'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import heroImage from '@images/onlan-hero-logistics.png';
import { HOME_HERO } from '@/content/homeHero';

const iconClassName =
    'size-5 fill-none stroke-onlan-blue stroke-2 [stroke-linecap:round] [stroke-linejoin:round]';

const statusIconClassName =
    'size-[18px] fill-none stroke-onlan-blue stroke-2 [stroke-linecap:round] [stroke-linejoin:round]';

function ManagerIcon() {
    return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden>
            <path d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z" />
            <path d="M4 21C4 17.69 7.58 15 12 15C16.42 15 20 17.69 20 21" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7V12L15 15" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" className={iconClassName} aria-hidden>
            <path d="M12 3L19 6V11C19 16 15.5 19.5 12 21C8.5 19.5 5 16 5 11V6L12 3Z" />
        </svg>
    );
}

function DocumentsIcon() {
    return (
        <svg viewBox="0 0 24 24" className={statusIconClassName} aria-hidden>
            <path d="M7 3H14L18 7V21H7V3Z" />
            <path d="M14 3V7H18" />
            <path d="M9 13L11 15L15 11" />
        </svg>
    );
}

function RouteIcon() {
    return (
        <svg viewBox="0 0 24 24" className={statusIconClassName} aria-hidden>
            <path d="M8 6L4 10L8 14" />
            <path d="M16 18L20 14L16 10" />
            <path d="M4 10H14C17.3 10 20 12.7 20 16" />
        </svg>
    );
}

function TruckIcon() {
    return (
        <svg viewBox="0 0 24 24" className={statusIconClassName} aria-hidden>
            <rect x="2" y="6" width="13" height="10" />
            <path d="M15 9H19L22 12V16H15V9Z" />
            <circle cx="7" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg viewBox="0 0 24 24" className={statusIconClassName} aria-hidden>
            <path d="M18 16V11C18 7.69 15.31 5 12 5C8.69 5 6 7.69 6 11V16L4 18H20L18 16Z" />
            <path d="M10 21H14" />
        </svg>
    );
}

const ADVANTAGE_ICONS = {
    manager: ManagerIcon,
    support: ClockIcon,
    predictable: ShieldIcon,
} as const;

const STATUS_ICONS = {
    documents: DocumentsIcon,
    route: RouteIcon,
    cargo: TruckIcon,
    updates: BellIcon,
} as const;

export const HomeHeroSection = () => {
    const headingId = 'home-hero-heading';

    return (
        <section
            className="w-full bg-onlan-white min-[1200px]:h-[calc(100dvh-96px)]"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto flex h-full px-4 py-10 min-[1200px]:items-center min-[1200px]:py-6">
                <div className="grid w-full items-center gap-10 min-[1200px]:grid-cols-[0.85fr_1.15fr] min-[1200px]:gap-10">
                    <div className="min-w-0">
                        <div className="mb-4 inline-flex rounded-full bg-onlan-blue/12 px-4 py-2 text-sm font-bold text-onlan-blue">
                            {HOME_HERO.badge}
                        </div>

                        <h1
                            id={headingId}
                            className="mb-4 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-onlan-black"
                        >
                            {HOME_HERO.titleLines[0]}
                            <br />
                            {HOME_HERO.titleLines[1]}
                            <br />
                            <span className="text-onlan-blue">{HOME_HERO.titleHighlight}</span>
                        </h1>

                        <p className="mb-5 max-w-[520px] text-base font-medium leading-snug text-[#33395f] min-[1200px]:text-[17px] min-[1200px]:leading-[1.4]">
                            {HOME_HERO.description}
                        </p>

                        <Link
                            to="/#contact"
                            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-onlan-blue px-6 text-base font-bold text-onlan-white no-underline transition-colors hover:bg-onlan-blue/90 min-[768px]:w-auto min-[768px]:px-8"
                        >
                            {HOME_HERO.cta}
                            <span aria-hidden>→</span>
                        </Link>

                        <ul className="mt-6 grid max-w-[560px] list-none gap-5 sm:grid-cols-2 min-[1200px]:mt-8 min-[1200px]:grid-cols-3 min-[1200px]:gap-4">
                            {HOME_HERO.advantages.map((advantage) => {
                                const Icon = ADVANTAGE_ICONS[advantage.key];

                                return (
                                    <li key={advantage.key} className="flex items-start gap-2.5">
                                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-onlan-blue/8">
                                            <Icon />
                                        </span>
                                        <div>
                                            <strong className="mb-0.5 block text-sm font-extrabold text-onlan-blue">
                                                {advantage.title}
                                            </strong>
                                            <p className="m-0 text-[13px] leading-snug text-[#2f3150]">
                                                {advantage.description}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="relative min-h-0 min-[1200px]:flex min-[1200px]:h-full min-[1200px]:items-center">
                        <div className="relative w-full overflow-hidden rounded-[24px] bg-[#f4f7ff] min-[1200px]:max-h-[calc(100dvh-128px)]">
                            <Image
                                src={heroImage}
                                alt="Міжнародна логістика OnLan"
                                width={1200}
                                height={720}
                                className="block h-auto w-full object-contain"
                                priority
                                sizes="(max-width: 1200px) 100vw, 58vw"
                            />

                            <div className="absolute inset-x-3 bottom-3 grid grid-cols-1 gap-2 rounded-xl bg-white/90 px-3 py-3 shadow-[0_12px_32px_rgba(31,38,96,0.16)] backdrop-blur-xl sm:grid-cols-2 sm:gap-3 md:inset-x-[4%] md:bottom-4 lg:grid-cols-4 lg:gap-0 lg:px-3 lg:py-3">
                                {HOME_HERO.statusCards.map((card, index) => {
                                    const Icon = STATUS_ICONS[card.key];
                                    const isLast = index === HOME_HERO.statusCards.length - 1;

                                    return (
                                        <div
                                            key={card.key}
                                            className={`flex items-center gap-2 px-0 lg:px-2.5 ${
                                                !isLast
                                                    ? 'lg:border-r lg:border-onlan-blue/14'
                                                    : ''
                                            }`}
                                        >
                                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-onlan-blue/8">
                                                <Icon />
                                            </span>
                                            <p className="m-0 text-[12px] font-normal leading-tight text-[#151936] sm:text-[13px]">
                                                {card.label}
                                                <span className="block font-normal">{card.status}</span>
                                            </p>
                                            <span
                                                className={`ml-auto size-2 shrink-0 rounded-full ${
                                                    card.dot === 'green'
                                                        ? 'bg-[#77d87c]'
                                                        : 'bg-[#7c8cff]'
                                                }`}
                                                aria-hidden
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
