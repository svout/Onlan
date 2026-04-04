import type { ReactNode } from 'react';
import type { ServiceIconId } from '@/types/HowItWorks.interface';

const stroke = {
    stroke: 'currentColor',
    strokeWidth: 2,
    fill: 'none',
} as const;

function TruckIcon() {
    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-onlan-lime" aria-hidden>
            <rect x="4" y="20" width="36" height="20" rx="2" {...stroke} />
            <path d="M40 28h12l8 8v12H44" {...stroke} strokeLinejoin="round" />
            <circle cx="14" cy="44" r="5" {...stroke} />
            <circle cx="34" cy="44" r="5" {...stroke} />
            <path d="M19 44h10" stroke="currentColor" strokeWidth={2} />
        </svg>
    );
}

function ShipIcon() {
    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-onlan-lime" aria-hidden>
            <path d="M8 40c10 6 20 8 28 8s18-2 28-8l4 10H4l4-10z" {...stroke} strokeLinejoin="round" />
            <path d="M14 40V24h10v8h8V20h14v20" {...stroke} strokeLinejoin="round" />
        </svg>
    );
}

function PlaneIcon() {
    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-onlan-lime" aria-hidden>
            <path d="M32 10l6 14h16L34 36l-8 18-6-14H8l22-12 10-18z" {...stroke} strokeLinejoin="round" />
        </svg>
    );
}

function TrainIcon() {
    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-onlan-lime" aria-hidden>
            <rect x="10" y="22" width="44" height="22" rx="3" {...stroke} />
            <path d="M18 32h28M18 38h20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            <circle cx="18" cy="48" r="4" {...stroke} />
            <circle cx="46" cy="48" r="4" {...stroke} />
        </svg>
    );
}

function OversizeIcon() {
    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-onlan-lime" aria-hidden>
            <rect x="6" y="38" width="52" height="14" rx="2" {...stroke} />
            <rect x="16" y="14" width="32" height="12" rx="2" {...stroke} />
            <path d="M24 26v12M40 26v12" {...stroke} strokeLinecap="round" />
            <circle cx="14" cy="54" r="4" {...stroke} />
            <circle cx="50" cy="54" r="4" {...stroke} />
        </svg>
    );
}

function CustomsIcon() {
    return (
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-onlan-lime" aria-hidden>
            <rect x="14" y="18" width="36" height="36" rx="2" {...stroke} />
            <path d="M22 28h20M22 36h14M22 44h18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            <circle cx="44" cy="26" r="8" {...stroke} />
            <path d="M41 26l2 2 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
    );
}

const MAP: Record<ServiceIconId, ReactNode> = {
    truck: <TruckIcon />,
    ship: <ShipIcon />,
    plane: <PlaneIcon />,
    train: <TrainIcon />,
    oversize: <OversizeIcon />,
    customs: <CustomsIcon />,
};

export function ServiceIconVisual({ id }: { id: ServiceIconId }) {
    return <div className="h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40">{MAP[id]}</div>;
}
