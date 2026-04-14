'use client';

import { Fragment } from 'react';
import { Elements } from '@/components/elements';
import {
    ABOUT_US_HISTORY_MILESTONES,
    ABOUT_US_HISTORY_SECTION,
    type HistoryMilestone,
} from '@/content/aboutUsHistory';
import { clsx } from 'clsx';

const BG_OPACITY_CLASS: Record<HistoryMilestone['bgOpacityPercent'], string> = {
    20: 'bg-onlan-blue/20',
    40: 'bg-onlan-blue/40',
    60: 'bg-onlan-blue/60',
    80: 'bg-onlan-blue/80',
    100: 'bg-onlan-blue',
};

function milestoneTextClass(opacity: HistoryMilestone['bgOpacityPercent']) {
    if (opacity <= 40) return 'text-onlan-blue';
    return 'text-onlan-white';
}

export const AboutUsHistorySection = () => {
    const sectionId = 'about-us-history-heading';

    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby={sectionId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            {ABOUT_US_HISTORY_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={sectionId}
                    title={ABOUT_US_HISTORY_SECTION.heading}
                    type="h2"
                    className="mt-6 mx-auto max-w-4xl text-balance text-center text-onlan-black"
                />

                <div className="mx-auto mt-10 w-full max-w-[1200px] lg:mt-14">
                    <div className="-mx-1 overflow-x-auto px-1 pb-2 [scrollbar-gutter:stable] md:mx-0 md:overflow-visible md:px-0">
                        <div className="mx-auto w-full min-w-[720px] max-w-[1200px] md:min-w-0">
                            <div className="grid grid-cols-5 gap-0">
                                {ABOUT_US_HISTORY_MILESTONES.map((m) => (
                                    <div
                                        key={m.year}
                                        className="flex min-w-0 flex-col items-stretch"
                                    >
                                        <div
                                            className={clsx(
                                                'flex aspect-square w-full items-center justify-center rounded-full p-2 text-center shadow-sm sm:p-3 md:p-4',
                                                BG_OPACITY_CLASS[m.bgOpacityPercent],
                                                milestoneTextClass(m.bgOpacityPercent),
                                            )}
                                        >
                                            <p className="text-balance text-[0.65rem] font-medium leading-snug sm:text-xs md:text-sm lg:text-[0.95rem]">
                                                {m.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="mt-6 flex w-full max-w-[1000px] justify-center mx-auto items-center md:mt-8"
                                role="presentation"
                            >
                                {ABOUT_US_HISTORY_MILESTONES.map((m, i) => (
                                    <Fragment key={`yr-${m.year}`}>
                                        {i > 0 && (
                                            <div
                                                className="h-px min-h-px min-w-[8px] flex-1 bg-onlan-blue/35"
                                                aria-hidden
                                            />
                                        )}
                                        <span className="shrink-0 px-1 text-center text-sm font-semibold tabular-nums text-onlan-blue first:pl-0 last:pr-0 md:px-1.5 md:text-base">
                                            {m.year}
                                        </span>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
