import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

export interface SectionInterface {
    el: ReactNode;
    bg?: string;
    bt?: string;
    s?: boolean; // sticky
    ah?: boolean; // auto height
    usePaddings?: boolean;
}

export default function Section({ el, bg, bt, s, ah, usePaddings }: SectionInterface) {
    const isSticky: CSSProperties = s
        ? { position: 'sticky', left: 0, top: 0 }
        : {};

    return (
        <section
            className={clsx(
                'w-full relative',
                ah === false ? 'h-screen' : 'h-auto', // По умолчанию h-auto вместо h-screen
                usePaddings && 'py-10'
            )}
            style={{
                background: bg,
                ...isSticky,
                borderTop: bt,
            }}
        >
            {el}
        </section>
    );
}
