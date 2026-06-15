export const HOME_HERO = {
    badge: 'МІЖНАРОДНА ЛОГІСТИКА',
    titleLines: ['Міжнародні', 'перевезення'],
    titleHighlight: 'Європа, Китай',
    description:
        'Експрес-логістика для бізнесу, що рухається швидко. Митниця за 24 години, повний контроль маршруту, нульові затримки.',
    cta: 'Отримати розрахунок доставки',
    advantages: [
        {
            key: 'manager',
            title: '1 менеджер',
            description: 'веде весь маршрут',
        },
        {
            key: 'support',
            title: '24/7',
            description: 'на зв’язку з вами',
        },
        {
            key: 'predictable',
            title: '0 сюрпризів',
            description: 'по вартості та строках',
        },
    ],
    statusCards: [
        {
            key: 'documents',
            label: 'Документи',
            status: 'перевірено',
            dot: 'green' as const,
        },
        {
            key: 'route',
            label: 'Маршрут',
            status: 'погоджено',
            dot: 'green' as const,
        },
        {
            key: 'cargo',
            label: 'Вантаж',
            status: 'у дорозі',
            dot: 'blue' as const,
        },
        {
            key: 'updates',
            label: 'Статус',
            status: 'оновлено',
            dot: 'green' as const,
        },
    ],
} as const;
