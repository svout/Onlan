import TruckIcon from '@/assets/icons/Truck.svg';
import PlaneIcon from '@/assets/icons/Plane.svg';
import ShipIcon from '@/assets/icons/Ship.svg';
import ButtonArrowRightIcon from '@/assets/icons/ButtonArrow.svg';
import heroPhoto from '@/assets/images/AboutUsHero.png';
import Image from 'next/image';
import { Elements } from '@/components/elements';
import Description from '@/components/elements/Description';
import { Link } from '@/lib/router';

export const AboutUsHero = () => {
    return (
        <section className="relative h-[calc(100vh-80px)] min-h-0 w-full overflow-hidden bg-onlan-white/90 py-12 md:py-16 lg:py-20">
            <div className="relative z-10 container mx-auto flex flex-col items-center justify-center gap-10 px-4">
                <div className="flex w-full max-w-[1200px] justify-between items-center">
                    {/* Left — same layout as before: centered column, staggered rows */}
                    <div className="flex flex-col w-full max-w-[700px] items-center">
                        <div className="flex justify-center flex-col">
                            <div className="flex items-center justify-end gap-2">
                                <div className="flex items-center justify-center">
                                    <div className="mr-[-30px] flex size-[78px] items-center justify-center rounded-full bg-[#EAEAEA]">
                                        <Image src={PlaneIcon} alt="" width={38} height={38} aria-hidden />
                                    </div>
                                    <div className="flex size-[78px] items-center justify-center rounded-full bg-onlan-blue">
                                        <Image src={TruckIcon} alt="" width={38} height={38} aria-hidden />
                                    </div>
                                </div>

                                <Elements.Title
                                    title="ONLAN Logistic"
                                    type="h1"
                                    className="uppercase font-bold! text-onlan-black"
                                />
                            </div>

                            <div className="flex items-center justify-start gap-2">
                                <Elements.Title
                                    title="— надійний"
                                    type="h1"
                                    className="text-balance uppercase font-bold! tracking-tight text-onlan-black"
                                />
                                <div className="flex size-[78px] items-center justify-center rounded-full bg-onlan-lime">
                                    <Image src={ShipIcon} alt="" width={38} height={38} aria-hidden />
                                </div>
                            </div>

                            <div className="flex min-w-0 items-center justify-start overflow-x-auto">
                                <Elements.Title
                                    title="логістичний партнер"
                                    type="h1"
                                    className="whitespace-nowrap uppercase font-bold! text-onlan-black"
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <Elements.Title
                                    title="для бізнесу"
                                    type="h1"
                                    className="uppercase font-bold! text-onlan-blue"
                                />
                            </div>
                        </div>
                    </div>

                    <Image
                        src={heroPhoto}
                        alt="Вантажівка OnLan на міжнародному маршруті — нічний перевіз вантажу"
                        width={400}
                        height={300}
                        className="h-[300px] w-full max-w-[400px] rounded-2xl border border-onlan-black/10 object-cover object-center shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                        sizes="400px"
                        priority
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-5">
                    <Description
                        description="10+ років досвіду в контрейнерних, мультимодальних та авіа-перевезеннях"
                        type="medium"
                    />

                    <Link to="/contact" className="flex items-center justify-center gap-1">
                        <Elements.Button variant="lime" size="xl">
                            <span className="text-base uppercase font-semibold md:text-lg lg:text-[19px]">
                                Дізнатися більше про нас
                            </span>
                        </Elements.Button>
                        <span className="flex size-[60px] items-center justify-center rounded-full bg-onlan-lime">
                            <Image src={ButtonArrowRightIcon} alt="" width={24} height={24} aria-hidden />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
