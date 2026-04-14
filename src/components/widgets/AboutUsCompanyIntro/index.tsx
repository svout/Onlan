'use client';

import { CardCircle } from '@/assets/icons/CardCircle';

export const AboutUsCompanyIntro = () => {
    return (
        <section
            className="relative w-full bg-onlan-white py-12 md:py-16 lg:py-20"
            aria-labelledby="about-us-company-intro-heading"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-start gap-2">
                    <div className="size-2 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p
                            id="about-us-company-intro-heading"
                            className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black"
                        >
                            Про компанію
                        </p>
                    </div>
                </div>

                <div className="relative mt-8 overflow-hidden bg-onlan-white p-8 md:mt-10 md:p-12 lg:p-30">
                    <div
                        className="pointer-events-none absolute -left-6 -top-6 text-onlan-blue/85 md:-left-8 md:-top-8"
                        aria-hidden
                    >
                        <div className="origin-center rotate-180">
                            <CardCircle className="h-auto rotate-[-270deg] w-[min(240px,38vw)] md:w-[200px]" />
                        </div>
                    </div>
                    <div
                        className="pointer-events-none absolute -bottom-6 -right-6 text-onlan-blue/85 md:-bottom-8 md:-right-8"
                        aria-hidden
                    >
                        <CardCircle className="h-auto rotate-[-270deg] w-[min(240px,38vw)] md:w-[200px]" />
                    </div>

                    <p className="relative z-10 mx-auto max-w-6xl uppercase text-center text-2xl font-medium leading-relaxed text-onlan-black">
                        ONLAN Logistic — провідна українська компанія з головним офісом
                        у Вінниці. Ми пропонуємо індивідуальні логістичні рішення «під ключ»: контейнерні,
                        мультимодальні, морські та авіаперевезення, митне оформлення, страхування й складську
                        логістику. Наша місія — зробити міжнародну торгівлю простою, надійною та прозорою.
                    </p>
                </div>
            </div>
        </section>
    );
};
