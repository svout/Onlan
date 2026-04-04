import { useOnLoad } from '@/hooks/useOnLoad';
import type { ReactNode } from 'react';

interface OnLoadWrapperProps {
    children: ReactNode;
    fallback?: ReactNode; // что показывать до загрузки
}

export const OnLoad: React.FC<OnLoadWrapperProps> = ({ children, fallback = null }) => {
    const onLoad = useOnLoad();

    return <>{onLoad ? children : fallback}</>;
};
