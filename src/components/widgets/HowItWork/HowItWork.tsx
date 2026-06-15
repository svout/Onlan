'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-router';
import type { HowItWorkProps } from '@/types/HowItWorks.interface';

/** Easing from reference: cubic-bezier(0.25, 0.46, 0.45, 0.94) */
const SLIDE_EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

/** Sticky stack panel — brand blue; content tuned for dark background */
const PANEL_BG = '#2D368B';

export function HowItWork(props: HowItWorkProps) {
    const { index, total, number, title, description, slug, backgroundImageSrc, panelImageSrc } =
        props;
    const serviceHref = `/services/${slug}`;
    const listRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useLayoutEffect(() => {
        const list = listRef.current;
        const indicator = indicatorRef.current;
        if (!list || !indicator) {
            return;
        }
        const update = () => {
            const h = list.offsetHeight;
            indicator.style.top = `${(h / total) * index}px`;
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(list);
        return () => ro.disconnect();
    }, [index, total, title, description]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) {
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={containerRef}
            className="sticky top-0 min-h-dvh w-full border-t border-onlan-lime/25 overflow-hidden"
            style={{
                zIndex: 10 + index,
                backgroundColor: PANEL_BG,
            }}
            aria-labelledby={`service-step-title-${index}`}
        >
            {/* Photo background + single brand scrim for readable type */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImageSrc})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#2D368B]/93 from-[8%] via-[#2D368B]/72 via-[42%] to-[#1a2058]/82" />
            </div>

            <div className="relative z-[1] flex min-h-dvh w-full flex-col justify-center">
                <div className="container mx-auto flex w-full flex-col gap-8 px-4 pb-12 pt-4 sm:pb-14 md:gap-10">
                    <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
                        <div
                            className="flex w-full flex-col md:w-[42%]"
                            style={{
                                transform: isVisible ? 'translateX(0)' : 'translateX(-80px)',
                                transition: `transform 0.8s ${SLIDE_EASE}, opacity 0.5s ease-out`,
                                opacity: isVisible ? 1 : 0,
                            }}
                        >
                            <div className="flex items-center justify-start gap-2">
                                <div className="w-2 h-2 bg-onlan-lime rounded-full"></div>
                                <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-onlan-lime uppercase backdrop-blur-sm md:text-sm">
                                    Наші Послуги
                                </span>
                            </div>


                            <div
                                className="mt-2 select-none bg-gradient-to-b from-white via-onlan-lavender/90 to-white/20 bg-clip-text font-extrabold leading-[0.9] text-transparent [font-size:clamp(7rem,22vw,12rem)] md:mt-0 md:text-[11rem]"
                                aria-hidden
                            >
                                {number}
                            </div>

                            <div
                                ref={listRef}
                                className="relative mt-4 flex min-h-32 flex-col gap-3.5 border-l border-white/25 pl-6 md:mt-6"
                            >
                                <div
                                    ref={indicatorRef}
                                    className="pointer-events-none absolute left-0 h-3 w-7 -translate-x-[9px] rotate-90 rounded-sm bg-gradient-to-b from-onlan-lime via-white/50 to-transparent shadow-[0_0_14px_rgba(213,232,45,0.45)]"
                                    style={{ top: 0 }}
                                    aria-hidden
                                />
                                <h2
                                    id={`service-step-title-${index}`}
                                    className="text-[22px] font-medium leading-snug text-white md:text-[26px] md:leading-8"
                                >
                                    {title}
                                </h2>
                                <p className="text-base font-light leading-6 text-onlan-lavender md:text-lg md:leading-7">
                                    {description}
                                </p>
                                <div className="mt-6">
                                    <Link
                                        to={serviceHref}
                                        className="btn btn-accent btn-md inline-flex h-12 min-h-12 w-full max-w-md items-center justify-center gap-2 px-8 font-semibold text-onlan-black shadow-none sm:w-auto"
                                    >
                                        Більше про послугу
                                        <span aria-hidden>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex w-full justify-center md:w-[52%] md:justify-end"
                            style={{
                                transform: isVisible ? 'translateX(0)' : 'translateX(80px)',
                                transition: `transform 0.8s ${SLIDE_EASE} 0.15s, opacity 0.5s ease-out 0.15s`,
                                opacity: isVisible ? 1 : 0,
                            }}
                        >
                            <div className="relative aspect-[597/543] w-full max-w-[min(100%,520px)] overflow-hidden rounded-[20px] border border-onlan-lime/25 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] md:max-w-[560px]">
                                <Image
                                    src={panelImageSrc}
                                    alt={title}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, 560px"
                                />
                                <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a2058]/55 via-transparent to-transparent"
                                    aria-hidden
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
