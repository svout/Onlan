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
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby={sectionId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            {ABOUT_US_ADVANTAGES_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={sectionId}
                    title={ABOUT_US_ADVANTAGES_SECTION.heading}
                    type="h1"
                    className="mt-6 mx-auto max-w-4xl text-balance text-center text-onlan-black"
                />

                <ul className="mx-auto mt-10 grid w-full max-w-[1200px] list-none grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:mt-12 lg:gap-8">
                    {ABOUT_US_ADVANTAGES.map((item) => (
                        <li key={item.title}>
                            <article className="relative h-full rounded-2xl border border-onlan-black/10 bg-onlan-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-8">
                                <div
                                    className="pointer-events-none absolute right-4 top-4 md:right-5 md:top-5"
                                    aria-hidden
                                >
                                    <Image
                                        src={advantageIcon}
                                        alt=""
                                        width={46}
                                        height={46}
                                        className="size-[46px]"
                                    />
                                </div>
                                <h3 className="pr-14 text-lg font-semibold leading-snug text-onlan-black md:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-onlan-black/85 md:text-base">
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
