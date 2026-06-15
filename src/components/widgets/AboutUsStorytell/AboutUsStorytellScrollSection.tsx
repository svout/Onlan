'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ABOUT_US_STORYTELL_SCROLL } from '@/content/aboutUsStorytell';

type StoryStep =
    | { id: string; type: 'quote' }
    | { id: string; type: 'subtitle' }
    | { id: string; type: 'paragraph'; text: string };

const STORY_STEPS: StoryStep[] = [
    { id: 'quote', type: 'quote' },
    { id: 'subtitle', type: 'subtitle' },
    ...ABOUT_US_STORYTELL_SCROLL.paragraphs.map((text, index) => ({
        id: `paragraph-${index}`,
        type: 'paragraph' as const,
        text,
    })),
];

function StoryStepContent({ step }: { step: StoryStep }) {
    if (step.type === 'quote') {
        return (
            <div className="flex flex-col items-center">
                <h2 className="max-w-4xl text-balance text-3xl font-semibold leading-tight text-onlan-black md:text-5xl lg:text-[56px] lg:leading-[1.12]">
                    {ABOUT_US_STORYTELL_SCROLL.quote}
                </h2>

                <div className="mt-10 flex items-center gap-4 md:mt-12">
                    <div className="size-12 shrink-0 rounded-full bg-onlan-lime md:size-14" />
                    <div className="text-left">
                        <p className="text-lg font-semibold text-onlan-black md:text-xl">
                            {ABOUT_US_STORYTELL_SCROLL.authorName}
                        </p>
                        <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-onlan-blue md:text-base">
                            {ABOUT_US_STORYTELL_SCROLL.authorRole}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (step.type === 'subtitle') {
        return (
            <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-onlan-blue md:text-sm">
                    {ABOUT_US_STORYTELL_SCROLL.rightEyebrow}
                </p>
                <p className="mt-5 text-balance text-2xl font-semibold leading-snug text-onlan-black md:text-3xl lg:text-4xl">
                    {ABOUT_US_STORYTELL_SCROLL.subtitle}
                </p>
            </div>
        );
    }

    return (
        <p className="max-w-3xl text-balance text-lg leading-relaxed text-onlan-black/85 md:text-xl md:leading-8 lg:text-2xl">
            {step.text}
        </p>
    );
}

export function AboutUsStorytellScrollSection() {
    const headingId = 'about-us-storytell-scroll-heading';
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const updateActiveStep = useCallback(() => {
        const scrollArea = scrollAreaRef.current;
        if (!scrollArea) {
            return;
        }

        const rect = scrollArea.getBoundingClientRect();
        const stepHeight = window.innerHeight;

        if (rect.top > 0) {
            setActiveStep(0);
            return;
        }

        if (rect.bottom <= stepHeight) {
            setActiveStep(STORY_STEPS.length - 1);
            return;
        }

        const progress = -rect.top;
        const nextStep = Math.min(
            STORY_STEPS.length - 1,
            Math.max(0, Math.floor(progress / stepHeight)),
        );

        setActiveStep(nextStep);
    }, []);

    useEffect(() => {
        updateActiveStep();
        window.addEventListener('scroll', updateActiveStep, { passive: true });
        window.addEventListener('resize', updateActiveStep);

        return () => {
            window.removeEventListener('scroll', updateActiveStep);
            window.removeEventListener('resize', updateActiveStep);
        };
    }, [updateActiveStep]);

    return (
        <section className="relative w-full bg-onlan-white" aria-labelledby={headingId}>
            <div
                ref={scrollAreaRef}
                className="relative"
                style={{ height: `${STORY_STEPS.length * 100}vh` }}
            >
                <div className="sticky top-0 flex h-screen flex-col">
                    <div className="container mx-auto shrink-0 px-4 pt-12 md:pt-16">
                        <div className="flex w-full items-center justify-start gap-2">
                            <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                            <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                                <p className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                                    {ABOUT_US_STORYTELL_SCROLL.eyebrow}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-1 items-center justify-center px-4">
                        <div className="relative mx-auto flex min-h-[280px] w-full max-w-4xl items-center justify-center text-center md:min-h-[360px]">
                            {STORY_STEPS.map((step, index) => {
                                const isActive = activeStep === index;

                                return (
                                    <div
                                        key={step.id}
                                        id={index === 0 ? headingId : undefined}
                                        className={`absolute inset-x-0 mx-auto flex justify-center transition-all duration-700 ease-out ${
                                            isActive
                                                ? 'translate-y-0 opacity-100'
                                                : 'pointer-events-none translate-y-8 opacity-0'
                                        }`}
                                        aria-hidden={!isActive}
                                    >
                                        <StoryStepContent step={step} />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
                            {STORY_STEPS.map((step, index) => (
                                <span
                                    key={step.id}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        activeStep === index
                                            ? 'w-8 bg-onlan-blue'
                                            : 'w-1.5 bg-onlan-black/15'
                                    }`}
                                    aria-hidden
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
