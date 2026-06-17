'use client';

import type { FormEvent } from 'react';
import type { ServiceContent } from '@/types/Service.interface';
import { Elements } from '@/components/elements';
import { SERVICE_STEP_BACKGROUND_BY_SLUG } from '@/components/widgets/ServicesHowItWorksSection/serviceStepBackgrounds';

interface ServiceHeroProps {
    service: ServiceContent;
}

export const ServiceHero = ({ service }: ServiceHeroProps) => {
    const backgroundImageSrc = SERVICE_STEP_BACKGROUND_BY_SLUG[service.slug];
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Hook up quote request handling when API is ready.
    };

    return (
        <section
            className="relative w-full min-h-[calc(100dvh-5rem)] overflow-x-hidden border-t border-onlan-lime/25 lg:min-h-[calc(100dvh-5rem)]"
            style={{ backgroundColor: '#2D368B' }}
            aria-labelledby={`service-hero-${service.slug}`}
        >
            {backgroundImageSrc && (
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-[#2D368B]/93 from-8% via-[#2D368B]/72 via-42% to-[#1a2058]/82" />
                </div>
            )}

            <div className="relative z-1 container mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-24">
                <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
                    <div className="flex w-full flex-col lg:max-w-[calc(100%-29rem)]">
                        <h1
                            id={`service-hero-${service.slug}`}
                            className="mt-6 text-balance text-3xl font-bold leading-tight text-white md:mt-8 md:text-4xl lg:text-[52px] lg:leading-[1.05]"
                        >
                            {service.title}
                        </h1>

                        <p className="mt-5 max-w-[640px] text-base font-light leading-7 text-onlan-lavender md:mt-6 md:text-lg md:leading-8">
                            {service.lead}
                        </p>

                        {service.highlights.length > 0 && (
                            <ul className="mt-7 flex w-full max-w-[720px] flex-wrap gap-3 md:mt-8">
                                {service.highlights.map((item) => (
                                    <li
                                        key={item}
                                        className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium leading-snug text-white backdrop-blur-sm md:text-base"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="w-full max-w-full shrink-0 lg:max-w-[464px]">
                        <form
                            className="w-full rounded-[20px] border border-[#D5E82D] bg-white/10 p-5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)] backdrop-blur-[17px] md:p-6"
                            onSubmit={onSubmit}
                            noValidate
                        >
                            <div className="flex flex-col gap-4">
                                <Elements.Input
                                    id={`service-hero-name-${service.slug}`}
                                    name="name"
                                    type="text"
                                    label="Ваше ім’я"
                                    labelClassName="!text-onlan-white"
                                    placeholder="Ваше ім’я"
                                    className="w-full"
                                    inputWrapClassName="flex !h-[61px] min-h-[61px] items-center border-onlan-white bg-onlan-white"
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                />

                                <Elements.Input
                                    id={`service-hero-phone-${service.slug}`}
                                    name="phone"
                                    type="tel"
                                    label="Номер телефону"
                                    labelClassName="!text-onlan-white"
                                    placeholder="Номер телефону"
                                    className="w-full"
                                    inputWrapClassName="flex !h-[61px] min-h-[61px] items-center border-onlan-white bg-onlan-white"
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                />

                                <Elements.Input
                                    id={`service-hero-route-${service.slug}`}
                                    name="route"
                                    type="text"
                                    label="Маршрут"
                                    labelClassName="!text-onlan-white"
                                    placeholder="Маршрут"
                                    className="w-full"
                                    inputWrapClassName="flex !h-[61px] min-h-[61px] items-center border-onlan-white bg-onlan-white"
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                />

                                <Elements.Input
                                    id={`service-hero-weight-${service.slug}`}
                                    name="weight"
                                    type="text"
                                    label="Вага / м³"
                                    labelClassName="!text-onlan-white"
                                    placeholder="Вага / м³"
                                    className="w-full"
                                    inputWrapClassName="flex !h-[61px] min-h-[61px] items-center border-onlan-white bg-onlan-white"
                                    inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                />
                            </div>

                            <Elements.Button
                                type="submit"
                                variant="accent"
                                size="md"
                                className="mt-6 h-12 w-full justify-center font-semibold lg:h-14"
                            >
                                Замовити прорахунок
                            </Elements.Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
