'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { usePathname } from 'next/navigation';
import Button from '@elements/Button/Button';
import Icon from '@elements/Icon/Icon';
import menuIcon from '@/assets/icons/menu.svg';
import closeIcon from '@/assets/icons/close.svg';
import OnlanLogo from '@/assets/icons/Onlan.svg';
import { SERVICES } from '@/content/services';

const SCROLL_TOP_THRESHOLD = 56;
const SCROLL_DIRECTION_DELTA = 8;

function LangSwitchPlaceholder() {
    return (
        <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Site language"
        >
            <button
                type="button"
                className="min-w-11 rounded-md px-2 py-2 text-sm font-semibold text-onlan-black"
                aria-current="true"
            >
                UA
            </button>
            <button
                type="button"
                className="min-w-11 rounded-md px-2 py-2 text-sm font-medium text-onlan-black "
            >
                EN
            </button>
        </div>
    );
}

function ServicesDropdown({ onNavigate }: { onNavigate?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isOnServicesPage = pathname?.startsWith('/services') ?? false;

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKey);
        };
    }, [isOpen]);

    const openWithDelay = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setIsOpen(true);
    };

    const closeWithDelay = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
        }
        closeTimer.current = setTimeout(() => setIsOpen(false), 120);
    };

    return (
        <div
            ref={wrapperRef}
            className="relative"
            onMouseEnter={openWithDelay}
            onMouseLeave={closeWithDelay}
            onFocus={openWithDelay}
            onBlur={closeWithDelay}
        >
            <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black ${
                    isOnServicesPage ? 'text-onlan-black' : ''
                }`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Сервіси
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                >
                    <path
                        d="M3 4.5l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    role="menu"
                    aria-label="Сервіси"
                    className="absolute left-1/2 top-full z-50 mt-2 w-[min(96vw,520px)] -translate-x-1/2 rounded-2xl border border-onlan-black/10 bg-onlan-white p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
                >
                    <ul className="flex flex-col">
                        {SERVICES.map((service) => {
                            const href = `/services/${service.slug}`;
                            const isActive = pathname === href;
                            return (
                                <li key={service.slug}>
                                    <Link
                                        to={href}
                                        role="menuitem"
                                        onClick={() => {
                                            setIsOpen(false);
                                            onNavigate?.();
                                        }}
                                        className={`flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-onlan-lavender/40 ${
                                            isActive ? 'bg-onlan-lavender/40' : ''
                                        }`}
                                    >
                                        <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-onlan-blue text-[11px] font-bold text-onlan-lime">
                                            {service.number}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-sm font-semibold text-onlan-black md:text-base">
                                                {service.title}
                                            </span>
                                            <span className="mt-0.5 block text-xs font-medium uppercase tracking-wide text-onlan-blue">
                                                {service.tagLabel}
                                            </span>
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

function MobileServicesGroup({ onClose }: { onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex w-full flex-col items-center">
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue"
            >
                Сервіси
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                >
                    <path
                        d="M3 4.5l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <ul className="mt-2 flex w-full max-w-sm flex-col gap-1 rounded-xl border border-onlan-black/10 bg-onlan-white p-2">
                    {SERVICES.map((service) => (
                        <li key={service.slug}>
                            <Link
                                to={`/services/${service.slug}`}
                                onClick={onClose}
                                className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-onlan-lavender/40"
                            >
                                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-onlan-blue text-[11px] font-bold text-onlan-lime">
                                    {service.number}
                                </span>
                                <span className="min-w-0 flex-1 text-left">
                                    <span className="block text-sm font-semibold text-onlan-black">
                                        {service.title}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-onlan-blue">
                                        {service.tagLabel}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [headerBarVisible, setHeaderBarVisible] = useState(true);
    const [spacerHeight, setSpacerHeight] = useState(96);
    const navigate = useNavigate();
    const headerRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);
    const prefersReducedMotion = useRef(false);

    useLayoutEffect(() => {
        try {
            prefersReducedMotion.current =
                window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
        } catch {
            prefersReducedMotion.current = false;
        }
        lastScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;
    }, []);

    useLayoutEffect(() => {
        const el = headerRef.current;
        if (!el) {
            return;
        }
        const syncHeight = () => {
            setSpacerHeight(el.offsetHeight);
        };
        syncHeight();
        const ro = new ResizeObserver(syncHeight);
        ro.observe(el);
        return () => ro.disconnect();
    }, [isMenuOpen]);

    useEffect(() => {
        if (prefersReducedMotion.current || isMenuOpen) {
            setHeaderBarVisible(true);
            return;
        }

        lastScrollY.current = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - lastScrollY.current;
            lastScrollY.current = y;

            if (y < SCROLL_TOP_THRESHOLD) {
                setHeaderBarVisible(true);
                return;
            }
            if (delta > SCROLL_DIRECTION_DELTA) {
                setHeaderBarVisible(false);
            } else if (delta < -SCROLL_DIRECTION_DELTA) {
                setHeaderBarVisible(true);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCompanyTabNavigation = (tab: string) => {
        if (tab === 'overview') {
            navigate('/company/overview');
        } else if (tab === 'founders') {
            navigate('/company/founders');
        } else if (tab === 'advisory-board') {
            navigate('/company/advisors');
        } else if (tab === 'press') {
            navigate('/company/press-pr-media-kit');
        }
    };

    void handleCompanyTabNavigation;

    const headerHidden = !headerBarVisible && !isMenuOpen;

    return (
        <>
            {/* Preserves layout height while the bar is `fixed` */}
            <div
                className="w-full shrink-0"
                style={{ height: spacerHeight }}
                aria-hidden
            />
            <header
                ref={headerRef}
                className={`fixed inset-x-0 top-0 z-50 bg-onlan-white shadow-sm transition-transform duration-300 ease-out motion-reduce:transform-none ${
                    headerHidden ? '-translate-y-full pointer-events-none' : 'translate-y-0'
                }`}
            >
            <nav className="container mx-auto px-4 py-6">
                <div className="relative flex items-center justify-between">
                    <Link
                        to="/"
                        className="relative z-10 shrink-0 text-xl font-bold"
                        onClick={closeMenu}
                    >
                        <Icon src={OnlanLogo} className="h-12 w-12" />
                    </Link>

                    {/* Desktop / tablet: centered in container (independent of logo / CTA width) */}
                    <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
                        <nav
                            className="pointer-events-auto flex items-center gap-6"
                            aria-label="Основна навігація"
                        >
                            <Link
                                to="/"
                                className="px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black"
                            >
                                Головна
                            </Link>
                            <Link
                                to="/about-us"
                                className="px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black"
                            >
                                Про Нас
                            </Link>
                            <ServicesDropdown />
                            <Link
                                to="/"
                                className="px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black"
                            >
                                Контакти
                            </Link>
                        </nav>
                    </div>

                    {/* Tablet: CTA + language (visual only) */}
                    <div className="relative z-10 hidden items-center gap-3 md:flex lg:hidden">
                        <Link to="/">
                            <Button variant="primary" type="button" size="md">
                                Зв&apos;язатись з нами
                            </Button>
                        </Link>
                        <LangSwitchPlaceholder />
                    </div>

                    {/* Desktop: CTA + language (visual only) */}
                    <div className="relative z-10 hidden items-center gap-3 lg:flex">
                        <Link to="/">
                            <Button variant="primary" type="button" size="md">
                                Зв&apos;язатись з нами
                            </Button>
                        </Link>
                        <LangSwitchPlaceholder />
                    </div>

                    {/* Mobile Burger Button */}
                    <button
                        onClick={toggleMenu}
                        className="relative z-10 md:hidden p-2 text-onlan-blue hover:text-blue-600 transition-colors border-onlan-lavender border rounded-lg"
                        aria-label="Toggle menu"
                    >
                        <Icon src={isMenuOpen ? closeIcon : menuIcon} className="size-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-5 relative">
                        <div className="flex flex-col gap-4 pt-4 mt-[10px] items-center">
                            <Link
                                to="/"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                Головна
                            </Link>

                            <Link
                                to="/about-us"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                Про Нас
                            </Link>

                            <MobileServicesGroup onClose={closeMenu} />

                            <Link
                                to="/"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                Контакти
                            </Link>

                            <div className="flex w-full flex-row items-stretch gap-3 pt-2">
                                <Link to="/" onClick={closeMenu} className="min-w-0 flex-1">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        size="md"
                                        className="w-full"
                                    >
                                        Зв&apos;язатись з нами
                                    </Button>
                                </Link>
                                <div className="flex items-center">
                                    <LangSwitchPlaceholder />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
        </>
    );
}
