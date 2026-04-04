import clsx from 'clsx';
import type { SVGProps } from 'react';

export const Circle = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg
        width={161}
        height={124}
        viewBox="0 0 161 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx('shrink-0 text-onlan-blue', className)}
        aria-hidden
        {...props}
    >
        <circle cx="37" cy="124" r="98.5" stroke="currentColor" strokeWidth={51} />
    </svg>
);