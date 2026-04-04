import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from '@/components/elements/Header';
import { Footer } from '@/components/elements/Footer/Footer';

interface LayoutProps {
    children?: ReactNode;
}

export default function Layout({ children }: LayoutProps = {}) {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
        });
    }, [location.pathname]);

    return (
        <div className={'layout flex flex-col min-h-screen'} id="layout">
            <Header />
            <main className="flex-1">
                <Outlet />
                {children}
            </main>
            <Footer />
        </div>
    );
}
