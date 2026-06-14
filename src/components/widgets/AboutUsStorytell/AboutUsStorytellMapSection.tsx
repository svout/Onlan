'use client';

import { useEffect, useRef, useState } from 'react';
import { ABOUT_US_STORYTELL_MAP } from '@/content/aboutUsStorytell';
import { AboutUsStorytellMapSvg } from './AboutUsStorytellMapSvg';

function highlightText(text: string, highlights: readonly string[]) {
    if (!highlights.length) {
        return text;
    }

    const highlight = highlights[0];
    const index = text.indexOf(highlight);

    if (index === -1) {
        return text;
    }

    return (
        <>
            {text.slice(0, index)}
            <strong className="font-bold text-onlan-blue">{highlight}</strong>
            {text.slice(index + highlight.length)}
        </>
    );
}

type TextGroupProps = {
    text: string;
    highlights: readonly string[];
    index: number;
};

function TextGroup({ text, highlights, index }: TextGroupProps) {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = itemRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={itemRef}
            className="transition-all duration-700"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${index * 90}ms`,
            }}
        >
            <p className="text-base font-medium leading-relaxed text-onlan-black/85 md:text-[17px] md:leading-[1.65]">
                {highlightText(text, highlights)}
            </p>
            {index < ABOUT_US_STORYTELL_MAP.textGroups.length - 1 && (
                <div className="my-5 h-0.5 w-10 bg-onlan-lime md:my-6" />
            )}
        </div>
    );
}

export function AboutUsStorytellMapSection() {
    const headingId = 'about-us-storytell-map-heading';

    return (
        <>
            <style>{`
                @keyframes aboutStorytellRouteMove {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -28; }
                }
                .about-storytell-route-line {
                    animation: aboutStorytellRouteMove 2.8s ease-in-out infinite;
                }
            `}</style>

            <section
                className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
                aria-labelledby={headingId}
            >
                <div className="container mx-auto px-4">
                    <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-3xl bg-onlan-white p-8 shadow-[0_20px_60px_rgba(44,53,140,0.08)] md:p-12 lg:grid lg:min-h-[430px] lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center lg:gap-12 lg:p-[72px]">
                        <div
                            className="pointer-events-none absolute -bottom-20 -left-20 size-[180px] rounded-full border-[34px] border-onlan-blue opacity-25 lg:opacity-95"
                            aria-hidden
                        />

                        <div className="relative z-10">
                            <div className="mb-8 inline-flex rounded-full border border-onlan-blue/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-onlan-blue">
                                {ABOUT_US_STORYTELL_MAP.eyebrow}
                            </div>

                            <h2
                                id={headingId}
                                className="max-w-md text-balance text-3xl font-bold leading-[1.18] text-onlan-black md:text-4xl"
                            >
                                {ABOUT_US_STORYTELL_MAP.heading}
                                <span className="text-onlan-blue">
                                    {' '}
                                    {ABOUT_US_STORYTELL_MAP.headingHighlight}
                                </span>
                            </h2>

                            <div className="mt-7 h-0.5 w-11 bg-onlan-lime" />
                        </div>

                        <div className="relative z-10 my-10 w-full max-w-[620px] justify-self-center lg:my-0">
                            <AboutUsStorytellMapSvg />
                        </div>

                        <div className="relative z-10 max-w-[420px] justify-self-end">
                            {ABOUT_US_STORYTELL_MAP.textGroups.map((group, index) => (
                                <TextGroup
                                    key={group.text}
                                    text={group.text}
                                    highlights={group.highlights}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
