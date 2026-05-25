'use client';

import { Elements } from '@/components/elements';

const GLOW_SIZE = 642;

const glowStyle = (background: string, top: string, left: string) => ({
    width: `${GLOW_SIZE}px`,
    height: `${GLOW_SIZE}px`,
    top,
    left,
    background,
    filter: 'blur(264px)',
});

export function ContactsGlowCardSection() {
    return (
        <section className="w-full bg-onlan-white pb-10 md:pb-14 lg:pb-20">
            <div className="container mx-auto px-4">
                <div className="relative isolate h-[360px] overflow-hidden rounded-2xl border border-onlan-black/10 bg-onlan-white md:h-[460px] lg:h-[560px]">
                    <span
                        aria-hidden
                        className="pointer-events-none absolute rounded-full"
                        style={glowStyle('#CFD2F4', '-226px', '-226px')}
                    />
                    <span
                        aria-hidden
                        className="pointer-events-none absolute rounded-full"
                        style={glowStyle('#CFD2F4', 'calc(100% - 416px)', 'calc(100% - 416px)')}
                    />
                    <span
                        aria-hidden
                        className="pointer-events-none absolute rounded-full"
                        style={glowStyle('#D5E82D', '-226px', 'calc(100% - 416px)')}
                    />
                    <span
                        aria-hidden
                        className="pointer-events-none absolute rounded-full"
                        style={glowStyle('#D5E82D', 'calc(100% - 416px)', '-226px')}
                    />

                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                        <Elements.Title
                            title="Готові обговорити ваш логістичний проєкт?"
                            type="h2"
                            className="max-w-3xl text-onlan-black"
                        />

                        <Elements.Button
                            type="button"
                            variant="ghost"
                            className="mt-6 h-12 rounded-full border border-onlan-black/15 bg-transparent! px-6 font-semibold text-onlan-black shadow-none hover:bg-onlan-white/40! md:mt-8 md:h-14 md:px-8"
                        >
                            Зв’язатися зараз
                        </Elements.Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
