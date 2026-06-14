'use client';

import type { ComponentType } from 'react';
import {
    FaBox,
    FaComments,
    FaFileLines,
    FaHandshake,
    FaPlane,
    FaShieldHalved,
    FaShip,
    FaTruck,
    FaWarehouse,
} from 'react-icons/fa6';
import { Elements } from '@/components/elements';
import { ABOUT_US_STORYTELL_SPLIT } from '@/content/aboutUsStorytell';

const SERVICE_ICONS: Record<
    (typeof ABOUT_US_STORYTELL_SPLIT.services)[number]['id'],
    ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
    truck: FaTruck,
    ship: FaShip,
    plane: FaPlane,
    box: FaBox,
    customs: FaFileLines,
    warehouse: FaWarehouse,
};

const FEATURE_ICONS: Record<
    (typeof ABOUT_US_STORYTELL_SPLIT.features)[number]['id'],
    ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
    handshake: FaHandshake,
    comments: FaComments,
    shield: FaShieldHalved,
};

export function AboutUsStorytellSplitSection() {
    const headingId = 'about-us-storytell-split-heading';

    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-24"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20 xl:gap-28">
                    <div className="max-w-[700px]">
                        <div className="flex items-center gap-3.5">
                            <div className="size-2.5 shrink-0 rounded-full bg-onlan-blue" />
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-onlan-blue">
                                {ABOUT_US_STORYTELL_SPLIT.eyebrow}
                            </p>
                        </div>

                        <Elements.Title
                            id={headingId}
                            title={ABOUT_US_STORYTELL_SPLIT.heading}
                            type="h2"
                            className="mt-8 text-balance text-3xl font-semibold leading-[1.15] text-onlan-black md:text-5xl lg:text-[52px]"
                        />

                        <div className="mt-8 space-y-4">
                            {ABOUT_US_STORYTELL_SPLIT.paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="text-lg leading-relaxed text-onlan-black/75 md:text-xl md:leading-8"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:mt-16 lg:gap-10">
                            {ABOUT_US_STORYTELL_SPLIT.services.map((service) => {
                                const Icon = SERVICE_ICONS[service.id];

                                return (
                                    <li key={service.id} className="flex flex-col items-center gap-4 text-center">
                                        <Icon className="size-8 text-onlan-blue md:size-9" aria-hidden />
                                        <span className="text-sm font-medium text-onlan-black md:text-base">
                                            {service.label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="w-full max-w-[430px] shrink-0 lg:pt-10">
                        <ul>
                            {ABOUT_US_STORYTELL_SPLIT.features.map((feature, index) => {
                                const Icon = FEATURE_ICONS[feature.id];

                                return (
                                    <li key={feature.number}>
                                        <div className="flex items-center gap-8">
                                            <span
                                                aria-hidden
                                                className="w-16 shrink-0 text-[52px] font-bold leading-none text-onlan-lavender md:text-[60px]"
                                            >
                                                {feature.number}
                                            </span>
                                            <Icon className="size-9 shrink-0 text-onlan-blue md:size-10" aria-hidden />
                                            <p className="text-xl font-medium text-onlan-black md:text-2xl">
                                                {feature.label}
                                            </p>
                                        </div>
                                        {index < ABOUT_US_STORYTELL_SPLIT.features.length - 1 && (
                                            <div className="my-8 border-t border-onlan-black/10 md:my-10" />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
