'use client';

import { Containers, Widgets } from '@components';

export default function AboutUsPage() {
    return (
        <>
            <Containers.Section el={<Widgets.AboutUsHero />} />
            <Containers.Section el={<Widgets.AboutUsStorytellScrollSection />} />
            {/* <Containers.Section el={<Widgets.AboutUsStorytellSplitSection />} />
            <Containers.Section el={<Widgets.AboutUsStorytellMapSection />} /> */}
            {/* <Containers.Section el={<Widgets.AboutUsCompanyIntro />} /> */}
            <Containers.Section el={<Widgets.AboutUsAdvantagesSection />} />
            <Containers.Section el={<Widgets.AboutUsHistorySection />} />
            <Containers.Section el={<Widgets.AboutUsTeamSection />} />
            <Containers.Section el={<Widgets.AboutUsValuesSection />} />
            <Containers.Section el={<Widgets.AboutUsNew />} />
            <Containers.Section el={<Widgets.ContactUsSection />} />
        </>
    );
}
