'use client';

import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/elements/Header';
import { Footer } from '@/components/elements/Footer/Footer';
import ToastProvider from '@/components/elements/Toast/ToastProvider';
import { preloadStateSummary } from '@/utils/stateSummaryCache';

interface ClientShellProps {
    children: ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;
        let timeoutId: number | null = null;
        let idleId: number | null = null;

        const runPreload = () => {
            if (cancelled) return;
            preloadStateSummary().catch((error) => {
                console.warn('State summary preload failed:', error);
            });
        };

        if (typeof window.requestIdleCallback === 'function') {
            idleId = window.requestIdleCallback(runPreload, { timeout: 5000 });
        } else {
            timeoutId = window.setTimeout(runPreload, 2000);
        }

        return () => {
            cancelled = true;
            if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
        });
    }, [pathname]);

    return (
        <ToastProvider>
            <div className="layout flex min-h-screen flex-col" id="layout">
                <Header />
                <main className="flex-1">
                    <Suspense fallback={null}>{children}</Suspense>
                </main>
                <Footer />
            </div>
        </ToastProvider>
    );
}
