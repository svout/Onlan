/** «Корпоративна культура» / цінності на сторінці «Про нас» */

export type AboutUsValueIconKey = 'partnership' | 'transparency' | 'reliability' | 'growth';

export type AboutUsValueItem = {
    title: string;
    description: string;
    icon: AboutUsValueIconKey;
};

export const ABOUT_US_VALUES_SECTION = {
    eyebrow: 'Корпоративна культура',
    heading: 'Цінності ONLAN',
} as const;

export const ABOUT_US_VALUES: AboutUsValueItem[] = [
    {
        icon: 'partnership',
        title: 'Прозорість',
        description:
            'відкритий діалог із клієнтами та партнерами.',
    },
    {
        icon: 'transparency',
        title: 'Відповідальність',
        description:
            'за кожен вантаж — від завантаження до доставки.',
    },
    {
        icon: 'reliability',
        title: 'Інновації',
        description:
            'постійний пошук нових технологій і маршрутів.',
    },
    {
        icon: 'growth',
        title: 'Підтримка',
        description:
            '24/7, навіть у святкові дні.',
    },
];
