'use client';

import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/elements/Header';
import { Footer } from '@/components/elements/Footer/Footer';
import ToastProvider from '@/components/elements/Toast/ToastProvider';

interface ClientShellProps {
    children: ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
    const pathname = usePathname();

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
