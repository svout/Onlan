'use client';

import { type FormEvent, useCallback, useState } from 'react';
import Image from 'next/image';
import { Link } from 'react-router';
import LinesSvg from '@icons/Lines.svg';
import { Elements } from '@elements/index.ts';
import Title from '@/components/elements/Title';

export function ContactUsSection() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [accepted, setAccepted] = useState(false);

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            if (!accepted) {
                return;
            }
            // Hook up to API / mail when ready
        },
        [accepted],
    );

    return (
        <section className="w-full py-10 md:py-14" aria-labelledby="contact-us-section-heading">
            <div className="container mx-auto flex flex-col items-start px-4">
                <div className="flex items-center justify-start gap-2">
                    <div className="size-2 shrink-0 rounded-full bg-onlan-lime" />
                    <div className="rounded-full border border-onlan-black px-4 py-2">
                        <p className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-onlan-black">
                            контакти
                        </p>
                    </div>
                </div>

                <div className="relative isolate mt-6 flex min-h-[440px] w-full flex-col items-start justify-center overflow-hidden rounded-2xl bg-onlan-blue md:mt-8 md:min-h-[480px] lg:min-h-[720px]">
                    {/* z-0: натуральні розміри з Lines.svg (1128×798); обрізання overflow-hidden */}
                    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                        <div className="absolute top-1/2 right-[-20%] -translate-y-1/2 sm:right-[-8%] md:right-[-6%] lg:right-[-15%]">
                            <Image
                                src={LinesSvg}
                                alt=""
                                width={1128}
                                height={798}
                                className="block h-[798px] w-[1128px] max-w-none shrink-0"
                                sizes="1128px"
                            />
                        </div>
                    </div>

                    <div className="relative z-10 w-full max-w-[624px] p-6 md:p-8 lg:p-10 xl:p-12">
                        <Title title="Довірте нам свою логістику" type="h2" className="text-onlan-white !text-[60px]" />
                        <p className="mt-3 text-base font-medium text-onlan-lavender md:text-lg">
                            І отримаєте сервіс, на який можна покластися.
                        </p>

                        <form className="mt-8 flex w-full flex-col gap-5" onSubmit={onSubmit} noValidate>
                            <Elements.Input
                                id="contact-section-name"
                                name="name"
                                type="text"
                                label="Name"
                                labelClassName="!text-onlan-white"
                                placeholder="Ваше Ім'я"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                inputWrapClassName="flex !h-[61px] min-h-[61px] items-center bg-onlan-white border-onlan-white"
                                inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                className="w-full"
                            />
                            <Elements.Input
                                id="contact-section-phone"
                                name="phone"
                                type="tel"
                                label="Phone number"
                                labelClassName="!text-onlan-white"
                                placeholder="Номер телефону"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                inputWrapClassName="flex !h-[61px] min-h-[61px] items-center bg-onlan-white border-onlan-white"
                                inputClassName="w-full !h-full min-h-0 py-0 leading-none"
                                className="w-full"
                            />

                            <p className="text-xs leading-relaxed text-onlan-white/75 md:text-sm">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a
                                    href="https://policies.google.com/privacy"
                                    className="underline underline-offset-2 hover:text-onlan-white"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a
                                    href="https://policies.google.com/terms"
                                    className="underline underline-offset-2 hover:text-onlan-white"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Terms of Service
                                </a>{' '}
                                apply.
                            </p>

                            <label className="flex cursor-pointer items-center gap-3 text-sm text-onlan-white md:text-base">
                                <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="peer absolute inset-0 z-10 size-5 cursor-pointer opacity-0 focus:outline-none"
                                        checked={accepted}
                                        onChange={(e) => setAccepted(e.target.checked)}
                                    />
                                    <span
                                        aria-hidden
                                        className={`pointer-events-none flex size-5 items-center justify-center rounded border-2 bg-onlan-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-onlan-white peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-onlan-blue ${
                                            accepted ? 'border-onlan-lime' : 'border-onlan-white'
                                        }`}
                                    >
                                        {accepted && (
                                            <svg
                                                className="text-onlan-blue"
                                                width="12"
                                                height="10"
                                                viewBox="0 0 12 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 5.2L4.2 8.4L11 1"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                </span>
                                <span className="leading-snug">
                                    I accept the{' '}
                                    <Link
                                        to="/terms"
                                        className="font-semibold underline underline-offset-2 hover:text-onlan-lime"
                                    >
                                        Terms and Conditions
                                    </Link>
                                </span>
                            </label>

                            <Elements.Button
                                type="submit"
                                variant="accent"
                                size="md"
                                className="mt-2 h-12 w-full justify-center font-semibold disabled:opacity-50 sm:w-auto sm:min-w-[240px] lg:h-14"
                            >
                                зв&apos;яжіться зі мною
                            </Elements.Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
