'use client';

import Image from 'next/image';
import { ContactsHeroShape } from '@/assets/icons/ContactsHeroShape';
import menPhoto from '@/assets/images/men.jpg';
import { Elements } from '@/components/elements';
import { CONTACTS_HERO } from '@/content/contacts';

const HERO_CIRCLE_KEYS = ['phone', 'email', 'location', 'linkedin'] as const;

export function ContactsHeroSection() {
    const headingId = 'contacts-hero-heading';

    return (
        <section
            className="relative z-0 mx-auto min-h-[75vh] w-full max-w-7xl overflow-hidden bg-onlan-white md:min-h-[90vh]"
            aria-labelledby={headingId}
        >
            <div className="container relative mx-auto flex min-h-[75vh] items-center px-4 py-8 md:min-h-[90vh] md:py-10 lg:py-12">
                <div
                    className="pointer-events-none absolute right-0 top-0 z-0 aspect-[830/890] h-[70vh] w-auto max-w-[min(70vw,calc(100%-1rem))] md:h-[90vh] md:max-w-[min(70vw,900px)]"
                    aria-hidden
                >
                    <ContactsHeroShape className="h-full w-full -rotate-6 md:-rotate-8 lg:-rotate-12" />
                </div>

                <div className="relative z-10 flex w-full max-w-2xl flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-5">
                        <Elements.Title
                            id={headingId}
                            title={CONTACTS_HERO.title}
                            type="h1"
                            className="font-bold text-[60px] text-onlan-black"
                        />

                        <ul
                            className="flex list-none items-center"
                            aria-label="Способи зв’язку"
                        >
                            {HERO_CIRCLE_KEYS.map((key, index) => (
                                <li
                                    key={key}
                                    className={`relative shrink-0${index > 0 ? ' -ml-2' : ''}`}
                                    style={{ zIndex: index + 1 }}
                                >
                                    <span className="relative flex size-11 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src={menPhoto}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="44px"
                                            aria-hidden
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Elements.Title
                        title={CONTACTS_HERO.brandTitle}
                        type="h1"
                        className="font-bold text-[60px] text-onlan-black"
                        highlights={[
                            { text: 'ONLAN', className: 'uppercase' },
                            { text: 'Logistic', className: 'normal-case' },
                        ]}
                    />

                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-onlan-black/85 md:mt-5 md:text-base lg:text-lg">
                        {CONTACTS_HERO.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
