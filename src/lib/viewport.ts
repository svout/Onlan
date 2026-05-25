/** Tailwind `md` / `lg` — mobile < tablet < desktop */
export const VIEWPORT_BREAKPOINTS = {
    tablet: 768,
    desktop: 1024,
} as const;

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';

export function getViewportMode(width: number): ViewportMode {
    if (width >= VIEWPORT_BREAKPOINTS.desktop) return 'desktop';
    if (width >= VIEWPORT_BREAKPOINTS.tablet) return 'tablet';
    return 'mobile';
}
