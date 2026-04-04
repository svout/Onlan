import React from 'react';

type Props = {
    label: React.ReactNode;
    selected: boolean;
    onToggle: (e?: React.MouseEvent) => void;
    variant?: 'blue' | 'emerald' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'catastrophic' | 'marketBlue' | 'marketGreen';
    disabled?: boolean;
    title?: string;
};

export const SquareCheckBoxToggle: React.FC<Props> = ({ label, selected, onToggle, variant = 'blue', disabled = false, title }) => {
    const cls = `flex items-center gap-[12px] text-sm transition-colors select-none text-base shrink-0 bg-transparent border-transparent ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`;

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.blur();
        }
        onToggle(e);
    };

    return (
        <button type="button" onClick={handleClick} disabled={disabled} className={cls} title={title}>
            <span
                className={`flex size-5 shrink-0 items-center justify-center rounded border ${disabled
                        ? 'bg-onlan-lavender border-onlan-lavender'
                        : selected
                          ? variant === 'bronze'
                            ? 'bg-[#E59A42] border-[#E59A42]'
                            : variant === 'silver'
                              ? 'bg-[#A8AFB7] border-[#A8AFB7]'
                              : variant === 'gold'
                                ? 'bg-[#F6DB53] border-[#F6DB53]'
                                : variant === 'platinum'
                                  ? 'bg-[#8FADCF] border-[#8FADCF]'
                                  : variant === 'catastrophic'
                                                ? 'bg-[#CC6076] border-[#CC6076]'
                                    : variant === 'marketBlue'
                                      ? 'bg-blue-500 border-blue-400'
                                      : variant === 'marketGreen'
                                        ? 'bg-emerald-500 border-emerald-400'
                                        : variant === 'emerald'
                                          ? 'bg-emerald-500 border-emerald-400'
                                          : 'bg-blue-500 border-blue-400'
                          : 'border-onlan-lavender'
                }`}
            >
                {selected && !disabled && (
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
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>

            <span className={`leading-none flex-1 text-left text-base ${disabled ? 'text-onlan-blue' : ''}`}>{label}</span>
        </button>
    );
};
