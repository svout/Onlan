import type { SVGProps } from 'react';

export const CardCircle = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="173"
            height="124"
            viewBox="0 0 173 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
            {...props}
        >
            <circle cx="124" cy="0" r="98.5" stroke="#2C358C" strokeWidth="51" />
        </svg>
    );
};
