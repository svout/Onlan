import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import ErrorIcon from '@icons/close.svg';
import WarningIcon from '@icons/close.svg';
import InfoIcon from '@icons/tag.svg';
import SuccessIcon from '@icons/check.svg';
import Icon from '@elements/Icon/Icon.tsx';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastContextProps {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    function getToastClass(type: 'success' | 'error' | 'warning' | 'info') {
        const types = {
            success: 'alert-success',
            error: 'alert-error',
            warning: 'alert-warning',
            info: 'alert-info',
        };
        return types[type] || types.info;
    }
    function getToastIcon(type: 'success' | 'error' | 'warning' | 'info') {
        const types = {
            success: SuccessIcon,
            error: ErrorIcon,
            warning: WarningIcon,
            info: InfoIcon,
        };
        return types[type] || InfoIcon;
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast toast-top toast-end z-999 mt-20">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`alert alert-soft relative py-2 px-4 ${getToastClass(toast.type)}`}
                    >
                        <Icon src={getToastIcon(toast.type)} className="size-5 m-auto" />
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
