import type { ReactNode } from 'react';
import { Elements } from '@/components';

interface InfoCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    outerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    iconWrapperClassName?: string;
}

export const InfoCard = ({
    title,
    description,
    icon,
    className = '',
    outerClassName = '',
    titleClassName = 'text-onlan-black',
    descriptionClassName = 'text-onlan-black',
}: InfoCardProps) => {
    return (
        <div
            className={`h-full w-full rounded-xl bg-[#F9FAFB] p-2 shadow-[0px_0px_4px_0px_#0000001F_inset] ${outerClassName}`.trim()}
        >
            <div className={`h-full w-full rounded-xl bg-onlan-white p-4 grid grid-rows-[auto_1fr] gap-2 ${className}`.trim()}>
                <div className="flex items-center justify-start gap-4 min-h-[64px] flex-shrink-0">
                    {icon && <div className='min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg bg-onlan-lavender flex-shrink-0'>{icon}</div>}
                    <Elements.Title title={title} type="h6" className={titleClassName} />
                </div>
                <Elements.Description
                    description={description}
                    type="small"
                    className={descriptionClassName}
                />
            </div>
        </div>
    );
};


