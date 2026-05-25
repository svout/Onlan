'use client';

import { useState } from 'react';
import { Elements } from '@/components/elements';
import { CONTACTS_FAQ_SECTION } from '@/content/contacts';

export function ContactsFaqSection() {
    const headingId = 'contacts-faq-heading';
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-onlan-white py-10 md:py-14 lg:py-20" aria-labelledby={headingId}>
            <div className="container mx-auto px-4">
                <div className="mx-auto flex w-fit items-center justify-center gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            {CONTACTS_FAQ_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title={CONTACTS_FAQ_SECTION.heading}
                    type="h2"
                    className="mx-auto mt-4 max-w-3xl text-center text-onlan-black md:mt-6"
                />

                <ul className="mx-auto mt-8 w-full max-w-5xl md:mt-10">
                    {CONTACTS_FAQ_SECTION.items.map((question, index) => {
                        const isOpen = openIndex === index;
                        const panelId = `${headingId}-panel-${index}`;
                        const buttonId = `${headingId}-button-${index}`;

                        return (
                            <li key={`${question}-${index}`} className="border-b border-onlan-black/10">
                                <button
                                    id={buttonId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
                                >
                                    <span className="text-base font-semibold leading-snug text-onlan-black md:text-lg">
                                        {index + 1}. {question}
                                    </span>

                                    <span
                                        aria-hidden
                                        className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-onlan-lime transition-transform duration-300 ${
                                            isOpen ? 'rotate-45' : ''
                                        }`}
                                    >
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.6494 0C12.9255 7.26477e-05 13.1494 0.223923 13.1494 0.5V12.1484H24.7861C25.0623 12.1484 25.2861 12.3723 25.2861 12.6484C25.2861 12.9245 25.0622 13.1484 24.7861 13.1484H13.1494V24.7861C13.1494 25.0622 12.9255 25.2861 12.6494 25.2861C12.3733 25.2861 12.1495 25.0622 12.1494 24.7861V13.1484H0.5C0.224062 13.1483 7.37761e-05 12.9244 0 12.6484C2.41311e-08 12.3724 0.224016 12.1486 0.5 12.1484H12.1494V0.5C12.1494 0.223878 12.3733 0 12.6494 0Z"
                                                fill="black"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                <div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    hidden={!isOpen}
                                    className="pb-5 pr-16 md:pb-6"
                                >
                                    <p className="text-sm leading-relaxed text-onlan-black/85 md:text-base">
                                        {CONTACTS_FAQ_SECTION.placeholderAnswer}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
