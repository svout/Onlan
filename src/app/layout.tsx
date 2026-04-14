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
import { EUkraine } from '@/styles/fonts';

export const metadata: Metadata = createRootMetadata();

const organizationJsonLd = createOrganizationJsonLd();
const websiteJsonLd = createWebsiteJsonLd();

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={`${EUkraine.variable} ${EUkraine.className}`}>
            <body>
                <JsonLd data={organizationJsonLd} />
                <JsonLd data={websiteJsonLd} />
                <ClientShell>{children}</ClientShell>
            </body>
        </html>
    );
}
