import type { MouseEvent, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
    | 'default'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'
    | 'white'
    | 'blue'
    | 'lime';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonShape = 'default' | 'circle' | 'square';

export interface IButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
    outline?: boolean;
    soft?: boolean;
    dash?: boolean;
    loading?: boolean;
    disabled?: boolean;
    active?: boolean;
    wide?: boolean;
    block?: boolean;
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
