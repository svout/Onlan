import type {ReactNode} from "react";

export interface ITab {
    label: string | ReactNode;
    value: string;
    content?: ReactNode;
}

export type TabPosition = 'top' | 'bottom';
export type TabSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TabVariant = 'box' | 'border' | 'lift';
