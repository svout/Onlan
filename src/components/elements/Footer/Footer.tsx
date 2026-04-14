import { Link } from 'react-router';
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaPhone } from 'react-icons/fa6';
import Description from '@/components/elements/Description';
import { LogoFooter } from '@/assets/icons/LogoFooter';

/** Оновіть на реальні профілі компанії */
const SOCIAL_HREF = {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
} as const;

const CONTACT = {
    location: 'Вінниця, Україна',
    email: 'maryna_onopenko@onlan.com.ua',
    phoneDisplay: '+380 98 659 16 71',
    phoneTel: '+380986591671',
} as const;

const socialIconClass =
    'inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-onlan-lime text-onlan-blue transition-colors hover:bg-onlan-lime-dark hover:text-onlan-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-onlan-white';

const linkClass =
    'text-onlan-white transition-colors hover:text-onlan-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-onlan-lime';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto w-full overflow-hidden bg-onlan-blue">
            <div className="container mx-auto w-full px-4 py-12 md:py-16 lg:py-20">
                <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:gap-6 xl:gap-8">
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


                        <div className="mt-4 flex items-center gap-4">
                            <a
                                href={SOCIAL_HREF.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialIconClass}
                                aria-label="ONLAN у Instagram"
                            >
                                <FaInstagram className="size-4.5" aria-hidden />
                            </a>
                            <a
                                href={SOCIAL_HREF.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={socialIconClass}
                                aria-label="ONLAN у LinkedIn"
                            >
                                <FaLinkedinIn className="size-4.5" aria-hidden />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 pl-10">
                        <nav className="">
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

                        <nav className="">
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

                        <address className="not-italic min-w-0 max-w-full">
                            <h4 className="text-lg font-semibold text-onlan-white md:text-xl">Контакти</h4>
                            <div className="mt-4 flex min-w-0 max-w-full flex-col gap-3 text-sm font-normal not-italic text-onlan-white/90 md:text-base">
                                <p className="min-w-0 wrap-break-word">{CONTACT.location}</p>
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className={`${linkClass} flex min-w-0 max-w-full items-center gap-2 overflow-x-auto`}
                                    title={CONTACT.email}
                                >
                                    <FaEnvelope className="size-4 shrink-0 text-onlan-lime" aria-hidden />
                                    <span className="whitespace-nowrap">{CONTACT.email}</span>
                                </a>
                                <a
                                    href={`tel:${CONTACT.phoneTel}`}
                                    className={`${linkClass} flex min-w-0 max-w-full items-start gap-2`}
                                >
                                    <FaPhone className="mt-0.5 size-4 shrink-0 text-onlan-lime" aria-hidden />
                                    <span className="min-w-0 wrap-break-word">{CONTACT.phoneDisplay}</span>
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                <div className="mt-8 h-px w-full bg-white/20 md:mt-8" />

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
