import type { ReactNode } from 'react';

export default function Relative({ children }: { children: ReactNode }) {
    return <div className="w-full relative">{children}</div>;
}
