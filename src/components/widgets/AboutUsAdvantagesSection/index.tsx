'use client';

import Image from 'next/image';
import advantageIcon from '@/assets/icons/AboutUsAdvantageIcon.svg';
import { Elements } from '@/components/elements';
import {
    ABOUT_US_ADVANTAGES,
    ABOUT_US_ADVANTAGES_SECTION,
} from '@/content/aboutUsAdvantages';

export const AboutUsAdvantagesSection = () => {
    const sectionId = 'about-us-advantages-heading';

    return (
        <section
            className="relative w-full bg-onlan-white py-10 md:py-14 lg:py-20"
            aria-labelledby={sectionId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            {ABOUT_US_ADVANTAGES_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={sectionId}
                    title={ABOUT_US_ADVANTAGES_SECTION.heading}
                    type="h1"
                    className="mx-auto mt-4 max-w-4xl text-balance text-center text-2xl text-onlan-black md:mt-6 md:text-3xl lg:mt-8 lg:text-4xl"
                />

                {/* Mobile: 1 col · Tablet: 2 col · Desktop: 3 col */}
                <ul className="mx-auto mt-8 grid w-full max-w-[1200px] list-none grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 md:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6 xl:gap-8">
                    {ABOUT_US_ADVANTAGES.map((item) => (
                        <li key={item.title}>
                            <article className="relative h-full rounded-xl border border-onlan-black/10 bg-onlan-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:rounded-2xl md:p-6 lg:p-8">
                                <div
                                    className="pointer-events-none absolute right-3 top-3 md:right-4 md:top-4 lg:right-5 lg:top-5"
                                    aria-hidden
                                >
                                    <Image
                                        src={advantageIcon}
                                        alt=""
                                        width={46}
                                        height={46}
                                        className="size-9 md:size-10 lg:size-[46px]"
                                    />
                                </div>
                                <h3 className="pr-11 text-base font-semibold leading-snug text-onlan-black md:pr-12 md:text-lg lg:pr-14 lg:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-onlan-black/85 md:mt-3 md:text-base">
                                    {item.description}
                                </p>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
