import type { Metadata } from 'next';

const FALLBACK_SITE_URL = 'https://onlan.com';
const DEFAULT_SITE_DESCRIPTION =
    'Експрес-логістика для бізнесу, що рухається швидко. Митниця за 24 години, повний контроль маршруту, нульові затримки.';

export const SITE_NAME = 'OnLan Logistic';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL;
export const SITE_URL_OBJECT = new URL(SITE_URL);
export const OG_IMAGE_PATH = '/og-image.png';
export const LOGO_IMAGE_PATH = '/web-app-manifest-512x512.png';
export const FAVICON_PATH = '/favicon.png';

export type PageSeoConfig = {
    title: string;
    description: string;
    path: string;
    jsonLdType?: string;
    noIndex?: boolean;
};

export const HOME_SEO: PageSeoConfig = {
    title: 'OnLan Logistic | Вантажі з Європи, Китаю, США — доставка в Україну за 7 днів',
    description:
        'Експрес-логістика для бізнесу, що рухається швидко. Митниця за 24 години, повний контроль маршруту, нульові затримки.',
    path: '/',
};


export const NOT_FOUND_SEO: PageSeoConfig = {
    title: 'Page Not Found',
    description: 'The page you requested could not be found.',
    path: '/',
    noIndex: true,
};

function normalizePath(path: string): string {
    if (path === '/') {
        return '/';
    }

    const prefixed = path.startsWith('/') ? path : `/${path}`;
    const hasFileExtension = /\/[^/?#]+\.[^/?#]+$/.test(prefixed);
    if (hasFileExtension) {
        return prefixed;
    }

    const trimmed = prefixed.replace(/\/+$/, '');
    return trimmed || '/';
}

function toAbsoluteUrl(path: string): string {
    return new URL(normalizePath(path), SITE_URL_OBJECT).toString();
}

function createRobots(noIndex?: boolean): Metadata['robots'] {
    if (noIndex) {
        return {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: true,
            },
        };
    }

    return {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    };
}

export function createRootMetadata(): Metadata {
    return {
        metadataBase: SITE_URL_OBJECT,
        title: {
            default: SITE_NAME,
            template: `%s | ${SITE_NAME}`,
        },
        description: DEFAULT_SITE_DESCRIPTION,
        alternates: {
            canonical: '/',
        },
        icons: {
            icon: [{ url: FAVICON_PATH, type: 'image/png' }],
        },
        openGraph: {
            title: SITE_NAME,
            description: DEFAULT_SITE_DESCRIPTION,
            url: toAbsoluteUrl('/'),
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: OG_IMAGE_PATH,
                    width: 1200,
                    height: 630,
                    alt: `${SITE_NAME} preview image`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: SITE_NAME,
            description: DEFAULT_SITE_DESCRIPTION,
            images: [OG_IMAGE_PATH],
        },
    };
}

export function createPageMetadata(config: PageSeoConfig): Metadata {
    const canonicalPath = normalizePath(config.path);
    const pageUrl = toAbsoluteUrl(canonicalPath);

    return {
        title: config.title,
        description: config.description,
        alternates: {
            canonical: canonicalPath,
        },
        robots: createRobots(config.noIndex),
        openGraph: {
            title: config.title,
            description: config.description,
            url: pageUrl,
            siteName: SITE_NAME,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: OG_IMAGE_PATH,
                    width: 1200,
                    height: 630,
                    alt: `${config.title} | ${SITE_NAME}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: config.title,
            description: config.description,
            images: [OG_IMAGE_PATH],
        },
    };
}

type JsonLdValue = Record<string, unknown>;

export function createOrganizationJsonLd(): JsonLdValue {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: toAbsoluteUrl('/'),
        logo: toAbsoluteUrl(LOGO_IMAGE_PATH),
    };
}

export function createWebsiteJsonLd(): JsonLdValue {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: toAbsoluteUrl('/'),
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: toAbsoluteUrl('/'),
            logo: {
                '@type': 'ImageObject',
                url: toAbsoluteUrl(LOGO_IMAGE_PATH),
            },
        },
    };
}

export function createPageJsonLd(config: PageSeoConfig): JsonLdValue {
    const pageUrl = toAbsoluteUrl(config.path);

    return {
        '@context': 'https://schema.org',
        '@type': config.jsonLdType ?? 'WebPage',
        name: config.title,
        description: config.description,
        url: pageUrl,
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: toAbsoluteUrl('/'),
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: toAbsoluteUrl('/'),
            logo: {
                '@type': 'ImageObject',
                url: toAbsoluteUrl(LOGO_IMAGE_PATH),
            },
        },
    };
}
