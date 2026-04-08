'use client';

import { Containers, Widgets } from '@components';

export default function HomePage() {
    return (
        <>
            <Containers.Section el={<Widgets.HeroSection />} />
            <Containers.Section el={<Widgets.RegionsMarqueeSection />} />
            <Containers.Section el={<Widgets.AntiPainSection />} />
            <Containers.Section el={<Widgets.WhyChooseUsSection />} />
            <Containers.Section el={<Widgets.ServicesHowItWorksSection />} />
            <Containers.Section el={<Widgets.AboutUsNew />} />
            <Containers.Section el={<Widgets.Reviews />} />
            <Containers.Section el={<Widgets.ContactUsSection />} />

        </>
    );
}
