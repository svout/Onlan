'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import {
    FaArrowTrendUp,
    FaHandshake,
    FaShieldHalved,
} from 'react-icons/fa6';
import { MdOutlineVisibility } from 'react-icons/md';
import valuesArc from '@/assets/icons/AboutUsValuesArc.svg';
import { Elements } from '@/components/elements';
import {
    ABOUT_US_VALUES,
    ABOUT_US_VALUES_SECTION,
    type AboutUsValueIconKey,
} from '@/content/aboutUsValues';

const VALUE_ICONS: Record<
    AboutUsValueIconKey,
    ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
    partnership: FaHandshake,
    transparency: MdOutlineVisibility,
    reliability: FaShieldHalved,
    growth: FaArrowTrendUp,
};

export const AboutUsValuesSection = () => {
    const sectionId = 'about-us-values-heading';

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
                            {ABOUT_US_VALUES_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={sectionId}
                    title={ABOUT_US_VALUES_SECTION.heading}
                    type="h2"
                    className="mt-6 mx-auto max-w-4xl text-balance text-center text-onlan-black"
                />

                <ul className="mx-auto mt-10 grid w-full max-w-[1200px] list-none grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:mt-12 lg:gap-8">
                    {ABOUT_US_VALUES.map((item) => {
                        const Icon = VALUE_ICONS[item.icon];
                        return (
                            <li key={item.title} className="flex">
                                <article className="relative flex min-h-[260px] w-full flex-1 flex-col overflow-hidden rounded-2xl border border-onlan-black/10 bg-onlan-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:min-h-[280px] md:p-8">
                                    <div className="absolute left-6 top-6 z-10 md:left-8 md:top-8">
                                        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-onlan-lime text-onlan-blue md:size-14">
                                            <Icon className="size-6 md:size-7" aria-hidden />
                                        </span>
                                    </div>

                                    <div
                                        className="pointer-events-none absolute bottom-0 right-0 z-0 w-[min(52%,173px)] select-none md:w-[min(48%,173px)]"
                                        aria-hidden
                                    >
                                        <Image
                                            src={valuesArc}
                                            alt=""
                                            width={173}
                                            height={158}
                                            className="h-auto w-full object-contain"
                                        />
                                    </div>

                                    <div className="relative z-10 flex max-w-[75%] flex-col pt-25 md:pt-25">
                                        <h3 className="text-lg font-semibold leading-snug text-onlan-black md:text-xl">
                                            {item.title}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-onlan-black/85 md:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
