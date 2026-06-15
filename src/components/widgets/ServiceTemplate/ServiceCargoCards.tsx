'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
    FaBox,
    FaBoxesStacked,
    FaBuilding,
    FaCartShopping,
    FaChair,
    FaClock,
    FaCubes,
    FaEarthAmericas,
    FaFlask,
    FaGears,
    FaIndustry,
    FaLayerGroup,
    FaMicrochip,
    FaMountain,
    FaShirt,
    FaSnowflake,
    FaTruckRampBox,
    FaWarehouse,
} from 'react-icons/fa6';
import type { ComponentType } from 'react';
import type { ServiceCargoCardIcon } from '@/content/serviceCargoCards';
import { SERVICE_CARGO_SECTIONS } from '@/content/serviceCargoCards';
import {
    SERVICE_CARGO_IMAGE_FALLBACK,
    SERVICE_CARGO_IMAGES,
} from '@/content/serviceCargoImages';
import type { ServiceContent } from '@/types/Service.interface';

const CARGO_ICONS: Record<
    ServiceCargoCardIcon,
    ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
> = {
    furniture: FaChair,
    pallet: FaLayerGroup,
    construction: FaBuilding,
    equipment: FaGears,
    refrigerated: FaSnowflake,
    ltl: FaBoxesStacked,
    retail: FaCartShopping,
    industrial: FaIndustry,
    china: FaEarthAmericas,
    electronics: FaMicrochip,
    textile: FaShirt,
    marketplace: FaCartShopping,
    parts: FaGears,
    urgent: FaClock,
    samples: FaFlask,
    raw: FaMountain,
    container: FaBox,
    oversize: FaTruckRampBox,
    metal: FaIndustry,
    tank: FaWarehouse,
    machinery: FaGears,
    import: FaBox,
    ecommerce: FaCartShopping,
};

interface ServiceCargoCardsProps {
    service: ServiceContent;
}

type CargoCardProps = {
    title: string;
    route: string;
    icon: ServiceCargoCardIcon;
    imageSeed: string;
    index: number;
};

function CargoCard({ title, route, icon, imageSeed, index }: CargoCardProps) {
    const cardRef = useRef<HTMLLIElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const Icon = CARGO_ICONS[icon];

    useEffect(() => {
        const node = cardRef.current;
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
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <li
            ref={cardRef}
            className="overflow-hidden rounded-[14px] bg-onlan-white text-left shadow-[0_8px_28px_rgba(25,30,70,0.1)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(25,30,70,0.16)]"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${index * 70}ms`,
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={SERVICE_CARGO_IMAGES[imageSeed] ?? SERVICE_CARGO_IMAGE_FALLBACK}
                alt={title}
                width={480}
                height={200}
                className="block h-[155px] w-full object-cover md:h-[155px]"
                loading="lazy"
            />
            <div className="p-6 md:px-6 md:py-7">
                <Icon className="mb-5 size-7 text-onlan-lime" aria-hidden />
                <h3 className="text-lg font-extrabold leading-snug text-onlan-black md:text-[19px]">
                    {title}
                </h3>
                <div className="my-4 h-[3px] w-8 rounded-full bg-onlan-lime" />
                <p className="text-sm leading-relaxed text-onlan-black/85 md:text-[15px]">
                    {route}
                </p>
            </div>
        </li>
    );
}

function renderCargoHeading(heading: string, highlight: string) {
    const index = heading.indexOf(highlight);
    if (index === -1) {
        return heading;
    }

    return (
        <>
            {heading.slice(0, index)}
            <span className="text-onlan-lime">{highlight}</span>
            {heading.slice(index + highlight.length)}
        </>
    );
}

export const ServiceCargoCards = ({ service }: ServiceCargoCardsProps) => {
    const section = SERVICE_CARGO_SECTIONS[service.slug];
    const headingId = `service-cargo-cards-${service.slug}`;

    if (!section) {
        return null;
    }

    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby={headingId}
        >
            <div className="container mx-auto px-4 text-center">
                <h2
                    id={headingId}
                    className="mx-auto mb-10 max-w-4xl text-balance text-2xl font-extrabold uppercase leading-tight tracking-wide text-onlan-black md:mb-12 md:text-[34px]"
                >
                    {renderCargoHeading(section.heading, section.headingHighlight)}
                </h2>

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[26px]">
                    {section.cards.map((card, index) => (
                        <CargoCard key={card.title} {...card} index={index} />
                    ))}
                </ul>

                <Link
                    to="/#contact"
                    className="mt-10 inline-flex items-center justify-center rounded-[10px] bg-onlan-lime px-10 py-4 text-base font-extrabold text-onlan-black transition-all hover:-translate-y-0.5 hover:opacity-90 md:mt-11"
                >
                    Розрахувати вартість
                </Link>
            </div>
        </section>
    );
};
