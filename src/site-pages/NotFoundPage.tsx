'use client';

import { Link } from 'react-router';

export default function NotFoundPage() {
    return (
        <div className="flex h-[calc(100dvh-80px)] flex-col items-center justify-start text-center max-lg:mt-10 lg:justify-center">
            <div>
                <h1 className="text-3xl font-semibold md:text-4xl xl:text-6xl">404</h1>
                <h2 className="text-3xl font-semibold md:text-4xl xl:text-6xl">Page not found</h2>
                <div className="mt-4">
                    <p className="text-base text-balance md:text-lg">
                        We're sorry you are experiencing this error, you can either try going back to the previous page,
                        or feel free to contact us.
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
