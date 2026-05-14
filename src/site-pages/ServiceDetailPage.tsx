'use client';

import type { ServiceContent } from '@/types/Service.interface';
import { Widgets } from '@/components/widgets';

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
            <Widgets.ContactUsSection />
        </>
    );
}
