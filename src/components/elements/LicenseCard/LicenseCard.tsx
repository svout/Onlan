import { Elements } from '@/components';
import CheckBoxIcon from '@/assets/icons/CheckBox.svg';
import Image from 'next/image';

export interface LicenseCardProps {
    title: string;
    price: string;
    features: string[];
    buttonText?: string;
    buttonVariant?: 'primary' | 'secondary' | 'outline';
    buttonSize?: 'sm' | 'md' | 'lg';
    onButtonClick?: () => void;
    className?: string;
    outerClassName?: string;
}

export const LicenseCard = ({
    title,
    price,
    features,
    buttonText = 'Book a Demo',
    buttonVariant = 'primary',
    buttonSize = 'md',
    onButtonClick,
    className = '',
    outerClassName = '',
}: LicenseCardProps) => {
    return (
        <div className={`flex w-full ${outerClassName}`.trim()}>
            <div className={`h-full w-full rounded-xl bg-[#FFFFFF29] p-2 ${className}`.trim()}>
                <div className="flex h-full w-full flex-col items-start justify-between gap-3 rounded-xl bg-onlan-white p-6">
                    <div className="flex flex-col items-start justify-start gap-2">
                        <Elements.Title title={title} type="h6" className="text-start text-onlan-black" />
                        <span className="text-5xl font-semibold text-onlan-blue">{price}</span>
                    </div>

                    <ul className="flex w-full flex-1 flex-col items-start justify-start gap-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-start gap-2">
                                <Image src={CheckBoxIcon} alt="" width={27} height={27} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <Elements.Button
                        variant='primary'
                        outline={buttonVariant === 'outline'}
                        size={buttonSize}
                        className="w-full"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Elements.Button>
                </div>
            </div>
        </div>
    );
};

