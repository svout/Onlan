import {type ReactNode, useEffect, useState} from "react";
import type {TagSize, TagVariant} from "@elements/Tag/index.ts";

interface TagProps {
    variant?: TagVariant
    className?: string
    children: ReactNode
    size?: TagSize
    active?: boolean
    outline?: boolean
    soft?: boolean
    dash?: boolean
    ghost?: boolean
    disabled?: boolean
    onClick?: (active: boolean) => void
}

export function Tag({
    variant = 'secondary',
    className,
    children,
    size = 'sm',
    active = false,
    outline = true,
    soft = false,
    dash = false,
    ghost = false,
    disabled = false,
    onClick,
}: TagProps) {
    const [isActive, setIsActive] = useState<boolean>(active);

    const handleTagClick = () => {
        if (disabled || !onClick) return;
        onClick(isActive)
    }

    useEffect(() => {
        setIsActive(active);
    }, [active]);

    let tagClasses = '';

    const variantClasses: Record<TagVariant, string> = {
        neutral: 'badge-neutral',
        primary: 'badge-primary',
        secondary: 'badge-secondary hover:border-onlan-lavender hover:text-primary',
        accent: 'badge-accent',
        info: 'badge-info',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
    };

    const sizeClasses: Record<TagSize, string> = {
        xs: "badge-xs",
        sm: "badge-sm text-sm",
        md: "badge-md",
        lg: "badge-lg",
        xl: "badge-xl",
    }

    const currentVariant = isActive ? variantClasses['primary'] : variantClasses[variant];

    tagClasses += ` ${currentVariant} ${sizeClasses[size]}`;

    if (outline) tagClasses += ' badge-outline';
    if (soft) tagClasses += ' badge-soft';
    if (dash) tagClasses += ' badge-dash';
    if (ghost) tagClasses += ' badge-ghost';
    if (disabled) tagClasses += ' border-none !bg-onlan-lavender text-secondary';
    if (className) tagClasses += ` ${className}`;

    return (
        <div
            className={'badge h-full hover:shadow-sm cursor-pointer ' + tagClasses.trim()}
            onClick={() => handleTagClick()}
        >
            {children}
        </div>
    );
}
