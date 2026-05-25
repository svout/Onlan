'use client';

import { Elements } from '@/components/elements';
import { CONTACTS_OFFICES_SECTION } from '@/content/contacts';

export function ContactsOfficesSection() {
    const headingId = 'contacts-offices-heading';

    return (
        <section className="w-full bg-onlan-white py-10 md:py-14 lg:py-20" aria-labelledby={headingId}>
            <div className="container mx-auto px-4">
                <div className="mx-auto flex w-fit items-center justify-center gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            {CONTACTS_OFFICES_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title={CONTACTS_OFFICES_SECTION.heading}
                    type="h2"
                    className="mx-auto mt-4 max-w-3xl text-center !text-[30px] text-onlan-black md:mt-6"
                />

                <address className="mt-5 text-center not-italic text-onlan-black md:mt-6">
                    <p className="text-base font-semibold md:text-lg">
                        {CONTACTS_OFFICES_SECTION.officeTitle}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-onlan-black/85 md:text-base">
                        {CONTACTS_OFFICES_SECTION.address}
                    </p>
                </address>
                <div className="relative mt-8 h-[373px] overflow-hidden rounded-2xl md:mt-10">
                    <iframe
                        title={CONTACTS_OFFICES_SECTION.officeTitle}
                        src={CONTACTS_OFFICES_SECTION.mapEmbedUrl}
                        className="h-full w-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <div className="pointer-events-none absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] rounded-2xl bg-onlan-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm md:left-6 md:top-6">
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-onlan-blue text-onlan-white">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden
                                >
                                    <path
                                        d="M12 21C15.5 17.2 19 14.1 19 9.75C19 5.47 15.87 2.5 12 2.5C8.13 2.5 5 5.47 5 9.75C5 14.1 8.5 17.2 12 21Z"
                                        fill="currentColor"
                                    />
                                    <circle cx="12" cy="10" r="3.25" fill="white" />
                                </svg>
                            </span>

                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-onlan-black md:text-base">
                                    {CONTACTS_OFFICES_SECTION.officeTitle}
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-onlan-black/75 md:text-sm">
                                    {CONTACTS_OFFICES_SECTION.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
