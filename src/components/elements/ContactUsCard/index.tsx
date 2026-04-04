interface ContactUsCardProps {
    title: string;
    description: string;
}

export const ContactUsCard = ({ title, description }: ContactUsCardProps) => {
    return (
        <div
            className="relative flex flex-col items-start justify-start gap-1 rounded-[10px] p-4"
            style={{
                background:
                    'radial-gradient(97.02% 143.27% at 7.72% 5.95%, rgba(9, 103, 196, 0.44) 0%, rgba(0, 119, 223, 0.44) 20.34%, rgba(0, 16, 30, 0.44) 100%)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    padding: 1,
                    borderRadius: 10,
                    background:
                        'linear-gradient(151.57deg, rgba(255, 255, 255, 0.53) 14.18%, rgba(255, 255, 255, 0.11) 82.44%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    pointerEvents: 'none',
                }}
            />
            <p className="relative text-onlan-white text-xl font-medium">{title}</p>
            <p className="relative text-onlan-white text-sm font-normal">{description}</p>
        </div>
    );
};