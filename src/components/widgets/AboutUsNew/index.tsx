'use client';

import { Link } from 'react-router';

/** Picsum seeds → stable 300×200 images */
const PHOTOS: {
    seed: string;
    top: string;
    left: string;
    rotate?: string;
    /** z below marquee (5) or above (20) */
    aboveText: boolean;
    /** visual blur strength */
    blur: '50' | '80' | '0';
}[] = [
        { seed: 'onlan-a', top: '5%', left: '10%', aboveText: false, blur: '80' },
        { seed: 'onlan-b', top: '1%', left: '52%', aboveText: true, blur: '50' },
        { seed: 'onlan-c', top: '15%', left: '78%', aboveText: false, blur: '50' },
        { seed: 'onlan-d', top: '50%', left: '-4%', aboveText: true, blur: '50' },
        { seed: 'onlan-e', top: '65%', left: '52%', aboveText: false, blur: '0' },
        { seed: 'onlan-g', top: '70%', left: '26%', aboveText: false, blur: '50' },
        { seed: 'onlan-h', top: '72%', left: '82%', aboveText: true, blur: '80' },
    ];

const MARQUEE_REPEAT = 12;

export function AboutUsNew() {
    return (
        <>
            <style>{`
        @keyframes about-onlan-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .about-onlan-marquee-track {
          display: flex;
          width: max-content;
          animation: about-onlan-marquee 45s linear infinite;
        }
      `}</style>

            <section className="relative overflow-hidden bg-onlan-white py-16 md:py-24" aria-labelledby="about-us-new-heading">
                <div className="container relative mx-auto">
                    <div className="flex items-center justify-start gap-2">
                        <div className="w-2 h-2 bg-onlan-lime rounded-full"></div>
                        <div className="py-2 px-4 border border-onlan-black rounded-full">
                            <p className="w-full text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                                Про компанію
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative mt-8 min-h-[min(72vh,720px)] w-full md:mt-10">
                    {/* Marquee — full viewport width (ignores max-width container below) */}
                    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[10] flex w-screen max-w-none -translate-x-1/2 items-center overflow-hidden">
                        <div className="about-onlan-marquee-track gap-16 pr-16 opacity-[0.80] md:gap-24 md:pr-24">
                            {Array.from({ length: 2 }).map((_, dup) => (
                                <div key={dup} className="flex shrink-0 gap-16 md:gap-24">
                                    {Array.from({ length: MARQUEE_REPEAT }).map((__, i) => (
                                        <span
                                            key={`${dup}-${i}`}
                                            className="whitespace-nowrap font-black tracking-tighter text-onlan-blue [font-size:clamp(3rem,16vw,12rem)]"
                                        >
                                            ONLAN
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Photos — constrained layout */}
                    <div className="relative mx-auto min-h-[min(72vh,720px)] w-full max-w-[1400px] px-4 md:px-8">
                        {PHOTOS.map((p) => {
                            const id = `${p.seed}-${p.top}`;
                            /* One `filter` value — Tailwind `blur-*` + `grayscale` both set `filter` and overwrite each other */
                            const filterClass =
                                p.blur === '80'
                                    ? '[filter:grayscale(1)_blur(8px)]'
                                    : p.blur === '50'
                                        ? '[filter:grayscale(1)_blur(3px)]'
                                        : '[filter:grayscale(1)]';
                            /* Сильніше розмиття — трохи насиченіший шар onlan-blue / lavender */
                            const brandTintClass =
                                p.blur === '80'
                                    ? 'bg-onlan-blue/40'
                                    : p.blur === '50'
                                        ? 'bg-onlan-blue/28'
                                        : 'bg-onlan-lavender/45';
                            const zClass = p.aboveText ? 'z-20 hover:z-40' : 'z-[5] hover:z-40';

                            return (
                                <button
                                    key={id}
                                    type="button"
                                    className={`group absolute h-[200px] w-[300px] max-w-[calc(100vw-2rem)] cursor-pointer overflow-hidden rounded-lg border border-onlan-lavender/40 bg-onlan-lavender/20 shadow-md transition-[z-index] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-onlan-blue focus-visible:ring-offset-2 ${zClass}`}
                                    style={{
                                        top: p.top,
                                        left: p.left,
                                    }}
                                    aria-label="Фото ONLAN"
                                >
                                    <div
                                        className="relative h-full w-full origin-center transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.04]"
                                        style={{ transform: `rotate(${p.rotate ?? '0deg'})` }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`https://picsum.photos/seed/${p.seed}/300/200`}
                                            alt=""
                                            width={300}
                                            height={200}
                                            className={`h-full w-full object-cover transition-[filter] duration-300 ease-out ${filterClass} group-hover:[filter:grayscale(0)_blur(0)]`}
                                            loading="lazy"
                                        />
                                        <div
                                            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${brandTintClass} mix-blend-multiply group-hover:opacity-0`}
                                            aria-hidden
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="relative z-[55] mx-auto mt-10 flex justify-center px-4 pb-6 md:mt-14">
                    <Link
                        to="/about"
                        className="btn btn-primary btn-wide min-w-[200px] px-8 font-semibold"
                    >
                        Про компанію
                    </Link>
                </div>
            </section>
        </>
    );
}
