export type ServiceCargoCardIcon =
    | 'furniture'
    | 'pallet'
    | 'construction'
    | 'equipment'
    | 'refrigerated'
    | 'ltl'
    | 'retail'
    | 'industrial'
    | 'china'
    | 'electronics'
    | 'textile'
    | 'marketplace'
    | 'parts'
    | 'urgent'
    | 'samples'
    | 'raw'
    | 'container'
    | 'oversize'
    | 'metal'
    | 'tank'
    | 'machinery'
    | 'import'
    | 'ecommerce';

export type ServiceCargoCard = {
    title: string;
    route: string;
    icon: ServiceCargoCardIcon;
    imageSeed: string;
};

export type ServiceCargoSection = {
    eyebrow: string;
    heading: string;
    headingHighlight: string;
    cards: ServiceCargoCard[];
};

export const SERVICE_CARGO_SECTIONS: Record<string, ServiceCargoSection> = {
    automotive: {
        eyebrow: 'Що возимо',
        heading: 'Що ми перевозимо автомобільним транспортом',
        headingHighlight: 'перевозимо',
        cards: [
            {
                title: 'Меблі та товари для дому',
                route: 'Італія • Польща • Німеччина → Україна',
                icon: 'furniture',
                imageSeed: 'cargo-auto-furniture',
            },
            {
                title: 'Палетовані вантажі',
                route: 'ЄС → Україна',
                icon: 'pallet',
                imageSeed: 'cargo-auto-pallet',
            },
            {
                title: 'Будівельні матеріали',
                route: 'Польща • Чехія • Німеччина → Україна',
                icon: 'construction',
                imageSeed: 'cargo-auto-construction',
            },
            {
                title: 'Обладнання та запчастини',
                route: 'Нідерланди • Бельгія → Україна',
                icon: 'equipment',
                imageSeed: 'cargo-auto-equipment',
            },
            {
                title: 'Рефрижераторні перевезення',
                route: 'Європа → Україна',
                icon: 'refrigerated',
                imageSeed: 'cargo-auto-reefer',
            },
            {
                title: 'Збірні вантажі (LTL)',
                route: 'Європа → Україна',
                icon: 'ltl',
                imageSeed: 'cargo-auto-ltl',
            },
            {
                title: 'Товари для торговельних мереж',
                route: 'ЄС → Україна',
                icon: 'retail',
                imageSeed: 'cargo-auto-retail',
            },
        ],
    },
    'sea-container': {
        eyebrow: 'Морські лінії',
        heading: 'Які вантажі доставляємо морем',
        headingHighlight: 'доставляємо морем',
        cards: [
            {
                title: 'Меблі з Китаю',
                route: 'Китай → Україна',
                icon: 'china',
                imageSeed: 'cargo-sea-furniture',
            },
            {
                title: 'Електроніка та побутова техніка',
                route: 'Китай • ПСА → Україна',
                icon: 'electronics',
                imageSeed: 'cargo-sea-electronics',
            },
            {
                title: 'Текстиль та одяг',
                route: 'Китай • Туреччина → Україна',
                icon: 'textile',
                imageSeed: 'cargo-sea-textile',
            },
            {
                title: 'Товари для маркетплейсів',
                route: 'Китай → ЄС • Україна',
                icon: 'marketplace',
                imageSeed: 'cargo-sea-marketplace',
            },
            {
                title: 'Обладнання та комплектуючі',
                route: 'Азія • Європа → Україна',
                icon: 'equipment',
                imageSeed: 'cargo-sea-equipment',
            },
            {
                title: 'Промислові товари',
                route: 'Китай → Україна',
                icon: 'industrial',
                imageSeed: 'cargo-sea-industrial',
            },
            {
                title: 'Великі партії вантажів',
                route: 'FCL • LCL по всьому світу',
                icon: 'container',
                imageSeed: 'cargo-sea-bulk',
            },
        ],
    },
    air: {
        eyebrow: 'Авіа',
        heading: 'Для яких вантажів підходить авіадоставка',
        headingHighlight: 'підходить авіадоставка',
        cards: [
            {
                title: 'Електроніка',
                route: 'ЄС • США • Азія → Україна',
                icon: 'electronics',
                imageSeed: 'cargo-air-electronics',
            },
            {
                title: 'Дорогі товари',
                route: 'Express door-to-door',
                icon: 'urgent',
                imageSeed: 'cargo-air-valuable',
            },
            {
                title: 'Термінові поставки',
                route: '24–72 години',
                icon: 'urgent',
                imageSeed: 'cargo-air-urgent',
            },
            {
                title: 'Запчастини',
                route: 'Європа → Україна',
                icon: 'parts',
                imageSeed: 'cargo-air-parts',
            },
            {
                title: 'Зразки продукції',
                route: 'Малі партії • швидко',
                icon: 'samples',
                imageSeed: 'cargo-air-samples',
            },
            {
                title: 'Невеликі партії вантажу',
                route: 'Консолідація на хабах',
                icon: 'pallet',
                imageSeed: 'cargo-air-small',
            },
        ],
    },
    rail: {
        eyebrow: 'Залізниця',
        heading: 'Що перевозимо залізницею',
        headingHighlight: 'перевозимо залізницею',
        cards: [
            {
                title: 'Промислові вантажі',
                route: 'Європа • Азія → Україна',
                icon: 'industrial',
                imageSeed: 'cargo-rail-industrial',
            },
            {
                title: 'Будівельні матеріали',
                route: 'Регулярні партії',
                icon: 'construction',
                imageSeed: 'cargo-rail-construction',
            },
            {
                title: 'Обладнання',
                route: 'Контейнерні поїзди',
                icon: 'equipment',
                imageSeed: 'cargo-rail-equipment',
            },
            {
                title: 'Сировина',
                route: 'Вагонні відправлення',
                icon: 'raw',
                imageSeed: 'cargo-rail-raw',
            },
            {
                title: 'Великі партії товарів',
                route: 'Стабільний графік',
                icon: 'container',
                imageSeed: 'cargo-rail-bulk',
            },
            {
                title: 'Контейнери з Китаю',
                route: 'Китай — Європа — Україна',
                icon: 'china',
                imageSeed: 'cargo-rail-china',
            },
        ],
    },
    oversized: {
        eyebrow: 'Проєктна логістика',
        heading: 'Які проєкти супроводжуємо',
        headingHighlight: 'супроводжуємо',
        cards: [
            {
                title: 'Промислове обладнання',
                route: 'Завод → об\'єкт монтажу',
                icon: 'machinery',
                imageSeed: 'cargo-over-plant',
            },
            {
                title: 'Будівельна техніка',
                route: 'Спецдозволи • супровід',
                icon: 'construction',
                imageSeed: 'cargo-over-build',
            },
            {
                title: 'Металоконструкції',
                route: 'Трали • низькорамники',
                icon: 'metal',
                imageSeed: 'cargo-over-metal',
            },
            {
                title: 'Резервуари',
                route: 'Негабарит • проєктна логістика',
                icon: 'tank',
                imageSeed: 'cargo-over-tank',
            },
            {
                title: 'Спецтехніка',
                route: 'Маршрут під габарити',
                icon: 'oversize',
                imageSeed: 'cargo-over-special',
            },
            {
                title: 'Великогабаритні вантажі',
                route: 'Інженерія кріплення',
                icon: 'oversize',
                imageSeed: 'cargo-over-heavy',
            },
        ],
    },
    customs: {
        eyebrow: 'Митниця',
        heading: 'Для яких вантажів надаємо митний супровід',
        headingHighlight: 'надаємо митний супровід',
        cards: [
            {
                title: 'Товари з Китаю',
                route: 'Імпорт у вільний обіг',
                icon: 'china',
                imageSeed: 'cargo-customs-china',
            },
            {
                title: 'Електроніка',
                route: 'Класифікація ТН ВЕД',
                icon: 'electronics',
                imageSeed: 'cargo-customs-electronics',
            },
            {
                title: 'Обладнання',
                route: 'Сертифікати • дозволи',
                icon: 'equipment',
                imageSeed: 'cargo-customs-equipment',
            },
            {
                title: 'Меблі',
                route: 'Імпорт • експорт',
                icon: 'furniture',
                imageSeed: 'cargo-customs-furniture',
            },
            {
                title: 'Текстиль',
                route: 'Преференції • EUR.1',
                icon: 'textile',
                imageSeed: 'cargo-customs-textile',
            },
            {
                title: 'Промислові товари',
                route: 'Прогноз митних платежів',
                icon: 'industrial',
                imageSeed: 'cargo-customs-industrial',
            },
        ],
    },
    multimodal: {
        eyebrow: 'Мультимодальні перевезення',
        heading: 'Які вантажі перевозимо мультимодально',
        headingHighlight: 'перевозимо мультимодально',
        cards: [
            {
                title: 'Великі партії товарів',
                route: 'Море + залізниця + авто',
                icon: 'container',
                imageSeed: 'cargo-multi-bulk',
            },
            {
                title: 'Імпорт з Китаю',
                route: 'Door-to-door',
                icon: 'china',
                imageSeed: 'cargo-multi-china',
            },
            {
                title: 'Обладнання',
                route: 'Оптимальні плечі',
                icon: 'equipment',
                imageSeed: 'cargo-multi-equipment',
            },
            {
                title: 'Електроніка',
                route: 'Авіа + авто за потреби',
                icon: 'electronics',
                imageSeed: 'cargo-multi-electronics',
            },
            {
                title: 'Меблі',
                route: 'Море + авто «останньої милі»',
                icon: 'furniture',
                imageSeed: 'cargo-multi-furniture',
            },
            {
                title: 'Товари для e-commerce',
                route: 'LCL • LTL • мультимодально',
                icon: 'ecommerce',
                imageSeed: 'cargo-multi-ecommerce',
            },
        ],
    },
};
