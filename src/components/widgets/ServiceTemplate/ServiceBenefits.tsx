'use client';

import { useEffect, useRef, useState } from 'react';
import { Elements } from '@/components/elements';
import type { ServiceContent } from '@/types/Service.interface';

interface ServiceBenefitsProps {
    service: ServiceContent;
}

type BenefitStoryItemProps = {
    title: string;
    description: string;
};

function BenefitStoryItem({ title, description }: BenefitStoryItemProps) {
    const itemRef = useRef<HTMLLIElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = itemRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <li ref={itemRef} className="border-t border-onlan-black/10 py-6 md:py-8 lg:py-10">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
                <h3
                    className="text-xl font-semibold leading-snug text-onlan-black transition-all duration-700 lg:text-2xl"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                    }}
                >
                    {title}
                </h3>

                <p
                    className="max-w-3xl text-sm leading-relaxed text-onlan-black/85 transition-all duration-700 delay-100 md:text-base lg:text-lg"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                    }}
                >
                    {description}
                </p>
            </div>
        </li>
    );
}

export const ServiceBenefits = ({ service }: ServiceBenefitsProps) => {
    const headingId = `service-benefits-${service.slug}`;

    if (!service.benefits.length) {
        return null;
    }

    return (
        <section
            className="relative w-full bg-onlan-white py-10 md:py-14 lg:py-20"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full items-center justify-start gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-3 py-1.5 md:px-4 md:py-2">
                        <p className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-onlan-black md:text-sm">
                            Переваги
                        </p>
                    </div>
                </div>

                <Elements.Title
                    id={headingId}
                    title="Чому це працює саме так"
                    type="h2"
                    className="mt-4 max-w-3xl text-balance text-2xl text-onlan-black md:mt-6 md:text-3xl lg:mt-8 lg:text-4xl"
                />

                <ul className="mx-auto mt-8 w-full list-none border-b border-onlan-black/10 md:mt-10 lg:mt-12">
                    {service.benefits.map((item) => (
                        <BenefitStoryItem
                            key={item.title}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
};
