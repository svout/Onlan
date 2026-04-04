import Icon from '@/components/elements/Icon/Icon';
import React, { useState } from 'react';
import ChevroneTop from '@/assets/icons/chevrone-top.svg';

export const FilterSection: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}> = ({ title, children, defaultOpen = false, className = '' }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <section
            className={`bg-onlan-white p-2 ring-1 ring-onlan-lavender sm:p-3 cursor-pointer ${className}`}
            onClick={() => setOpen((v) => !v)}
        >
            <div className="mb-2 flex w-full items-center justify-between py-2 px-1">
                <h4 className="text-[15px] font-semibold text-onlan-black">{title}</h4>
                <Icon src={ChevroneTop} className={`${open ? `rotate-180` : 'rotate-0'} transition-all duration-200`} />
            </div>

            {open && <div className="pt-1" onClick={(e) => e.stopPropagation()}>{children}</div>}
        </section>
    );
};

