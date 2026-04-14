import Image from 'next/image';
import Container from '@images/container.png';
import Title from '@/components/elements/Title';

const hero = {
    h1: 'Міжнародні перевезення Європа, Китай – імпортуємо та експортуємо ваш вантаж.',
    description:
        'Експрес-логістика для бізнесу, що рухається швидко. Митниця за 24 години, повний контроль маршруту, нульові затримки.',
    cta: 'Отримати розрахунок доставки →',
} as const;

export const HeroSection = () => {
    return (
        <section className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-onlan-white/90 py-12 md:py-16 lg:py-20">
            <div className="relative z-10 container mx-auto px-4">
                <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
                    <div className="flex w-full max-w-xl flex-1 flex-col items-center text-center md:items-start md:text-left">

                        <Title title={hero.h1} type="h1" className="text-balance font-bold leading-tight text-onlan-black md:mt-5" />

                        <p className="mt-3 max-w-[520px] text-sm font-medium text-balance text-onlan-blue/90 md:text-base lg:text-lg">
                            {hero.description}
                        </p>

                        <div className="mt-7 flex w-full justify-center md:justify-start">
                            <button
                                type="button"
                                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-lg bg-onlan-blue px-6 text-white transition-colors hover:bg-onlan-blue/90 sm:w-auto lg:h-14 lg:px-9"
                            >
                                <span className="text-base font-semibold md:text-lg lg:text-[19px]">{hero.cta}</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex w-full flex-1 shrink-0 items-center justify-center rounded-2xl border border-onlan-black">
                        <Image
                            src={Container}
                            alt="Міжнародні вантажні перевезення та доставка в Україну з Європи, Китаю, США"
                            width={560}
                            height={560}
                            className="h-auto w-full object-contain drop-shadow-md"
                            priority
                            sizes="(max-width: 768px) 100vw, 45vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
