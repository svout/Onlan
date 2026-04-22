'use client';

import Image from 'next/image';
import { FaLinkedinIn } from 'react-icons/fa6';
import girlPhoto from '@/assets/images/girl.jpg';
import menPhoto from '@/assets/images/men.jpg';
import { Elements } from '@/components/elements';
import {
    ABOUT_US_TEAM,
    ABOUT_US_TEAM_SECTION,
    type AboutUsTeamPhotoKey,
} from '@/content/aboutUsTeam';

const PHOTO_BY_KEY: Record<AboutUsTeamPhotoKey, typeof girlPhoto> = {
    girl: girlPhoto,
    men: menPhoto,
};

export const AboutUsTeamSection = () => {
    const sectionId = 'about-us-team-heading';

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
                            {ABOUT_US_TEAM_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={sectionId}
                    title={ABOUT_US_TEAM_SECTION.heading}
                    type="h2"
                    className="mt-6 mx-auto max-w-4xl text-balance text-center text-onlan-black"
                />

                <ul className="mx-auto mt-10 grid w-full max-w-[1200px] list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
                    {ABOUT_US_TEAM.map((member) => (
                        <li key={member.name}>
                            <article className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-onlan-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                                <Image
                                    src={PHOTO_BY_KEY[member.photo]}
                                    alt={member.name}
                                    fill
                                    className="z-0 object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <a
                                    href={member.profileHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute right-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full bg-onlan-lime text-onlan-blue transition-colors hover:bg-onlan-lime-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-onlan-blue"
                                    aria-label={`Профіль ${member.name} у LinkedIn`}
                                >
                                    <FaLinkedinIn className="size-[18px]" aria-hidden />
                                </a>
                                <div className="absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] flex-col items-start gap-1.5">
                                    <div className="w-fit max-w-full rounded-xl bg-white px-4 py-2.5 shadow-sm md:rounded-2xl md:px-5 md:py-3">
                                        <p className="text-base font-semibold leading-snug text-onlan-black md:text-lg">
                                            {member.name}
                                        </p>
                                    </div>
                                    <div className="w-fit max-w-full rounded-xl bg-white px-4 py-2.5 shadow-sm md:rounded-2xl md:px-5 md:py-3">
                                        <p className="text-sm leading-relaxed text-onlan-black/85 md:text-[14px]">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
