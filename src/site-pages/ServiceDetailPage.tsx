import Link from 'next/link';
import type { HowItWorksServiceItem } from '@/types/HowItWorks.interface';

type Props = {
    service: HowItWorksServiceItem;
};

export default function ServiceDetailPage({ service }: Props) {
    return (
        <article className="min-h-dvh bg-onlan-white px-4 py-16 md:px-6 md:py-24">
            <div className="container mx-auto max-w-3xl">
                <nav aria-label="Навігація">
                    <Link
                        href="/"
                        className="text-sm font-medium text-onlan-blue transition-colors hover:text-onlan-black hover:underline"
                    >
                        ← На головну
                    </Link>
                </nav>
                <header className="mt-10">
                    <p className="text-sm font-semibold uppercase tracking-wider text-onlan-blue">{service.tagLabel}</p>
                    <h1 className="mt-2 text-3xl font-bold leading-tight text-onlan-black md:text-4xl">{service.title}</h1>
                    <p className="mt-6 text-lg leading-relaxed text-onlan-black/75">{service.description}</p>
                </header>
                <p className="mt-10 text-base text-onlan-black/60">
                    Тут буде повний контент сторінки послуги — додайте блоки за потреби.
                </p>
            </div>
        </article>
    );
}
