import TruckIcon from '@/assets/icons/Truck.svg';
import PlaneIcon from '@/assets/icons/Plane.svg';
import ShipIcon from '@/assets/icons/Ship.svg';
import ButtonArrowRightIcon from '@/assets/icons/ButtonArrow.svg';
import heroPhoto from '@/assets/images/AboutUsHero.webp';
import Image from 'next/image';
import { Elements } from '@/components/elements';
import Description from '@/components/elements/Description';
import { Link } from '@/lib/router';

const ICON_CIRCLE = 'flex size-14 shrink-0 items-center justify-center rounded-full md:size-[78px]';

export const AboutUsHero = () => {
    return (
        <section className="relative w-full overflow-x-hidden bg-onlan-white/90 py-10 md:min-h-[calc(100dvh-5rem)] md:py-16 lg:py-20">
            <div className="relative z-10 container mx-auto flex flex-col items-center justify-center gap-10 px-4 md:gap-16 lg:gap-20">
                <div className="flex w-full max-w-[1200px] flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                    <div className="flex w-full max-w-[700px] flex-col items-center lg:items-start">
                        <div className="flex w-full flex-col">
                            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end lg:justify-end">
                                <div className="flex items-center justify-center">
                                    <div className={`${ICON_CIRCLE} -mr-4 md:-mr-[30px] bg-[#EAEAEA]`}>
                                        <Image src={PlaneIcon} alt="" width={38} height={38} className="size-7 md:size-[38px]" aria-hidden />
                                    </div>
                                    <div className={`${ICON_CIRCLE} bg-onlan-blue`}>
                                        <Image src={TruckIcon} alt="" width={38} height={38} className="size-7 md:size-[38px]" aria-hidden />
                                    </div>
                                </div>

                                <Elements.Title
                                    title="ONLAN Logistic"
                                    type="h1"
                                    className="text-balance text-center uppercase font-bold! text-onlan-black sm:text-left lg:text-left"
                                />
                            </div>

                            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                                <Elements.Title
                                    title="— надійний"
                                    type="h1"
                                    className="text-balance uppercase font-bold! tracking-tight text-onlan-black"
                                />
                                <div className={`${ICON_CIRCLE} bg-onlan-lime`}>
                                    <Image src={ShipIcon} alt="" width={38} height={38} className="size-7 md:size-[38px]" aria-hidden />
                                </div>
                            </div>

                            <div className="mt-1 flex min-w-0 items-center justify-center sm:justify-start">
                                <Elements.Title
                                    title="логістичний партнер"
                                    type="h1"
                                    className="text-balance uppercase font-bold! text-onlan-black"
                                />
                            </div>
                            <div className="mt-1 flex items-center justify-center sm:justify-end">
                                <Elements.Title
                                    title="для бізнесу"
                                    type="h1"
                                    className="text-balance uppercase font-bold! text-onlan-blue"
                                />
                            </div>
                        </div>
                    </div>

                    <Image
                        src={heroPhoto}
                        alt="Вантажівка OnLan на міжнародному маршруті — нічний перевіз вантажу"
                        width={400}
                        height={300}
                        className="order-first h-[220px] w-full max-w-full rounded-2xl border border-onlan-black/10 object-cover object-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:h-[260px] lg:order-0 lg:h-[300px] lg:max-w-[400px]"
                        sizes="(max-width: 1024px) 100vw, 400px"
                        priority
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <Description
                        description="10+ років досвіду в контрейнерних, мультимодальних та авіа-перевезеннях"
                        type="medium"
                    />

                    <Link to="/contacts" className="flex items-center justify-center gap-1">
                        <Elements.Button variant="lime" size="xl">
                            <span className="text-base font-semibold uppercase md:text-lg lg:text-[19px]">
                                Дізнатися більше про нас
                            </span>
                        </Elements.Button>
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-onlan-lime md:size-[60px]">
                            <Image src={ButtonArrowRightIcon} alt="" width={24} height={24} aria-hidden />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
