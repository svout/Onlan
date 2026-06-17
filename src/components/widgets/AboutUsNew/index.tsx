'use client';

import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { ABOUT_US_NEW_PHOTOS, type AboutUsNewPhoto } from '@/content/aboutUsNewPhotos';

const MARQUEE_REPEAT = 12;

function photoFilterClass(blur: AboutUsNewPhoto['blur']) {
    if (blur === '80') return '[filter:grayscale(1)_blur(8px)]';
    if (blur === '50') return '[filter:grayscale(1)_blur(3px)]';
    return '[filter:grayscale(1)]';
}

function photoTintClass(blur: AboutUsNewPhoto['blur']) {
    if (blur === '80') return 'bg-onlan-blue/40';
    if (blur === '50') return 'bg-onlan-blue/28';
    return 'bg-onlan-lavender/45';
}

function AboutUsNewPhotoCard({
    photo,
    className = '',
    style,
}: {
    photo: AboutUsNewPhoto;
    className?: string;
    style?: CSSProperties;
}) {
    const zClass = photo.aboveText ? 'z-20 hover:z-40' : 'z-[5] hover:z-40';

    return (
        <button
            type="button"
            className={`group cursor-pointer overflow-hidden rounded-lg border border-onlan-lavender/40 bg-onlan-lavender/20 shadow-md transition-[z-index] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-onlan-blue focus-visible:ring-offset-2 ${zClass} ${className}`}
            style={style}
            aria-label={photo.alt}
        >
            <div
                className="relative h-full w-full origin-center transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.04]"
                style={{ transform: `rotate(${photo.rotate ?? '0deg'})` }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={photo.src}
                    alt={photo.alt}
                    width={300}
                    height={200}
                    className={`h-full w-full object-cover transition-[filter] duration-300 ease-out ${photoFilterClass(photo.blur)} group-hover:[filter:grayscale(0)_blur(0)]`}
                    loading="lazy"
                />
                <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out ${photoTintClass(photo.blur)} mix-blend-multiply group-hover:opacity-0`}
                    aria-hidden
                />
            </div>
        </button>
    );
}

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

            <section className="relative overflow-hidden bg-onlan-white py-12 md:py-20 lg:py-24" aria-labelledby="about-us-new-heading">
                <div className="container relative mx-auto px-4">
                    <div className="flex items-center justify-start gap-2">
                        <div className="size-2 rounded-full bg-onlan-lime" />
                        <div className="rounded-full border border-onlan-black px-4 py-2">
                            <p className="w-full text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                                Про компанію
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative mt-8 w-full md:mt-10">
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

                    {/* Mobile / tablet — simple grid */}
                    <div className="relative z-[5] mx-auto grid max-w-[640px] grid-cols-2 gap-3 px-4 sm:max-w-3xl sm:grid-cols-3 sm:gap-4 lg:hidden">
                        {ABOUT_US_NEW_PHOTOS.map((photo) => (
                            <AboutUsNewPhotoCard
                                key={`grid-${photo.id}`}
                                photo={photo}
                                className="relative aspect-[3/2] w-full"
                            />
                        ))}
                    </div>

                    {/* Desktop — absolute collage */}
                    <div className="relative mx-auto hidden min-h-[min(72vh,720px)] w-full max-w-[1400px] px-4 md:px-8 lg:block">
                        {ABOUT_US_NEW_PHOTOS.map((photo) => (
                            <AboutUsNewPhotoCard
                                key={photo.id}
                                photo={photo}
                                className="absolute h-[200px] w-[300px] max-w-[calc(100vw-2rem)]"
                                style={{ top: photo.top, left: photo.left }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-[55] mx-auto mt-10 flex justify-center px-4 pb-6 md:mt-14">
                    <Link
                        to="/about-us"
                        className="btn btn-primary btn-wide min-w-[200px] px-8 font-semibold"
                    >
                        Про компанію
                    </Link>
                </div>
            </section>
        </>
    );
}
