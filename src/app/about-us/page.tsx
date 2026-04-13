import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import { createPageJsonLd, createPageMetadata, ABOUT_US_SEO } from '@/lib/seo';
import AboutUsPage from '@/site-pages/AboutUsPage';

export const metadata: Metadata = createPageMetadata(ABOUT_US_SEO);

const aboutUsJsonLd = createPageJsonLd(ABOUT_US_SEO);

export default function AboutUs() {
    return (
        <>
            <JsonLd data={aboutUsJsonLd} />
            <AboutUsPage />
        </>
    );
}
