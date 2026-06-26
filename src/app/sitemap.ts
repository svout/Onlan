import type { MetadataRoute } from 'next';
import { SERVICES } from '@/content/services';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

/**
 * Generated sitemap for the OnLan site. Lists the real, indexable routes:
 * home, about, contacts, and every service detail page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const base = SITE_URL.replace(/\/$/, '');
    const lastModified = new Date();

    const staticEntries: MetadataRoute.Sitemap = [
        { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
        { url: `${base}/about-us`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/contacts`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ];

    const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
        url: `${base}/services/${service.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticEntries, ...serviceEntries];
}
