'use client';

import type { AnchorHTMLAttributes, ComponentType, ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';

type PrimitiveSearchValue = string | number | boolean;
type SearchValue = PrimitiveSearchValue | null | undefined | PrimitiveSearchValue[];

type NavigateOptions = {
    replace?: boolean;
    preventScrollReset?: boolean;
};

export type SetSearchParamsInput = URLSearchParams | string | Record<string, SearchValue>;
export type SetURLSearchParams = (nextInit: SetSearchParamsInput, options?: NavigateOptions) => void;

export type RouteObject = {
    path?: string;
    index?: boolean;
    Component?: ComponentType<any>;
    children?: RouteObject[];
};

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string;
    replace?: boolean;
    prefetch?: boolean;
    scroll?: boolean;
};

type NavLinkState = {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
};

type NavLinkProps = Omit<LinkProps, 'className'> & {
    end?: boolean;
    className?: string | ((state: NavLinkState) => string);
};

const EXTERNAL_HREF_RE = /^(https?:|mailto:|tel:|sms:|\/\/)/i;

function isExternalHref(href: string): boolean {
    return EXTERNAL_HREF_RE.test(href);
}

function parsePathname(href: string): string | null {
    if (isExternalHref(href) || href.startsWith('#')) {
        return null;
    }

    try {
        return new URL(href, 'https://onlan.com').pathname;
    } catch {
        return href;
    }
}

function normalizeSearchParams(nextInit: SetSearchParamsInput): URLSearchParams {
    if (nextInit instanceof URLSearchParams) {
        return new URLSearchParams(nextInit.toString());
    }

    if (typeof nextInit === 'string') {
        return new URLSearchParams(nextInit);
    }

    const params = new URLSearchParams();
    for (const [key, rawValue] of Object.entries(nextInit)) {
        if (Array.isArray(rawValue)) {
            for (const value of rawValue) {
                if (value !== undefined && value !== null) {
                    params.append(key, String(value));
                }
            }
            continue;
        }

        if (rawValue !== undefined && rawValue !== null) {
            params.set(key, String(rawValue));
        }
    }

    return params;
}

export function Link({ to, children, replace, prefetch, scroll, ...rest }: LinkProps) {
    if (isExternalHref(to) || to.startsWith('#')) {
        return (
            <a href={to} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <NextLink href={to} replace={replace} prefetch={prefetch} scroll={scroll} {...rest}>
            {children}
        </NextLink>
    );
}

export function NavLink({ to, end, className, ...rest }: NavLinkProps) {
    const pathname = usePathname() ?? '/';
    const targetPathname = useMemo(() => parsePathname(to), [to]);

    const isActive = useMemo(() => {
        if (!targetPathname) return false;
        if (end) return pathname === targetPathname;
        return pathname === targetPathname || pathname.startsWith(`${targetPathname}/`);
    }, [end, pathname, targetPathname]);

    const resolvedClassName =
        typeof className === 'function'
            ? className({ isActive, isPending: false, isTransitioning: false })
            : className;

    return (
        <Link to={to} className={resolvedClassName} {...rest}>
            {rest.children}
        </Link>
    );
}

export function useNavigate() {
    const router = useRouter();

    return useCallback(
        (to: string, options?: NavigateOptions) => {
            if (isExternalHref(to)) {
                if (typeof window !== 'undefined') {
                    if (options?.replace) {
                        window.location.replace(to);
                    } else {
                        window.location.assign(to);
                    }
                }
                return;
            }

            const scroll = options?.preventScrollReset ? false : true;
            if (options?.replace) {
                router.replace(to, { scroll });
                return;
            }
            router.push(to, { scroll });
        },
        [router]
    );
}

export function useSearchParams(): [URLSearchParams, SetURLSearchParams] {
    const router = useRouter();
    const pathname = usePathname() ?? '/';
    const nextSearchParams = useNextSearchParams();

    const currentSearchParams = useMemo(
        () => new URLSearchParams(nextSearchParams?.toString() ?? ''),
        [nextSearchParams]
    );

    const setSearchParams = useCallback<SetURLSearchParams>(
        (nextInit, options) => {
            const params = normalizeSearchParams(nextInit);
            const query = params.toString();
            const nextHref = query ? `${pathname}?${query}` : pathname;
            const scroll = options?.preventScrollReset ? false : true;

            if (options?.replace) {
                router.replace(nextHref, { scroll });
                return;
            }
            router.push(nextHref, { scroll });
        },
        [pathname, router]
    );

    return [currentSearchParams, setSearchParams];
}

export function useLocation() {
    const pathname = usePathname() ?? '/';
    const nextSearchParams = useNextSearchParams();

    const search = useMemo(() => {
        const query = nextSearchParams?.toString() ?? '';
        return query ? `?${query}` : '';
    }, [nextSearchParams]);

    const hash = typeof window !== 'undefined' ? window.location.hash : '';

    return {
        pathname,
        search,
        hash,
    };
}

export function useParams<
    TParams extends Record<string, string | undefined> = Record<string, string | undefined>,
>(): TParams {
    const pathname = usePathname() ?? '';

    return useMemo(() => {
        const params: Record<string, string> = {};

        const zipMatch = pathname.match(
            /^\/\/zip\/([^/]+)\/?$/
        );
        if (zipMatch?.[1]) {
            params.zipCode = decodeURIComponent(zipMatch[1]);
        }

        const stateCountyMatch = pathname.match(
            /^\/\/state\/([^/]+)(?:\/county\/([^/]+))?\/?$/
        );
        if (stateCountyMatch?.[1]) {
            params.state = decodeURIComponent(stateCountyMatch[1]);
        }
        if (stateCountyMatch?.[2]) {
            params.county = decodeURIComponent(stateCountyMatch[2]);
        }

        return params as TParams;
    }, [pathname]);
}

export function createBrowserRouter(routes: RouteObject[]) {
    return { routes };
}

export function RouterProvider(_: { router: unknown }) {
    return null;
}

export function Outlet(_: { children?: ReactNode }) {
    return null;
}
