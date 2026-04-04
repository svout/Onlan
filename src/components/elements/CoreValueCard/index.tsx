import type { ReactNode } from 'react';
import { Elements } from '@/components';

interface CoreValueCardProps {
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    outerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    iconWrapperClassName?: string;
}

export const CoreValueCard = ({
    title,
    description,
    icon,
    className = '',
    titleClassName = 'text-onlan-black',
    descriptionClassName = 'text-onlan-black',
    iconWrapperClassName = 'flex h-12 w-12 items-center justify-center rounded-lg bg-onlan-lavender',
}: CoreValueCardProps) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-1 rounded-xl bg-[#F9FAFB] p-4 border border-onlan-lavender ${className}`.trim()}>
            {icon && <div className={iconWrapperClassName}>{icon}</div>}
            <Elements.Title title={title} type="h6" className={titleClassName} />
            <div className="flex flex-col items-center justify-center text-center">
                <Elements.Description description={description} type="small" className={descriptionClassName} />
            </div>
        </div>
    );
};
