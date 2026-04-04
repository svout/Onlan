import React from 'react';

type Props = {
    label: React.ReactNode;
    selected: boolean;
    onToggle: () => void;
    variant?: 'blue' | 'emerald' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'catastrophic' | 'marketBlue' | 'marketGreen';
};

export const CheckBoxToggle: React.FC<Props> = ({ label, selected, onToggle, variant = 'blue' }) => {
    // базовый серый
    let cls = 'flex items-center gap-1 text-sm transition-colors select-none rounded-lg text-base pl-2 pr-1 py-1 shrink-0 ';

    // Standard border for all variants
    cls += ' ring-1 ring-onlan-lavender';

    switch (variant) {
        case 'bronze':
            cls += selected
                ? ' bg-onlan-lavender text-[#E59A42]'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'silver':
            cls += selected
                ? ' bg-onlan-lavender text-[#A8AFB7]'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'gold':
            cls += selected
                ? ' bg-onlan-lavender text-[#F6DB53]'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'platinum':
            cls += selected
                ? ' bg-onlan-lavender text-[#8FADCF]'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'catastrophic':
            cls += selected
                ? ' bg-onlan-lavender text-[#CC6076]'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'marketBlue':
            cls += selected
                ? ' bg-onlan-lavender text-blue-700'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'marketGreen':
            cls += selected
                ? ' bg-onlan-lavender text-emerald-700'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        case 'emerald':
            cls += selected
                ? ' bg-onlan-lavender text-emerald-600'
                : ' bg-onlan-lavender text-onlan-blue';
            break;
        default: // blue
            cls += selected
                ? ' bg-onlan-lavender text-blue-600'
                : ' bg-onlan-lavender text-onlan-blue';
    }

    return (
        <button type="button" onClick={onToggle} className={`${cls} cursor-pointer`}>
            <span
                className={`flex size-4 shrink-0 items-center justify-center rounded-full border border-onlan-lavender ${selected ? 'bg-onlan-lavender' : 'bg-transparent'
                    }`}
            >
                {selected && (
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        className="flex"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.22266 5.33355L4.44488 7.55577L8.88932 3.11133"
                            stroke="#0077DF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>

            <span className="leading-none flex-1 text-left">{label}</span>
        </button>
    );
};

