import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import NotFoundPage from '@/site-pages/NotFoundPage';
import { createPageJsonLd, createPageMetadata, NOT_FOUND_SEO } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(NOT_FOUND_SEO);

const notFoundJsonLd = createPageJsonLd(NOT_FOUND_SEO);

export default function NotFound() {
    return (
        <>
            <JsonLd data={notFoundJsonLd} />
            <NotFoundPage />
        </>
    );
}
