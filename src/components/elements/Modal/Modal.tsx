import { useEffect, type ReactNode, type MouseEvent } from 'react';
import CloseIcon from '@icons/close.svg';
import Icon from '@elements/Icon/Icon.tsx';
import type { ModalSize } from '@elements/Modal/index.ts';

export interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    size?: ModalSize | 'auto';
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    title?: string;
    children?: ReactNode;
    actions?: ReactNode;
    className?: string;
    modalBoxClass?: string;
}

export default function Modal({
    isOpen = false,
    onClose = () => {},
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    actions,
    className = '',
    modalBoxClass = '',
}: ModalProps) {
    useEffect(() => {
        if (!closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const getSizeClass = () => {
        const sizes = {
            xs: ' w-80 max-w-xs',
            sm: ' w-96 max-w-sm',
            md: ' w-full max-w-md',
            lg: ' w-full max-w-lg',
            xl: ' w-full max-w-xl',
            '2xl': ' w-full max-w-2xl',
            '3xl': ' w-full max-w-3xl',
            '4xl': ' w-full max-w-4xl',
            '5xl': ' w-full max-w-5xl',
            full: ' size-full max-w-none',
            auto: '',
        };
        return sizes[size] ?? sizes.md;
    };

    if (!isOpen) return null;

    return (
        <div className={`modal-open modal ${className}`} onClick={handleBackdropClick}>
            <div className={`modal-box ${getSizeClass()} ${modalBoxClass}`}>
                {showCloseButton && (
                    <button
                        className="absolute top-2 right-2 size-10 cursor-pointer"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <Icon src={CloseIcon} className="p-2 text-onlan-lavender" />
                    </button>
                )}

                {/* Header */}
                {title && (
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 empty:hidden">
                            {title && <h3 className="text-lg font-bold">{title}</h3>}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div>{children}</div>

                {/* Actions */}
                {actions && <div className="modal-action">{actions}</div>}
            </div>
        </div>
    );
}
