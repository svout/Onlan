'use client';

import { Link } from 'react-router';

export function AccessDeniedPage() {
    return (
        <div className="flex h-[calc(100dvh-80px)] flex-col items-center justify-start text-center max-lg:mt-10 lg:justify-center">
            <div>
                <h1 className="text-3xl font-semibold md:text-4xl xl:text-6xl">403 — Access denied</h1>
                <h2 className="mt-1 text-xl font-medium md:text-2xl xl:text-3xl">
                    Access to this resource is restricted.
                </h2>
                <div className="mt-4">
                    <p className="text-base text-balance md:text-lg">
                        You don't have permission to access this page.
                    </p>
                    <div className="mt-4 md:mt-6">
                        <Link to="/" className="btn btn-wide btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
