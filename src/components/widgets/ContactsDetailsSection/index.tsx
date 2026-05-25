'use client';

import { Elements } from '@/components/elements';
import { CONTACTS_DETAILS_SECTION } from '@/content/contacts';

export function ContactsDetailsSection() {
    const headingId = 'contacts-details-heading';

    return (
        <section className="w-full bg-onlan-white py-10 md:py-14 lg:py-20" aria-labelledby={headingId}>
            <div className="container mx-auto px-4">
                <div className="mx-auto flex w-fit items-center justify-center gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            {CONTACTS_DETAILS_SECTION.eyebrow}
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title={CONTACTS_DETAILS_SECTION.heading}
                    type="h2"
                    className="mx-auto mt-4 max-w-3xl text-center text-onlan-black md:mt-6"
                />

                <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:mt-12 xl:grid-cols-4">
                    {CONTACTS_DETAILS_SECTION.columns.map((column) => (
                        <article
                            key={column.title}
                            className="rounded-2xl border border-onlan-black/10 bg-onlan-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-6 lg:p-7"
                        >
                            <h3 className="text-base font-semibold text-onlan-black md:text-lg">
                                {column.title}
                            </h3>

                            <ul className="mt-5 space-y-4">
                                {column.items.map((item, index) => {
                                    const href = 'href' in item ? item.href : undefined;

                                    return (
                                        <li
                                            key={`${column.title}-${href ?? item.label}-${index}`}
                                            className="text-sm leading-relaxed text-onlan-black/85 md:text-base"
                                        >
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="transition-colors hover:text-onlan-blue hover:underline"
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                item.label
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
