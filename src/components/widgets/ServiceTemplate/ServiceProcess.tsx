'use client';

import { Elements } from '@/components/elements';
import type { ServiceContent } from '@/types/Service.interface';

interface ServiceProcessProps {
    service: ServiceContent;
}

export const ServiceProcess = ({ service }: ServiceProcessProps) => {
    const headingId = `service-process-${service.slug}`;

    if (!service.process.length) {
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
                            Як ми працюємо
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title="Етапи роботи над вашим вантажем"
                    type="h2"
                    className="mt-6 max-w-4xl text-balance text-onlan-black"
                />

                <ol className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {service.process.map((step) => (
                        <li
                            key={step.number}
                            className="relative flex h-full flex-col rounded-2xl border border-onlan-black/10 bg-onlan-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-7"
                        >
                            <span
                                className="select-none font-bold tabular-nums leading-none text-onlan-blue text-[64px] md:text-[80px]"
                                aria-hidden
                            >
                                {step.number}
                            </span>
                            <h3 className="mt-4 text-lg font-semibold leading-snug text-onlan-black md:text-xl">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-onlan-black/80 md:text-base">
                                {step.description}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};
