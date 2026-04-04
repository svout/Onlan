export type ServiceIconId =
    | 'truck'
    | 'ship'
    | 'plane'
    | 'train'
    | 'oversize'
    | 'customs';

export interface HowItWorksServiceItem {
    number: string;
    title: string;
    description: string;
    tagLabel: string;
    iconId: ServiceIconId;
    /** URL segment for `/services/[slug]` */
    slug: string;
}

export type HowItWorkProps = HowItWorksServiceItem & {
    index: number;
    total: number;
};
