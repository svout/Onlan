'use client';

import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import type { IconType } from 'react-icons';
import {
    HiOutlineBuildingOffice2,
    HiOutlineChatBubbleLeftRight,
    HiOutlineClipboardDocumentCheck,
    HiOutlineDocumentText,
    HiOutlineTruck,
} from 'react-icons/hi2';
import { CardCircle } from '@/assets/icons/CardCircle';
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────── Data ─────────────────────────────── */

const RISK_CARD_ICON_CLASS =
    'size-8 shrink-0 text-onlan-blue md:size-9 [&>path]:stroke-[1.5]';

const RISK_CARDS: { Icon: IconType; title: string; text: string }[] = [
    {
        Icon: HiOutlineClipboardDocumentCheck,
        title: 'Митниця',
        text: 'Затримки через перевірки та оформлення',
    },
    {
        Icon: HiOutlineBuildingOffice2,
        title: 'Склади',
        text: 'Простої та неузгодженість процесів',
    },
    {
        Icon: HiOutlineTruck,
        title: 'Перевізники',
        text: 'Людський фактор і збої в дорозі',
    },
    {
        Icon: HiOutlineChatBubbleLeftRight,
        title: 'Комунікація',
        text: 'Відсутність контролю між учасниками',
    },
    {
        Icon: HiOutlineDocumentText,
        title: 'Документи',
        text: 'Помилки та відсутність перевірки перед відправкою',
    },
];

const MARINA_PHOTO: string | null = null;

/* ─────────────────────────── Animation config ─────────────────────── */

const ANIM = {
    /** Shared defaults — keeps every tween GPU-composited */
    base: { ease: 'power3.out', duration: 0.7 },
    /** Default ScrollTrigger: fire once element is ~15 % in viewport */
    trigger: (el: Element) =>
        ({
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
        }) satisfies ScrollTrigger.Vars,
} as const;

/* ════════════════════════════════════════════════════════════════════ */

