import React from 'react';
import clsx from 'clsx';
import type { CSSProperties } from 'react';

type HighlightPart = {
    text: string;
    className?: string;
    style?: CSSProperties;
};

type TitleProps = {
    id?: string;
    title?: string;
    color?: string;
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    highlight?: string;
    highlightColor?: string;
    highlightClassName?: string;
    highlightStyle?: CSSProperties;
    highlightStart?: string;
    highlightStartColor?: string;
    highlightStartClassName?: string;
    highlightStartStyle?: CSSProperties;
    highlights?: HighlightPart[];
    flag?: React.ReactNode;
};

const typeClasses: Record<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', string> = {
    h1: 'text-4xl md:text-5xl lg:text-[56px]',
    h2: 'text-2xl md:text-5xl lg:text-5xl',
    h3: 'text-[22px] md:text-[22px] lg:text-4xl',
    h4: 'text-2xl md:text-3xl lg:text-3xl',
    h5: 'text-xl md:text-2xl lg:text-2xl',
    h6: 'text-xl md:text-xl lg:text-xl',
};

const Title = ({
    id,
    title,
    color,
    type = 'h1',
    className,
    highlight,
    highlightColor,
    highlightClassName,
    highlightStyle,
    highlightStart,
    highlightStartColor,
    highlightStartClassName,
    highlightStartStyle,
    highlights,
    flag,
}: TitleProps) => {
    const Tag = type as React.ElementType;

    // Если передан массив highlights, разбиваем title на части
    if (highlights && title) {
        const parts: (string | HighlightPart)[] = [];
        let remainingTitle = title;

        highlights.forEach((highlightPart) => {
            const index = remainingTitle.indexOf(highlightPart.text);
            if (index !== -1) {
                // Добавляем текст до выделенной части
                if (index > 0) {
                    parts.push(remainingTitle.substring(0, index));
                }
                // Добавляем выделенную часть
                parts.push(highlightPart);
                // Обновляем оставшийся текст
                remainingTitle = remainingTitle.substring(index + highlightPart.text.length);
            }
        });

        // Добавляем оставшийся текст
        if (remainingTitle) {
            parts.push(remainingTitle);
        }

        return (
            <Tag
                id={id}
                className={clsx('font-semibold leading-tight m-0', typeClasses[type], className)}
                style={{ color }}
            >
                {highlightStart && (
                    <span
                        className={highlightStartClassName}
                        style={{ color: highlightStartColor, ...highlightStartStyle }}
                    >
                        {highlightStart}
                    </span>
                )}
                {flag && flag}
                {parts.map((part, idx) => {
                    if (typeof part === 'string') {
                        return <React.Fragment key={idx}>{part}</React.Fragment>;
                    }
                    return (
                        <span
                            key={idx}
                            className={part.className}
                            style={part.style}
                        >
                            {part.text}
                        </span>
                    );
                })}
            </Tag>
        );
    }

    // Старый способ (для обратной совместимости)
    return (
        <Tag
            id={id}
            className={clsx('font-semibold leading-tight m-0', typeClasses[type], className)}
            style={{ color }}
        >
            {highlightStart && (
                <span
                    className={highlightStartClassName}
                    style={{ color: highlightStartColor, ...highlightStartStyle }}
                >
                    {highlightStart}
                </span>
            )}
            {flag && flag}
            {title}
            {highlight && (
                <span
                    className={highlightClassName}
                    style={{ color: highlightColor, ...highlightStyle }}
                >
                    {highlight}
                </span>
            )}
        </Tag>
    );
};

export default Title;
