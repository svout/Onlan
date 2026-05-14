'use client';

import { Elements } from '@/components/elements';
import type { ServiceContent } from '@/types/Service.interface';

interface ServiceCargoTypesProps {
    service: ServiceContent;
}

export const ServiceCargoTypes = ({ service }: ServiceCargoTypesProps) => {
    const headingId = `service-cargo-${service.slug}`;

    if (!service.cargoTypes.length) {
        return null;
    }

    return (
        <section
            className="relative w-full py-12 md:py-16 lg:py-20"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4">
                <div
                    className="rounded-2xl px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14"
                    style={{ backgroundColor: '#D5E82D' }}
                >
                    <div className="flex w-full items-center justify-start gap-2">
                        <div className="size-2 rounded-full bg-onlan-blue" />
                        <div className="rounded-full border border-onlan-blue px-4 py-2">
                            <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-blue">
                                Що возимо
                            </p>
                        </div>
                    </div>

                    <Elements.Title
                        id={headingId}
                        title="Підходить для таких вантажів і напрямків"
                        type="h2"
                        className="mt-6 max-w-3xl text-balance text-onlan-blue"
                    />

                    <ul className="mt-8 flex flex-wrap gap-3 md:mt-10">
                        {service.cargoTypes.map((cargo) => (
                            <li
                                key={cargo}
                                className="rounded-full border border-onlan-blue bg-transparent px-4 py-2 text-sm font-semibold text-onlan-blue md:text-base"
                            >
                                {cargo}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
