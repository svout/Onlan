import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import ClientShell from '@/components/app/ClientShell';
import JsonLd from '@/components/app/JsonLd';
import {
    createOrganizationJsonLd,
    createRootMetadata,
    createWebsiteJsonLd,
} from '@/lib/seo';
import { AlbertSans } from '@/styles/fonts';

export const metadata: Metadata = createRootMetadata();

// Use local Albert Sans font files from the Albert_Sans folder


const organizationJsonLd = createOrganizationJsonLd();
const websiteJsonLd = createWebsiteJsonLd();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={AlbertSans.className}>
            <body>
                <JsonLd data={organizationJsonLd} />
                <JsonLd data={websiteJsonLd} />
                <ClientShell>{children}</ClientShell>
            </body>
        </html>
    );
}
