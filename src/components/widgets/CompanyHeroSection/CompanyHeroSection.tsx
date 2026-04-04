import { Elements } from '@/components';
import { Link } from 'react-router';

interface CompanyHeroSectionProps {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

export const CompanyHeroSection = ({
    title = 'Company',
    description = 'Predictable Benefits is a modern ICHRA platform built for brokers, agencies, TPAs, and carriers who want ease, control, and flexibility in an ICHRA offering. We transform the complexity of ICHRA plan design and administration into a streamlined, easy-to-use, and fully transparent experience.',
    secondaryButtonText = 'Book a Demo',
    secondaryButtonLink = '/demo',
}: CompanyHeroSectionProps) => {
    return (
        <section className="relative overflow-hidden bg-onlan-white px-5 pt-20 pb-20 md:px-10 lg:px-[79px]">
            <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-[30px]">
                <div className="w-full">
                    <div className="mt-0 flex w-full flex-col items-center lg:mt-8">
                        <Elements.Title
                            title={title}
                            type="h1"
                            className="text-center text-3xl leading-tight font-semibold text-onlan-black md:text-4xl md:leading-[54px] lg:text-5xl lg:leading-[58px]"
                        />
                        <Elements.Description
                            description={description}
                            type="medium"
                            className="mt-6 md:mt-8 max-w-[600px] text-center text-base leading-[22px] font-normal text-onlan-black md:text-lg"
                        />
                        <div className="mt-6 hidden items-center justify-center gap-4 text-lg leading-[1.2] font-medium md:flex md:text-xl">
                            <Link to={secondaryButtonLink} >
                                <Elements.Button variant="primary" size="xl">
                                    <span className='text-[20px]'>{secondaryButtonText}</span>
                                </Elements.Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
