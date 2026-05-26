'use client';

import type { ServiceContent } from '@/types/Service.interface';
import { Containers, Widgets } from '@components';

type Props = {
    service: ServiceContent;
};

export default function ServiceDetailPage({ service }: Props) {
    return (
        <>
            <Widgets.ServiceHero service={service} />
            <Widgets.ServiceBenefits service={service} />
            <Widgets.ServiceProcess service={service} />
            <Widgets.ServiceCargoTypes service={service} />
            <Widgets.ServiceFaq service={service} />
            <div className="bg-onlan-white">
                <Containers.Section el={<Widgets.ContactsGlowCardSection />} />
            </div>
        </>
    );
}
