import type { CSSProperties, ReactNode } from 'react';
import Icon from '@elements/Icon/Icon';
import CloseIcon from '@icons/close.svg';

interface ModalProps {
    children: ReactNode;
    id: string;
    closeModal: (id: string) => void;
    style?: CSSProperties;
}

export default function Modal({ children, id, closeModal, style }: ModalProps) {
    return (
        <div
            className="w-full max-w-[769px] p-12 flex flex-col items-center justify-center gap-2.5 rounded-[20px] border border-onlan-white/20 bg-[#081433] relative max-md:w-[calc(100%-30px)] max-md:p-5 max-md:m-auto"
            style={style}
        >
            <button
                className="absolute top-6 right-6 w-6 h-6 cursor-pointer text-onlan-white bg-transparent border-0 outline-0 max-md:border max-md:border-onlan-white/10 max-md:bg-gradient-to-b max-md:from-white/10 max-md:to-transparent max-md:backdrop-blur-[60px] max-md:w-10 max-md:h-10 max-md:rounded-full max-md:flex max-md:justify-center max-md:items-center max-md:top-[-18px] max-md:right-0.5"
                onClick={() => closeModal(id)}
            >
                <Icon src={CloseIcon} className="w-full h-full" style={{ transform: 'rotate(45deg)' }} />
            </button>
            {children}
        </div>
    );
}
