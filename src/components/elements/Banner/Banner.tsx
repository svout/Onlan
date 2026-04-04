import type { ReactNode } from 'react';

type BannerVariant = 'gradient' | 'brand';

interface BannerProps {
    variant?: BannerVariant;
    icon: ReactNode;
    children: ReactNode;
    className?: string;
}

export function Banner({
    variant = 'gradient',
    icon,
    children,
    className = '',
}: BannerProps) {
    const baseClasses =
        'inline-flex items-center gap-2 rounded-[10px] px-3 py-2 text-sm leading-snug';

    const variantClasses: Record<BannerVariant, string> = {
        gradient: 'bg-[#0077DF26]',
        brand: 'border border-[#C0E0F7] bg-[#E0EEFB]',
    };

    const textColorClass =
        variant === 'gradient' ? 'text-onlan-white' : 'text-base-content';

    const hasGradientBorder = variant === 'gradient';

    if (hasGradientBorder) {
        return (
            <div
                className={`relative inline-flex items-center gap-2 rounded-[10px] px-3 py-2 text-sm leading-snug ${variantClasses[variant]} ${className}`.trim()}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        padding: 1,
                        borderRadius: 10,
                        background: 'linear-gradient(121.98deg, #85BFF8 23.17%, #0567E4 96.2%)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        pointerEvents: 'none',
                    }}
                />
                <span
                    className={`relative flex items-center justify-center ${textColorClass}`}
                >
                    {icon}
                </span>
                <span
                    className={`relative text-sm ${textColorClass}`}
                >
                    {children}
                </span>
            </div>
        );
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
        >
            <span
                className={`flex items-center justify-center ${textColorClass}`}
            >
                {icon}
            </span>
            <span
                className={`text-sm ${textColorClass}`}
            >
                {children}
            </span>
        </div>
    );
}


