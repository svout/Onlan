'use client';

import Image from 'next/image';
import { Link } from 'react-router';
import trackSunset from '@/assets/images/aboutUsTrackSunset.png';

const COPY = {
    body: 'ONLAN — українська компанія, що забезпечує надійну доставку, створюючи маршрути, які гарантують, що ваш вантаж прибуде вчасно та саме туди, де він потрібен.',
    cta: 'про нас',
} as const;

export function AboutUsNew() {
    return (
        <section
            className="relative overflow-hidden bg-onlan-white py-16 md:py-24"
            aria-labelledby="about-us-new-heading"
        >
            <div className="container relative mx-auto px-4">
                <h2 id="about-us-new-heading" className="sr-only">
                    Про компанію ONLAN
                </h2>
                <div className="flex items-center justify-start gap-2">
                    <div className="size-2 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            Про компанію
                        </p>
                    </div>
                </div>

                <div className="relative mt-8 h-[450px] rounded-2xl w-full min-w-0 overflow-hidden md:mt-10">
                    <Image
                        src={trackSunset}
                        alt="Вантажівка на трасі — логістика та доставка ONLAN"
                        fill
                        className="object-cover object-[20%_80%]"
                        sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 2rem), 1200px"
                    />
                </div>

                <div className="mt-[30px] w-full text-left">
                    <p className="w-full uppercase text-base font-bold text-onlan-black/90 md:text-4xl">
                        {COPY.body}
                    </p>
                    <div className="mt-8 flex w-full justify-start md:mt-10">
                        <Link
                            to="/about-us"
                            className="btn btn-lime btn-wide min-w-[100px] px-8 font-semibold"
                        >
                            {COPY.cta}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
