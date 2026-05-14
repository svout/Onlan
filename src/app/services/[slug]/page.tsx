import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/app/JsonLd';
import ServiceDetailPage from '@/site-pages/ServiceDetailPage';
import { SERVICES, getServiceBySlug } from '@/content/services';
import {
    createPageJsonLd,
    createPageMetadata,
    createServiceSeoConfig,
} from '@/lib/seo';

type ServicePageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return {
            title: 'Сервіс не знайдено',
            robots: { index: false, follow: false },
        };
    }

    return createPageMetadata(createServiceSeoConfig(service));
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const jsonLd = createPageJsonLd(createServiceSeoConfig(service));

    return (
        <>
            <JsonLd data={jsonLd} />
            <ServiceDetailPage service={service} />
        </>
    );
}
