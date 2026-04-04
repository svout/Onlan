import React, { useState, useRef, useEffect } from 'react';
import SortByIcon from '@/assets/icons/SortBy.svg';
import Image from 'next/image';

export type SortOption = 'lowest-premium' | 'lowest-deductible' | 'lowest-max-out-of-pocket';

export interface SortByDropdownProps {
    value?: SortOption;
    onChange?: (value: SortOption) => void;
}

interface CheckIconProps {
    width?: number;
    height?: number;
}

const CheckIcon: React.FC<CheckIconProps> = ({ width = 16, height = 16 }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12L10 17L20 7" stroke="#0077DF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6004 7.4585L11.1671 12.8918C10.5254 13.5335 9.47539 13.5335 8.83372 12.8918L3.40039 7.4585" stroke="#A8AFB7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.39961 12.5415L8.83294 7.10817C9.47461 6.4665 10.5246 6.4665 11.1663 7.10817L16.5996 12.5415" stroke="#0077DF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'lowest-premium', label: 'Lowest Premium' },
    { value: 'lowest-deductible', label: 'Lowest Deductible' },
    { value: 'lowest-max-out-of-pocket', label: 'Lowest Max-out-of-pocket' },
];

export const SortByDropdown: React.FC<SortByDropdownProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (optionValue: SortOption) => {
        onChange?.(optionValue);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 h-[56px] rounded-xl border border-onlan-lavender bg-onlan-white px-5 py-2.5 hover:border-onlan-lavender"
            >
                <div className="flex items-center gap-2">
                    <Image src={SortByIcon} alt="Sort By" width={15} height={16} />
                    <span className="text-base lg:text-xl font-medium text-onlan-black">Sort By</span>
                </div>
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>

            {isOpen && (
                <ul className="absolute top-full px-3 py-3 left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto rounded-xl border border-onlan-lavender bg-onlan-white shadow-lg">
                    {sortOptions.map((option) => {
                        const isSelected = value === option.value;
                        return (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => handleOptionClick(option.value)}
                                    className={`flex w-full items-center justify-between px-3 py-2.5 text-base transition-colors ${isSelected ? 'text-onlan-blue' : 'text-onlan-black'
                                        } hover:bg-onlan-white`}
                                >
                                    <span>{option.label}</span>
                                    {isSelected && <CheckIcon width={24} height={24} />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
