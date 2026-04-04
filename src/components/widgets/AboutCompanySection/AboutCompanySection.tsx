import Image from 'next/image';
import Trailer from '@/assets/images/Trailer.png';
import Title from '@/components/elements/Title';

export const AboutCompanySection = () => {
    return (
        <section
            className="w-full py-10"
            aria-labelledby="about-company-heading"
        >
            <div className="container mx-auto px-4">
                <div className="flex w-full flex-col">
                    <p className="text-sm font-semibold uppercase tracking-wider text-onlan-blue">Про компанію</p>
                    <Title
                        id="about-company-heading"
                        title="ONLAN — українська компанія, що забезпечує надійну доставку, створюючи маршрути, які гарантують,
                        що ваш вантаж прибуде вчасно та саме туди, де він потрібен."
                        type="h2"
                        className="mt-2 w-full min-w-0 max-w-none text-left text-xl! font-bold! leading-snug! text-onlan-black md:mt-3 md:text-2xl! lg:text-3xl!"
                    />
                    <div className="relative mt-3 w-full overflow-hidden md:mt-4">
                        <div className="relative aspect-5/3 w-full max-h-[min(62vh,620px)] min-h-[220px] md:min-h-[280px] lg:aspect-2/1 lg:max-h-[min(58vh,640px)]">
                            <Image
                                src={Trailer}
                                alt="Сучасний напівпричіп для міжнародних перевезень ONLAN"
                                fill
                                className="object-cover object-[center_75%]"
                                sizes="(max-width: 768px) 100vw, min(1280px, 100vw)"
                                priority={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
