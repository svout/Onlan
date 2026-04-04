import { type CSSProperties, type ReactNode } from 'react';

export type TooltipVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ITooltipProps {
    variant?: TooltipVariant;
    iconColor?: TooltipVariant;
    position?: TooltipPosition;
    after?: ReactNode;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}

export interface IIncludeTooltip {
    tooltip?: ReactNode;
    tooltipVariant?: ITooltipProps['variant'];
    tooltipPosition?: ITooltipProps['position'];
    tooltipAfter?: ITooltipProps['after'];
}
