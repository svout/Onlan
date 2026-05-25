import type { Metadata } from 'next';
import JsonLd from '@/components/app/JsonLd';
import { CONTACTS_SEO, createPageJsonLd, createPageMetadata } from '@/lib/seo';
import ContactsPage from '@/site-pages/ContactsPage';

export const metadata: Metadata = createPageMetadata(CONTACTS_SEO);

const contactsJsonLd = createPageJsonLd(CONTACTS_SEO);

export default function Contacts() {
    return (
        <>
            <JsonLd data={contactsJsonLd} />
            <ContactsPage />
        </>
    );
}
