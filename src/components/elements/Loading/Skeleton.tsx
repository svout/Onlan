import React from 'react';

interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | false;
    className?: string;
    sx?: React.CSSProperties;
}

export default function Skeleton({
    variant = 'text',
    width,
    height,
    animation = 'pulse',
    className = '',
    sx,
}: SkeletonProps) {
    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: '',
        rounded: 'rounded-lg',
    };

    const animationClasses = {
        pulse: 'animate-pulse',
        wave: 'animate-pulse',
        false: '',
    };

    const style: React.CSSProperties = {
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'text' ? '1em' : undefined),
        backgroundColor: sx?.backgroundColor || '#E5E7EB',
        ...sx,
    };

    return (
        <div
            className={`${variantClasses[variant]} ${animationClasses[animation as keyof typeof animationClasses]} ${className}`}
            style={style}
        />
    );
}
