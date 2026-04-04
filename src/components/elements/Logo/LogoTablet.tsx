import Icon from '@elements/Icon/Icon';
import LogoTabletIcon from '@images/logo/logo-tablet.svg';

interface LogoTabletProps {
    className?: string;
}

export function LogoTablet({ className = '' }: LogoTabletProps) {
    return <Icon src={LogoTabletIcon} className={`logo w-full text-primary ${className}`} />;
}

