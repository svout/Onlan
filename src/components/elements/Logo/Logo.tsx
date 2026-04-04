import Icon from '@elements/Icon/Icon.tsx';
import LogoIcon from '@images/logo/logo.svg';

interface LogoProps {
    className?: string;
}

export function Logo({ className = '' }: LogoProps) {
    return <Icon src={LogoIcon} className={`logo w-full text-primary ${className}`} />;
}
