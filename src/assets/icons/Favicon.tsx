import Image from 'next/image';

const WIDTH = 218;
const HEIGHT = 216;

/** Renders the same asset as the site tab icon (`public/favicon.png`). */
export const Favicon = ({ className }: { className?: string }) => {
    return (
        <Image
            src="/favicon.png"
            alt=""
            width={WIDTH}
            height={HEIGHT}
            className={className}
            aria-hidden
        />
    );
};
