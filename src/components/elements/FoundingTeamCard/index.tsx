import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import LinkedInIcon from '@/assets/icons/LinkedinIcon.svg';

interface FoundingTeamCardProps {
    name: string;
    title: string;
    description: string;
    image: string | StaticImageData;
    linkedin: string;

}

export const FoundingTeamCard = ({
    name,
    title,
    description,
    image,
    linkedin,

}: FoundingTeamCardProps) => {

    return (
        <div className="flex h-full flex-col bg-onlan-white border-5 border-onlan-lavender rounded-2xl p-6 items-stretch gap-4 max-w-[790px]">
            <div className="w-full h-[220px] md:h-[160px] lg:h-[220px] shrink-0 rounded-xl overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    width={100}
                    height={100}
                    className={`w-full h-full object-cover`}
                />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start gap-2 w-full min-h-0">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                        <Image src={LinkedInIcon} alt="LinkedIn" width={24} height={24} />
                    </Link>
                </div>

                <p className="text-base text-onlan-blue">{title}</p>
                <p className="text-base text-onlan-black">{description}</p>
            </div>
        </div>
    );
};