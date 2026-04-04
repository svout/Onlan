import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import HomePage from '@/site-pages/HomePage';
import { createPageJsonLd, createPageMetadata, HOME_SEO } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata(HOME_SEO);

const homeJsonLd = createPageJsonLd(HOME_SEO);

export default function Home() {
    return (
        <>
            <JsonLd data={homeJsonLd} />
            <HomePage />
        </>
    );
}
