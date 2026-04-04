import {type ReactNode} from "react";
import type {TagSize} from "@elements/Tag/index.ts";
import Icon from "@elements/Icon/Icon.tsx";
import EditIcon from "@icons/edit.svg";

interface ClassTagProps {
    className?: string
    children: ReactNode
    size?: TagSize
    disabled?: boolean
    onClick?: () => void
}

export function ClassTag({
    className,
    children,
    size = 'xl',
    disabled = false,
    onClick,
}: ClassTagProps) {
    const handleTagClick = () => {
        if (disabled || !onClick) return;
        onClick()
    }

    let tagClasses = '';

    const sizeClasses: Record<TagSize, string> = {
        xs: "badge-xs",
        sm: "badge-sm",
        md: "badge-md",
        lg: "badge-lg",
        xl: "badge-xl",
    }

    tagClasses += ` ${sizeClasses[size]}`;

    if (disabled) tagClasses += ' !border-onlan-lavender !bg-onlan-lavender !text-secondary ';
    if (className) tagClasses += ` ${className}`;

    return (
        <div
            className={'badge badge-outline badge-secondary box-border h-full hover:shadow-sm cursor-pointer ' + tagClasses.trim()}
            onClick={() => handleTagClick()}
        >
            <div className={`text-base ${disabled ? 'text-secondary' : 'text-base-content'}`}>
                {children}
            </div>
            <Icon src={EditIcon} className={`size-5 ${disabled ? 'text-secondary' : 'text-primary'}`} />
        </div>
    );
}
