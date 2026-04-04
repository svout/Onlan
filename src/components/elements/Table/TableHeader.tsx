import type { ReactNode } from 'react';

interface TableHeaderProps {
    className?: string;
    children: ReactNode;
}

export default function TableHeader({ className = '', children }: TableHeaderProps) {
    return (
        <div
            className={`${className} rounded-t-2xl border-b border-b-onlan-lavender bg-onlan-white p-3 text-sm empty:hidden xl:text-base`}
        >
            {children}
        </div>
    );
}
