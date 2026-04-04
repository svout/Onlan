import { Link } from 'react-router';
import Description from '@/components/elements/Description';
import { LogoFooter } from '@/assets/icons/LogoFooter';

const linkClass =
    'text-onlan-white transition-colors hover:text-onlan-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-onlan-lime';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto w-full overflow-hidden bg-onlan-blue">
            <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
                    <div className="max-w-md shrink-0">
                        <Link
                            to="/"
                            className="group block w-full max-w-[min(100%,520px)]"
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                })
                            }
                        >
                            <span className="sr-only">ONLAN — на головну</span>
                            <div className="[&_path]:fill-onlan-white [&_path]:transition-colors group-hover:[&_path]:fill-onlan-lime">
                                <LogoFooter className="h-auto w-full" />
                            </div>
                        </Link>
                        <Description
                            description="Міжнародна логістика для бізнесу: доставка з Європи, Китаю та США в Україну. Митниця, страхування та підтримка 24/7."
                            type="small"
                            className="mt-6 w-full max-w-full text-onlan-white/90"
                        />
                    </div>

                    <div className="grid w-full grid-cols-2 gap-10 sm:max-w-xl lg:max-w-2xl lg:flex-1 lg:justify-end lg:gap-12">
                        <nav className="min-w-0">
                            <h3 className="text-lg font-semibold text-onlan-white md:text-xl">Навігація</h3>
                            <div className="mt-4 flex flex-col gap-3 text-sm font-normal md:text-base">
                                <Link to="/" className={linkClass}>
                                    Головна
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Про нас
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Сервіси
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Контакти
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Зв&apos;язатись з нами
                                </Link>
                            </div>
                        </nav>

                        <nav className="min-w-0">
                            <h3 className="text-lg font-semibold text-onlan-white md:text-xl">Юридична інформація</h3>
                            <div className="mt-4 flex flex-col gap-3 text-sm font-normal md:text-base">
                                <Link to="/" className={linkClass}>
                                    Політика конфіденційності
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Умови використання
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="mt-10 h-px w-full bg-white/20 md:mt-12" />

                <div className="mt-8 flex flex-col gap-4 text-sm leading-snug text-white/70 md:mt-10 md:flex-row md:items-center md:justify-between md:text-base">
                    <p className="text-center md:text-left">
                        © {currentYear} ONLAN. Усі права захищені.
                    </p>
                    <div className="flex items-center justify-between gap-6 md:justify-end">
                        <Link to="/" className={`${linkClass} text-center text-sm md:text-base`}>
                            Конфіденційність
                        </Link>
                        <Link to="/" className={`${linkClass} text-center text-sm md:text-base`}>
                            Умови
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
