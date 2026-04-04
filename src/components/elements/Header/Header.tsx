import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '@elements/Button/Button';
import Icon from '@elements/Icon/Icon';
import menuIcon from '@/assets/icons/menu.svg';
import closeIcon from '@/assets/icons/close.svg';
import OnlanLogo from '@/assets/icons/Onlan.svg';

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

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

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

    return (
        <header className="sticky top-0 z-50 bg-onlan-white shadow-sm">
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
                            className="pointer-events-auto flex gap-6"
                            aria-label="Основна навігація"
                        >
                            <Link
                                to="/"
                                className="px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black"
                            >
                                Головна
                            </Link>
                            <Link
                                to="/"
                                className="px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black"
                            >
                                Про Нас
                            </Link>
                            <Link
                                to="/"
                                className="px-3 py-2 uppercase text-onlan-blue transition-all rounded-lg hover:text-onlan-black"
                            >
                                Сервіси
                            </Link>
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
                                Зв'язатись з нами
                            </Button>
                        </Link>
                        <LangSwitchPlaceholder />
                    </div>

                    {/* Desktop: CTA + language (visual only) */}
                    <div className="relative z-10 hidden items-center gap-3 lg:flex">
                        <Link to="/">
                            <Button variant="primary" type="button" size="md">
                                Зв'язатись з нами
                            </Button>
                        </Link>
                        <LangSwitchPlaceholder />
                    </div>

                    {/* Mobile Burger Button */}
                    <button
                        onClick={toggleMenu}
                        className="relative z-10 md:hidden p-2 text-onlan-blue hover:text-blue-600 transition-colors border-onlan-lavender border-1 rounded-lg"
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
                                to="/"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                Про Нас
                            </Link>

                            <Link
                                to="/"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                Сервіси
                            </Link>

                            <Link
                                to="/"
                                className="px-3 py-2 rounded-lg uppercase transition-all hover:bg-onlan-white hover:text-onlan-blue text-center"
                                onClick={closeMenu}
                            >
                                Контакти
                            </Link>
                            
                            <div className="flex w-full flex-row items-stretch gap-3 pt-2">
                                <Link to="/" onClick={closeMenu} className="min-w-0 flex-1">
                                    <Button variant="primary" type="button" size="md" className="w-full">
                                        Зв'язатись з нами
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
    );
}
