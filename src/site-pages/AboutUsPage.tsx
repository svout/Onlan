'use client';

import { Containers, Widgets } from '@components';

export default function AboutUsPage() {
    return (
        <>
            <Containers.Section el={<Widgets.AboutUsHero />} />
            <Containers.Section el={<Widgets.AboutUsCompanyIntro />} />
            <Containers.Section el={<Widgets.AboutUsAdvantagesSection />} />
            <Containers.Section el={<Widgets.AboutUsHistorySection />} />
        </>
    );
}
