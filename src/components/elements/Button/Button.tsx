import { type MouseEvent } from 'react';
import type {
    ButtonShape,
    ButtonSize,
    ButtonVariant,
    IButtonProps
} from "@elements/Button/index.ts";

export default function Button({
    children,
    type = 'button',
    variant = 'default',
    size = 'md',
    shape = 'default',
    outline = false,
    soft = false,
    dash = false,
    loading = false,
    disabled = false,
    active = false,
    wide = false,
    block = false,
    className = '',
    onClick,
    ...props
}: IButtonProps) {

    let buttonClasses = 'btn';

    const variantClasses: Record<ButtonVariant, string> = {
        default: '',
        neutral: 'btn-neutral',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
        ghost: 'btn-ghost',
        link: 'btn-link',
        white: 'btn-white',
        blue: 'btn-blue',
    };

    const sizeClasses: Record<ButtonSize, string> = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
        xl: 'btn-xl'
    };

    const shapeClasses: Record<ButtonShape, string> = {
        default: '',
        circle: 'btn-circle',
        square: 'btn-square'
    };

    buttonClasses += ` ${variantClasses[variant]}`;
    buttonClasses += ` ${sizeClasses[size]}`;
    buttonClasses += ` ${shapeClasses[shape]}`;

    if (outline) buttonClasses += ' btn-outline';
    if (soft) buttonClasses += ' btn-soft';
    if (dash) buttonClasses += ' btn-dash';
    if (loading) buttonClasses += ' loading';
    if (active) buttonClasses += ' btn-active';
    if (wide) buttonClasses += ' btn-wide';
    if (block) buttonClasses += ' btn-block';
    if (className) buttonClasses += ` ${className}`;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick && !disabled && !loading) {
            onClick(event);
        }
    };

    return (
        <button
            type={type}
            className={buttonClasses.trim()}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {children}
        </button>
    );
};