export function AntiPainSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const root = sectionRef.current;
        if (!root) return;

        /* Skip all motion when the user prefers reduced motion */
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) return;

        const ctx = gsap.context(() => {
            /* ── 1. Quote mark — scale + fade entrance ── */
            gsap.from('[data-anim="quote"]', {
                scale: 0.6,
                opacity: 0,
                ...ANIM.base,
                duration: 0.9,
                scrollTrigger: ANIM.trigger(root.querySelector('[data-anim="quote"]')!),
            });

            /* ── 2. Heading — slide up ── */
            gsap.from('[data-anim="heading"]', {
                y: 24,
                opacity: 0,
                ...ANIM.base,
                delay: 0.12,
                scrollTrigger: ANIM.trigger(root.querySelector('[data-anim="heading"]')!),
            });

            /* ── 3. Heading highlight span — slight scale emphasis ── */
            gsap.from('[data-anim="heading-hl"]', {
                scale: 0.96,
                opacity: 0,
                ...ANIM.base,
                delay: 0.3,
                scrollTrigger: ANIM.trigger(root.querySelector('[data-anim="heading"]')!),
            });

            /* ── 4. Accent bar — width grows from left ── */
            gsap.from('[data-anim="bar"]', {
                scaleX: 0,
                transformOrigin: 'left center',
                ...ANIM.base,
                delay: 0.35,
                scrollTrigger: ANIM.trigger(root.querySelector('[data-anim="bar"]')!),
            });

            /* ── 5. Founder avatar — scale-in with soft bounce ── */
            gsap.from('[data-anim="avatar"]', {
                scale: 0,
                opacity: 0,
                ease: 'back.out(1.4)',
                duration: 0.6,
                delay: 0.4,
                scrollTrigger: ANIM.trigger(root.querySelector('[data-anim="avatar"]')!),
            });

            /* ── 6. Founder name / role — fade slide ── */
            gsap.from('[data-anim="founder-text"]', {
                x: -12,
                opacity: 0,
                ...ANIM.base,
                duration: 0.5,
                delay: 0.55,
                scrollTrigger: ANIM.trigger(root.querySelector('[data-anim="avatar"]')!),
            });

            /* ── 7. Story paragraphs — staggered fade + slide ── */
            gsap.from('[data-anim="story"]', {
                y: 28,
                opacity: 0,
                ...ANIM.base,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: root.querySelector('[data-anim-group="story"]'),
                    start: 'top 82%',
                    toggleActions: 'play none none reverse',
                },
            });

            /* ── 8. CTA banner — full block slides up ── */
            const ctaBanner = root.querySelector('[data-anim="cta-banner"]');
            if (ctaBanner) {
                gsap.from(ctaBanner, {
                    y: 40,
                    opacity: 0,
                    ...ANIM.base,
                    duration: 0.8,
                    scrollTrigger: ANIM.trigger(ctaBanner),
                });

                /* Arc ring — slow rotation + subtle float */
                const arc = root.querySelector('[data-anim="cta-arc"]');
                if (arc) {
                    gsap.to(arc, {
                        rotation: 45,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: ctaBanner,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.2,
                        },
                    });
                }

                /* Arc fill — gentle scale pulse */
                const arcFill = root.querySelector('[data-anim="cta-arc-fill"]');
                if (arcFill) {
                    gsap.fromTo(
                        arcFill,
                        { scale: 0.92 },
                        {
                            scale: 1.05,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: ctaBanner,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1.5,
                            },
                        },
                    );
                }

                /* Label — fade slide */
                const ctaLabel = root.querySelector('[data-anim="cta-label"]');
                if (ctaLabel) {
                    gsap.from(ctaLabel, {
                        y: 14,
                        opacity: 0,
                        ...ANIM.base,
                        duration: 0.5,
                        delay: 0.1,
                        scrollTrigger: ANIM.trigger(ctaBanner),
                    });
                }

                /* Heading — slide up */
                const ctaH = root.querySelector('[data-anim="cta-heading"]');
                if (ctaH) {
                    gsap.from(ctaH, {
                        y: 24,
                        opacity: 0,
                        ...ANIM.base,
                        delay: 0.18,
                        scrollTrigger: ANIM.trigger(ctaBanner),
                    });
                }

                /* Body text — slide up */
                const ctaB = root.querySelector('[data-anim="cta-body"]');
                if (ctaB) {
                    gsap.from(ctaB, {
                        y: 20,
                        opacity: 0,
                        ...ANIM.base,
                        delay: 0.28,
                        scrollTrigger: ANIM.trigger(ctaBanner),
                    });
                }

                /* CTA button — scale bounce entrance */
                const ctaBtn = root.querySelector('[data-anim="cta-btn"]');
                if (ctaBtn) {
                    gsap.from(ctaBtn, {
                        scale: 0.85,
                        opacity: 0,
                        ease: 'back.out(1.6)',
                        duration: 0.6,
                        delay: 0.4,
                        scrollTrigger: ANIM.trigger(ctaBanner),
                    });
                }
            }

            /* ── 9. Risk heading + subtitle ── */
            gsap.from('[data-anim="risk-header"]', {
                y: 20,
                opacity: 0,
                ...ANIM.base,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: root.querySelector('[data-anim-group="risk-header"]'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });

            /* ── 10. Risk cards grid — staggered fade + slide up */
            root.querySelectorAll<HTMLElement>('[data-anim="risk-card"]').forEach((el, i) => {
                gsap.from(el, {
                    y: 28,
                    opacity: 0,
                    ...ANIM.base,
                    duration: 0.55,
                    delay: i * 0.06,
                    scrollTrigger: ANIM.trigger(el),
                });
            });
        }, root);

        /* Ensure ScrollTrigger recalculates after fonts / images settle */
        const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);

        return () => {
            window.clearTimeout(refresh);
            ctx.revert();
        };
    }, []);

    /* ══════════════════════════════ JSX ══════════════════════════════ */

    return (
        <section
            ref={sectionRef}
            className="relative isolate w-full bg-onlan-white"
            aria-labelledby="anti-pain-heading"
        >
            {/* Blobs — clipped so they never trigger page-level overflow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div className="absolute -right-[18%] -top-[25%] h-[min(80vw,480px)] w-[min(80vw,480px)] rounded-full bg-onlan-lavender/40 blur-[100px]" />
                <div className="absolute -bottom-[30%] -left-[12%] h-[min(60vw,340px)] w-[min(60vw,340px)] rounded-full bg-onlan-lime/20 blur-[100px]" />
            </div>

            {/* ─────────── HERO: quote + founder · storytelling ─────────── */}
            <div className="relative pt-20">
                <div className="container relative mx-auto px-4">
                    <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">

                        {/* LEFT — quote + founder */}
                        <div className="lg:col-span-5 xl:col-span-5">
                            <div className="relative lg:sticky lg:top-28">
                                <span
                                    data-anim="quote"
                                    className="pointer-events-none absolute -left-2 -top-8 select-none font-serif text-[7rem] leading-none text-onlan-lime/50 will-change-transform md:-left-4 md:-top-10 md:text-[9rem] lg:text-[10rem]"
                                    aria-hidden
                                >
                                    &ldquo;
                                </span>

                                <h2
                                    data-anim="heading"
                                    id="anti-pain-heading"
                                    className="relative text-balance text-2xl font-semibold leading-[1.18] tracking-tight text-onlan-black will-change-transform md:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem]"
                                >
                                    Логістика&nbsp;&mdash; це не система.{' '}
                                    <span data-anim="heading-hl" className="inline-block text-onlan-blue will-change-transform">
                                        Це люди, які приймають рішення
                                    </span>
                                </h2>

                                <div
                                    data-anim="bar"
                                    className="mt-6 h-1 w-16 rounded-full bg-onlan-lime will-change-transform md:mt-8 md:w-20"
                                    aria-hidden
                                />

                                <div className="mt-8 flex items-center gap-4 md:mt-10">
                                    {MARINA_PHOTO ? (
                                        <Image
                                            data-anim="avatar"
                                            src={MARINA_PHOTO}
                                            alt="Марина — CEO, OnLan Logistic"
                                            width={56}
                                            height={56}
                                            className="size-14 rounded-full object-cover ring-2 ring-onlan-lavender/60 ring-offset-2 ring-offset-onlan-white will-change-transform"
                                        />
                                    ) : (
                                        <span
                                            data-anim="avatar"
                                            className="flex size-14 items-center justify-center rounded-full bg-onlan-blue text-lg font-bold text-onlan-white ring-2 ring-onlan-lavender/60 ring-offset-2 ring-offset-onlan-white will-change-transform"
                                            aria-hidden
                                        >
                                            М
                                        </span>
                                    )}
                                    <div data-anim="founder-text" className="min-w-0 will-change-transform">
                                        <p className="text-base font-semibold leading-snug text-onlan-black">
                                            Марина
                                        </p>
                                        <p className="text-sm leading-snug text-onlan-blue/70">
                                            CEO, OnLan Logistic
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — storytelling narrative */}
                        <div className="lg:col-span-7 xl:col-span-7">
                            <div data-anim-group="story" className="max-w-2xl space-y-6 lg:pt-2">
                                <p data-anim="story" className="text-[1.05rem] font-medium leading-[1.7] text-onlan-black/85 will-change-transform md:text-lg md:leading-[1.75]">
                                    OnLan народився з реальних проблем логістики. З&nbsp;нескінченних
                                    дзвінків у&nbsp;п'ятницю ввечері, коли вантаж стоїть на&nbsp;кордоні
                                    без документів. З&nbsp;ситуацій, коли ніхто не&nbsp;знає де
                                    контейнер&nbsp;&mdash; і&nbsp;ніхто не&nbsp;бере відповідальність.
                                </p>

                                <p data-anim="story" className="text-[1.05rem] font-medium leading-[1.7] text-onlan-black/85 will-change-transform md:text-lg md:leading-[1.75]">
                                    Ми бачили, як затримки на&nbsp;митниці знищують дедлайни. Як помилка
                                    в&nbsp;одному документі зупиняє весь ланцюг. Як відсутність
                                    комунікації між складом, перевізником і&nbsp;клієнтом перетворює
                                    просту доставку в&nbsp;хаос.
                                </p>

                                <p data-anim="story" className="text-[1.05rem] font-medium leading-[1.7] text-onlan-blue will-change-transform md:text-lg md:leading-[1.75]">
                                    Тому ми побудували OnLan навколо трьох речей: контроль на&nbsp;кожному
                                    етапі, прозора комунікація і&nbsp;персональна відповідальність.
                                    Не&nbsp;система замість людей&nbsp;&mdash; а&nbsp;люди, які
                                    контролюють систему.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ─────────────── RISK CARDS ─────────────── */}
            <div className="relative py-20 md:py-24 lg:py-28">
                <div className="container relative mx-auto px-4">
                    <div className="absolute left-4 top-20 h-px w-20 bg-onlan-black/20 md:left-8 md:w-28 lg:left-10" aria-hidden />

                    <div data-anim-group="risk-header" className="pt-8 md:flex md:items-end md:justify-between md:gap-10 md:pt-10">
                        <h3
                            data-anim="risk-header"
                            className="max-w-xl text-balance text-[22px] font-semibold leading-tight text-onlan-black will-change-transform md:max-w-2xl md:text-[22px] lg:text-4xl"
                        >
                            Основні ризики доставки&nbsp;&mdash; поза маршрутом
                        </h3>
                        <p
                            data-anim="risk-header"
                            className="mt-4 max-w-md text-base font-medium leading-snug text-onlan-blue/75 will-change-transform md:mt-0 md:text-right md:text-lg lg:shrink-0"
                        >
                            На доставку впливають десятки факторів&nbsp;&mdash; і&nbsp;більшість
                            із&nbsp;них не&nbsp;контролюються системами
                        </p>
                    </div>

                    {/* Risk cards — 2 columns from sm; odd last row centered to match column width */}
                    <ul className="mt-12 max-w-[1000px] mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:gap-7">
                        {RISK_CARDS.map((card, i) => {
                            const { Icon } = card;
                            const isLastCentered =
                                i === RISK_CARDS.length - 1 && RISK_CARDS.length % 2 === 1;
                            return (
                                <li
                                    key={card.title}
                                    data-anim="risk-card"
                                    className={clsx(
                                        'will-change-transform',
                                        isLastCentered && 'sm:col-span-2 sm:flex sm:justify-center',
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            'relative h-full w-full overflow-hidden rounded-2xl bg-onlan-white p-5 ring-1 ring-onlan-black/6 transition duration-300 hover:-translate-y-0.5 hover:ring-onlan-blue/20 hover:shadow-sm lg:p-6',
                                            isLastCentered &&
                                                'sm:max-w-[calc(50%-0.75rem)] lg:max-w-[calc(50%-0.875rem)]',
                                        )}
                                    >
                                        <div
                                            className="pointer-events-none absolute -right-6 -top-4 text-onlan-blue/90 [&_svg]:h-auto [&_svg]:w-[min(8rem,42vw)] sm:[&_svg]:w-[min(9rem,30vw)]"
                                            aria-hidden
                                        >
                                            <CardCircle />
                                        </div>
                                        <Icon className={RISK_CARD_ICON_CLASS} aria-hidden />
                                        <h4 className="relative mt-2 text-lg font-semibold text-onlan-black lg:mt-3 lg:text-xl">
                                            {card.title}
                                        </h4>
                                        <p className="relative mt-2 text-sm font-medium leading-snug text-onlan-blue/75 md:text-base">
                                            {card.text}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
