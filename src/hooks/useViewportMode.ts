'use client';

import { useEffect, useState } from 'react';
import { getViewportMode, type ViewportMode } from '@/lib/viewport';

export function useViewportMode(): ViewportMode {
    const [mode, setMode] = useState<ViewportMode>(() =>
        typeof window !== 'undefined' ? getViewportMode(window.innerWidth) : 'desktop'
    );

    useEffect(() => {
        const mqTablet = window.matchMedia(`(min-width: ${768}px)`);
        const mqDesktop = window.matchMedia(`(min-width: ${1024}px)`);

        const sync = () => {
            setMode(getViewportMode(window.innerWidth));
        };

        mqTablet.addEventListener('change', sync);
        mqDesktop.addEventListener('change', sync);
        sync();

        return () => {
            mqTablet.removeEventListener('change', sync);
            mqDesktop.removeEventListener('change', sync);
        };
    }, []);

    return mode;
}
