import { Elements } from '@/components';
import CheckMarkIcon from '@/assets/icons/CheckMark.svg';
import { Link } from 'react-router-dom';
import Image from 'next/image';

export interface IchraCardProps {
    title: string;
    description: string;
    points: string[];
    buttonLabel: string;
}

export const IchraCard = ({ title, description, points, buttonLabel }: IchraCardProps) => {
    return (
        <div className="flex w-full max-w-[360px] md:w-full md:max-w-none h-full">
            <div className="h-full w-full rounded-xl bg-[#FFFFFF29] p-2">
                <div className="grid h-full w-full grid-rows-[auto_auto_1fr_auto] gap-3 rounded-xl bg-onlan-white p-4 md:relative">
                    <div className="flex flex-col items-start justify-start gap-2 min-h-[104px]">
                        <Elements.Title title={title} type="h5" className="text-left text-onlan-black" />
                        <Elements.Description
                            description={description}
                            type="small"
                            className="text-left text-onlan-black"
                        />
                    </div>

                    <div className="w-full border-t border-dashed border-onlan-lavender h-[1px]"></div>

                    <ul className="flex w-full flex-col items-start justify-start gap-2">
                        {points.map((point) => (
                            <li key={point} className="flex items-center justify-start gap-2">
                                <div className="h-5 w-5 flex-shrink-0">
                                    <Image src={CheckMarkIcon} alt="" width={20} height={20} />
                                </div>
                                <p className="text-base font-normal text-onlan-blue break-words">{point}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="flex w-full items-center justify-center gap-4 sm:justify-end min-h-[50px]">
                        <Link to="/demo" className="w-full sm:w-auto md:w-auto lg:w-full">
                            <Elements.Button
                                variant="primary"
                                size="lg"
                                outline
                                className="w-full sm:w-auto md:w-auto lg:w-full"
                            >
                                {buttonLabel}
                            </Elements.Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
