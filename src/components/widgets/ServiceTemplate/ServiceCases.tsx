'use client';

import { Elements } from '@/components/elements';
import type { ServiceContent } from '@/types/Service.interface';

interface ServiceCasesProps {
    service: ServiceContent;
}

export const ServiceCases = ({ service }: ServiceCasesProps) => {
    const headingId = `service-cases-${service.slug}`;

    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            Кейси
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title="Реальні приклади доставок"
                    type="h2"
                    className="mt-4 max-w-3xl text-balance text-onlan-black md:mt-6"
                />

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-onlan-black/75 md:text-lg">
                    Готуємо кейси для напрямку «{service.title}»: маршрути, строки, тип вантажу та
                    рішення для клієнта. Розділ з&apos;явиться найближчим часом.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10">
                    {['Кейс 1', 'Кейс 2'].map((label) => (
                        <article
                            key={label}
                            className="rounded-2xl border border-dashed border-onlan-black/15 bg-onlan-white p-6 md:p-8"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-onlan-blue">
                                {label}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-onlan-black/60 md:text-base">
                                Опис кейсу буде додано після узгодження з командою.
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
