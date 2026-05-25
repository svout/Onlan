import { Link } from 'react-router';
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaPhone } from 'react-icons/fa6';
import footerBackground from '@/assets/images/FooterBackground.png';
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

const sectionTitleClass =
    'text-lg font-semibold text-onlan-white md:text-xl';

const sectionLinksClass =
    'mt-4 flex flex-col gap-3 text-sm font-normal md:text-base';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-auto w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${footerBackground})` }}
                />
                <div className="absolute inset-0 bg-onlan-blue/82" />
                <div className="absolute inset-0 bg-gradient-to-t from-onlan-black/35 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto w-full px-4 py-10 md:py-14 lg:py-20">
                {/* Mobile: stacked · Tablet: brand + 2-col links · Desktop: row + 3-col links */}
                <div className="flex min-w-0 flex-col gap-10 md:gap-12 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
                    <div className="max-w-md shrink-0 md:max-w-none lg:max-w-md">
                        <Link
                            to="/"
                            className="group block w-full max-w-[min(100%,520px)] md:max-w-[420px] lg:max-w-[min(100%,520px)]"
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
                            className="mt-5 w-full max-w-full text-onlan-white/90 md:mt-6"
                        />

                        <div className="mt-4 flex items-center gap-4 md:mt-5">
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

                    <div className="grid min-w-0 flex-1 grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-6 lg:pl-10 xl:gap-8">
                        <nav>
                            <h3 className={sectionTitleClass}>Навігація</h3>
                            <div className={sectionLinksClass}>
                                <Link to="/" className={linkClass}>
                                    Головна
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Про нас
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Сервіси
                                </Link>
                                <Link to="/contacts" className={linkClass}>
                                    Контакти
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Зв&apos;язатись з нами
                                </Link>
                            </div>
                        </nav>

                        <nav>
                            <h3 className={sectionTitleClass}>Юридична інформація</h3>
                            <div className={sectionLinksClass}>
                                <Link to="/" className={linkClass}>
                                    Політика конфіденційності
                                </Link>
                                <Link to="/" className={linkClass}>
                                    Умови використання
                                </Link>
                            </div>
                        </nav>

                        <address className="not-italic min-w-0 max-w-full md:col-span-2 lg:col-span-1">
                            <h4 className={sectionTitleClass}>Контакти</h4>
                            <div
                                className={`${sectionLinksClass} not-italic text-onlan-white/90`}
                            >
                                <p className="min-w-0 wrap-break-word">{CONTACT.location}</p>
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className={`${linkClass} flex min-w-0 max-w-full items-center gap-2 overflow-x-auto`}
                                    title={CONTACT.email}
                                >
                                    <FaEnvelope
                                        className="size-4 shrink-0 text-onlan-lime"
                                        aria-hidden
                                    />
                                    <span className="whitespace-nowrap">{CONTACT.email}</span>
                                </a>
                                <a
                                    href={`tel:${CONTACT.phoneTel}`}
                                    className={`${linkClass} flex min-w-0 max-w-full items-start gap-2`}
                                >
                                    <FaPhone
                                        className="mt-0.5 size-4 shrink-0 text-onlan-lime"
                                        aria-hidden
                                    />
                                    <span className="min-w-0 wrap-break-word">
                                        {CONTACT.phoneDisplay}
                                    </span>
                                </a>
                            </div>
                        </address>
                    </div>
                </div>

                <div className="mt-8 h-px w-full bg-white/20 md:mt-10 lg:mt-12" />

                <div className="mt-6 flex flex-col gap-4 text-sm leading-snug text-white/70 md:mt-8 md:flex-row md:items-center md:justify-between md:text-base lg:mt-10">
                    <p className="text-center md:text-left">
                        © {currentYear} ONLAN. Усі права захищені.
                    </p>
                    <div className="flex items-center justify-center gap-6 md:justify-end">
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
