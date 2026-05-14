'use client';

import { Link } from 'react-router';
import type { ServiceContent } from '@/types/Service.interface';
import { Elements } from '@/components/elements';
import { ServiceIconVisual } from '@/components/widgets/HowItWork/ServiceIcons';

interface ServiceHeroProps {
    service: ServiceContent;
}

export const ServiceHero = ({ service }: ServiceHeroProps) => {
    return (
        <section
            className="relative w-full overflow-hidden border-t border-onlan-lime/25"
            style={{ backgroundColor: '#2D368B' }}
            aria-labelledby={`service-hero-${service.slug}`}
        >
            <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
                <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
                    <div className="flex w-full flex-col md:w-[58%]">
                        <div className="flex items-center justify-start gap-2">
                            <div className="size-2 rounded-full bg-onlan-lime" />
                            <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-onlan-lime backdrop-blur-sm md:text-sm">
                                {service.tagLabel}
                            </span>
                        </div>

                        <h1
                            id={`service-hero-${service.slug}`}
                            className="mt-6 text-balance text-3xl font-bold leading-tight text-white md:mt-8 md:text-4xl lg:text-[52px] lg:leading-[1.05]"
                        >
                            {service.title}
                        </h1>

                        <p className="mt-5 max-w-[640px] text-base font-light leading-7 text-onlan-lavender md:mt-6 md:text-lg md:leading-8">
                            {service.lead}
                        </p>

                        {service.highlights.length > 0 && (
                            <ul className="mt-7 grid w-full max-w-[640px] grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8">
                                {service.highlights.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3 text-sm font-medium leading-snug text-white md:text-base"
                                    >
                                        <span
                                            aria-hidden
                                            className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-onlan-lime"
                                        >
                                            <svg
                                                width="11"
                                                height="9"
                                                viewBox="0 0 12 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-onlan-blue"
                                            >
                                                <path
                                                    d="M1 5.2L4.2 8.4L11 1"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12">
                            <Link to="/#contact" className="inline-flex w-full sm:w-auto">
                                <Elements.Button
                                    variant="accent"
                                    size="md"
                                    className="h-12 w-full justify-center whitespace-nowrap font-semibold sm:w-auto sm:min-w-[240px] lg:h-14"
                                >
                                    Розрахувати вартість →
                                </Elements.Button>
                            </Link>
                            <Link to="/about-us" className="inline-flex w-full sm:w-auto">
                                <Elements.Button
                                    variant="ghost"
                                    size="md"
                                    className="h-12 w-full justify-center whitespace-nowrap font-semibold text-white hover:bg-white/10 sm:w-auto sm:min-w-[200px] lg:h-14"
                                >
                                    Про OnLan
                                </Elements.Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex w-full justify-center md:w-[42%] md:justify-end">
                        <div className="relative flex aspect-[597/543] w-full max-w-[min(100%,520px)] items-center justify-center rounded-[20px] border border-onlan-lime/25 bg-gradient-to-br from-white/12 via-[#1a2260] to-[#141a4a] p-10 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] md:max-w-[520px] md:p-14">
                            <div
                                className="pointer-events-none absolute -left-2 -top-2 select-none bg-gradient-to-b from-white via-onlan-lavender/90 to-white/20 bg-clip-text font-extrabold leading-none text-transparent text-[120px] md:text-[160px]"
                                aria-hidden
                            >
                                {service.number}
                            </div>
                            <ServiceIconVisual id={service.iconId} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
