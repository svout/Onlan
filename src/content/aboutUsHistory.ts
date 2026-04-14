/** «Наш шлях: Історія компанії» — About Us timeline */

export type HistoryMilestone = {
    year: number;
    text: string;
    /** Background: onlan-blue (#2C358C) at this opacity */
    bgOpacityPercent: 20 | 40 | 60 | 80 | 100;
};

export const ABOUT_US_HISTORY_SECTION = {
    eyebrow: 'Наш шлях: Історія компанії',
    heading: 'Як усе починалося',
} as const;

export const ABOUT_US_HISTORY_MILESTONES: HistoryMilestone[] = [
    {
        year: 2012,
        text: 'Заснування ONLAN Logistic у Вінниці.',
        bgOpacityPercent: 20,
    },
    {
        year: 2015,
        text: 'Відкриття власного складу 2 000 м²',
        bgOpacityPercent: 40,
    },
    {
        year: 2018,
        text: 'Запуск мультимодальних перевезень Україна–Азія.',
        bgOpacityPercent: 60,
    },
    {
        year: 2021,
        text: 'Митне оформлення «під ключ» для клієнтів ЄС.',
        bgOpacityPercent: 80,
    },
    {
        year: 2023,
        text: '5 000 успішних відправлень, вихід на ринки Китаю та Азії.',
        bgOpacityPercent: 100,
    },
];
