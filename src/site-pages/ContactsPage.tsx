'use client';

import { Containers, Widgets } from '@components';

export default function ContactsPage() {
    return (
        <>
            <div className="relative overflow-hidden">
                <Containers.Section el={<Widgets.ContactsHeroSection />} />
            </div>
            <div className="relative z-10 -mt-[15vh] bg-onlan-white md:-mt-[15vh]">
                <Containers.Section el={<Widgets.ContactsQuoteFormSection />} />
            </div>
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsDetailsSection />} />
            </div>
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsOfficesSection />} />
            </div>
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsFaqSection />} />
            </div>
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsGlowCardSection />} />
            </div>
        </>
    );
}
