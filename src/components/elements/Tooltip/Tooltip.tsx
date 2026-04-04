import Icon from '@elements/Icon/Icon.tsx';
import InfoIcon from '@icons/InfoIcon.svg';
import type { ITooltipProps, TooltipPosition, TooltipVariant } from '@elements/Tooltip/index.ts';

const getTooltipClasses = (variant: TooltipVariant = 'secondary', position: TooltipPosition = 'top'): string => {
    const variantClasses: Record<TooltipVariant, string> = {
        primary: 'tooltip-primary',
        secondary: 'tooltip-secondary',
        accent: 'tooltip-accent',
        neutral: 'tooltip-neutral',
        info: 'tooltip-info',
        success: 'tooltip-success',
        warning: 'tooltip-warning',
        error: 'tooltip-error',
    };

    const positionClasses: Record<TooltipPosition, string> = {
        top: 'tooltip-top',
        bottom: 'tooltip-bottom',
        left: 'tooltip-left',
        right: 'tooltip-right',
    };

    return `${variantClasses[variant]} ${positionClasses[position]}`;
};

export default function Tooltip({
    variant = 'secondary',
    iconColor = 'secondary',
    position = 'top',
    className = '',
    style,
    children,
    after,
}: ITooltipProps) {
    const iconColors: Record<TooltipVariant, string> = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        neutral: 'text-neutral',
        info: 'text-info',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error',
    };

    return (
        <span
            className={`tooltip ${getTooltipClasses(variant, position)} align-middle ${className ? className : ''}`}
            style={{ ...style }}
        >
            <span className="tooltip-content" style={{ zIndex: 9999 }}>{children}</span>

            {!after && <Icon src={InfoIcon} className={`size-4 ${iconColors[iconColor]}`} />}

            {after && (
                <span className="flex gap-1 text-sm text-secondary">
                    <Icon src={InfoIcon} className={`size-4 ${iconColors[iconColor]}`} />
                    {after}
                </span>
            )}
        </span>
    );
}
