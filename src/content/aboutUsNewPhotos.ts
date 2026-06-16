import imgContainers from '@images/aboutUsNew/containers.png';
import imgOffice from '@images/aboutUsNew/office.png';
import imgPlane from '@images/aboutUsNew/plane.png';
import imgTruck from '@images/aboutUsNew/truck.png';
import imgWarehouse from '@images/aboutUsNew/warehouse.png';

export type AboutUsNewPhoto = {
    id: string;
    src: string;
    alt: string;
    top: string;
    left: string;
    rotate?: string;
    aboveText: boolean;
    blur: '50' | '80' | '0';
};

export const ABOUT_US_NEW_PHOTOS: AboutUsNewPhoto[] = [
    {
        id: 'plane',
        src: imgPlane,
        alt: 'Завантаження вантажу в літак',
        top: '5%',
        left: '10%',
        aboveText: false,
        blur: '80',
    },
    {
        id: 'truck',
        src: imgTruck,
        alt: 'Вантажний автомобіль у порту',
        top: '1%',
        left: '52%',
        aboveText: true,
        blur: '50',
    },
    {
        id: 'containers',
        src: imgContainers,
        alt: 'Контейнерне навантаження',
        top: '15%',
        left: '78%',
        aboveText: false,
        blur: '50',
    },
    {
        id: 'warehouse',
        src: imgWarehouse,
        alt: 'Складська логістика',
        top: '50%',
        left: '-4%',
        aboveText: true,
        blur: '50',
    },
    {
        id: 'office',
        src: imgOffice,
        alt: 'Офіс ONLAN Logistic',
        top: '65%',
        left: '52%',
        aboveText: false,
        blur: '0',
    },
    {
        id: 'truck-secondary',
        src: imgTruck,
        alt: 'Міжнародні автоперевезення',
        top: '70%',
        left: '26%',
        aboveText: false,
        blur: '50',
    },
    {
        id: 'plane-secondary',
        src: imgPlane,
        alt: 'Авіадоставка вантажів',
        top: '72%',
        left: '82%',
        aboveText: true,
        blur: '80',
    },
];
