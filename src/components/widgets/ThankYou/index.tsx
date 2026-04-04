import { Elements } from '@/components';
import featuresBackground from '@images/hero-bg.webp';
import PhoneIcon from '@icons/phone.svg';
import DemoCalendarIcon from '@icons/calendar.svg';
import CheckIcon from '@icons/check.svg';

export const ThankYou = () => {
    return (
        <section
            className="overflow-hidden h-[100vh] bg-cover bg-center bg-no-repeat pt-10 pb-10 md:pt-20 md:pb-20"
            style={{ backgroundImage: `url(${featuresBackground})` }}
        >
            <div className="container mx-auto flex w-full flex-col gap-4 px-5 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12 lg:px-4">
                <div className="flex w-full flex-col gap-6 lg:max-w-[600px]">
                    <Elements.Title
                        title="Thanks for contacting us!"
                        type="h2"
                        className="!text-6xl font-semibold text-onlan-white text-center md:text-center lg:text-left"
                    />
                    <div className="flex flex-col gap-3 md:flex-row md:gap-4 lg:flex-col lg:gap-3">
                        <div className="rounded-xl bg-onlan-white p-4 backdrop-blur sm:p-3 md:flex-1">
                            <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-start md:gap-3 lg:flex-row lg:items-center lg:gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-onlan-white text-[#0077DF]">
                                        <img src={PhoneIcon} alt="Phone" className="h-5 w-5" />
                                    </div>
                                    <span className="text-base font-normal text-onlan-black">
                                        Need to talk to us right now?
                                    </span>
                                </div>
                                <a href="tel:+1-888-777-8190" className="btn btn-primary btn-outline btn-sm self-start">
                                    +1-888-777-8190
                                </a>
                            </div>
                        </div>
                        <div className="rounded-xl bg-onlan-white p-4 backdrop-blur sm:p-3 md:flex-1">
                            <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-start md:gap-3 lg:flex-row lg:items-center lg:gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-onlan-white text-onlan-blue">
                                        <img src={DemoCalendarIcon} alt="Calendar" className="h-5 w-5" />
                                    </div>
                                    <span className="text-base font-normal text-onlan-black">
                                        Would you like to schedule a demo?
                                    </span>
                                </div>
                                <a href="/demo" className="btn btn-primary btn-sm self-start">
                                    Book a Demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="flex w-full min-h-0 shrink-0 flex-col rounded-xl p-[2px] lg:max-w-[680px]"
                    style={{
                        background: 'linear-gradient(108deg, rgba(255, 255, 255, 0.51) 1.5%, rgba(255, 255, 255, 0.09) 100%)',
                    }}
                >
                    <div className="flex min-h-full flex-col items-start justify-center rounded-[10px] bg-onlan-blue p-6 backdrop-blur-[10px]">
                        <div className="flex w-full items-center justify-between gap-4">
                            <span className="text-2xl font-semibold text-onlan-white sm:text-4xl">
                                Your Message Has Been Sent
                            </span>
                            <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#0077DF]"
                                style={{ background: '#FFFFFF33' }}
                            >
                                <img src={CheckIcon} alt="Success" className="h-5 w-5" />
                            </div>
                        </div>
                        <span className="mt-2 block text-base font-normal text-onlan-white">
                            A member of our team will be in touch soon.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};