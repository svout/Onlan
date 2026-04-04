import type { HowItWorksServiceItem } from '@/types/HowItWorks.interface';

export const HOW_IT_WORKS_SERVICES: HowItWorksServiceItem[] = [
    {
        number: '01',
        slug: 'automotive',
        tagLabel: 'Дорожні перевезення',
        title: 'Автомобільні перевезення',
        description:
            'FTL та LTL по Україні та Європі: збірні й повні фури, відстеження маршруту та узгоджені терміни розвантаження для вашого бізнесу.',
        iconId: 'truck',
    },
    {
        number: '02',
        slug: 'sea-container',
        tagLabel: 'Морські лінії',
        title: 'Морські та контейнерні перевезення',
        description:
            'FCL і LCL з ключових портів, робота з контейнерами різних типів і стикування з автоперевезеннями «останньої милі».',
        iconId: 'ship',
    },
    {
        number: '03',
        slug: 'air',
        tagLabel: 'Авіа',
        title: 'Авіа перевезення',
        description:
            'Прискорена доставка для термінових партій і високої цінності вантажу — прямі рейси та мінімальні часи обробки на хабах.',
        iconId: 'plane',
    },
    {
        number: '04',
        slug: 'rail',
        tagLabel: 'Залізниця',
        title: 'Залізничні перевезення',
        description:
            'Контейнерні та вагонні відправлення, маршрути з Європи та Азії з прозорим графіком і узгодженням на стиках.',
        iconId: 'train',
    },
    {
        number: '05',
        slug: 'oversized',
        tagLabel: 'Проєктна логістика',
        title: 'Негабаритні перевезення',
        description:
            'Окремі схеми кріплення, спецдозволи та супровід негабариту від заводу до точки монтажу — з оцінкою ризиків на етапі заявки.',
        iconId: 'oversize',
    },
    {
        number: '06',
        slug: 'customs',
        tagLabel: 'Митниця',
        title: 'Митне оформлення',
        description:
            'Класифікація ТН ВЕД, підготовка пакета документів і взаємодія з митницею, щоб мінімізувати зупинки та додаткові платежі.',
        iconId: 'customs',
    },
];

export function getServiceBySlug(slug: string): HowItWorksServiceItem | undefined {
    return HOW_IT_WORKS_SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugParams(): { slug: string }[] {
    return HOW_IT_WORKS_SERVICES.map((s) => ({ slug: s.slug }));
}
