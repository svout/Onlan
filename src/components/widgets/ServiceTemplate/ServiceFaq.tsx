'use client';

import { useState } from 'react';
import { Elements } from '@/components/elements';
import type { ServiceContent } from '@/types/Service.interface';

interface ServiceFaqProps {
    service: ServiceContent;
}

export const ServiceFaq = ({ service }: ServiceFaqProps) => {
    const headingId = `service-faq-${service.slug}`;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!service.faq.length) {
        return null;
    }

    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            FAQ
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title="Часті запитання"
                    type="h2"
                    className="mt-6 max-w-3xl text-balance text-onlan-black"
                />

                <ul className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-3 md:mt-12">
                    {service.faq.map((item, index) => {
                        const isOpen = openIndex === index;
                        const panelId = `${headingId}-panel-${index}`;
                        const buttonId = `${headingId}-button-${index}`;

                        return (
                            <li
                                key={item.question}
                                className="overflow-hidden rounded-2xl border border-onlan-black/10 bg-onlan-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                            >
                                <button
                                    id={buttonId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                                >
                                    <span className="text-base font-semibold leading-snug text-onlan-black md:text-lg">
                                        {item.question}
                                    </span>
                                    <span
                                        aria-hidden
                                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border border-onlan-black/20 text-onlan-blue transition-transform ${
                                            isOpen ? 'rotate-45' : ''
                                        }`}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 1.5v11M1.5 7h11"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    hidden={!isOpen}
                                    className="px-5 pb-5 md:px-6 md:pb-6"
                                >
                                    <p className="text-sm leading-relaxed text-onlan-black/85 md:text-base">
                                        {item.answer}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};
